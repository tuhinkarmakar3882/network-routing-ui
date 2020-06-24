let stateNodeData, statePathData, discoverRouteData, nodeNamesToId={}, idToNodeNames = {};
let automate = false, realtimeMovementOn = false, offset = 80;

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    $.get('http://localhost:8000/', {totalNodesRequired: nodeInput.value, maxX : window.innerWidth - offset , maxY : window.innerHeight - offset })
    .done(response => {
        let nodeData = response.NodeData;
        stateNodeData = nodeData;

        function draw() {
            clear();
            background(color(31, 153, 153));
            drawNodes();
        }
        draw();
    })
    .fail(response => {
        console.log(response.responseJSON);
    });
}

function generateTopology() {
    $.get('http://localhost:8000/generateTopology')
    .done(response => {
        let pathData = response.pathData;
        statePathData = pathData;
        function draw() {
            clear();
            background(color(31, 153, 153))
            drawTopology()
            drawNodes();
        }

        draw();
    })
    .fail(response => {
        console.log(response.responseJSON);
    });
}

function setup() {
    createCanvas(window.innerWidth - offset, window.innerHeight - offset);
}

function drawNodes() {
    stroke(color(0,0,0))
    nodeNamesToId = {}
    idToNodeNames = {}
    radius = 30;
    for (let data in stateNodeData) {
        strokeWeight(1);
        let xPos = stateNodeData[data].xPos;
        let yPos = stateNodeData[data].yPos;
        let textData = stateNodeData[data].text;
        fill(color(196, 242, 127));
        circle(xPos, yPos, radius);
        fill(color(0, 0, 0));
        strokeWeight(0);
        textSize(16);

        textStyle(BOLD);
        text(textData, xPos, yPos);
        nodeNamesToId[textData] = stateNodeData[data].id;
        idToNodeNames[stateNodeData[data].id] = textData
    }
}

function drawTopology() {   
    for (let data in statePathData) {
       strokeWeight(1);
       stroke(color(50, 50, 50));
    
       let sourceId = statePathData[data].source;
       let destinationId = statePathData[data].destination;
       let sourceXPos = stateNodeData[sourceId].xPos;
       let sourceYPos = stateNodeData[sourceId].yPos;
       let destinationXPos = stateNodeData[destinationId].xPos;
       let destinationYPos = stateNodeData[destinationId].yPos;
       let weightData = statePathData[data].weightData;
       line(sourceXPos,sourceYPos,destinationXPos,destinationYPos);
       
       let textX = Math.abs((sourceXPos-destinationXPos))/2 + Math.min(sourceXPos, destinationXPos);
       let textY = Math.abs((sourceYPos-destinationYPos))/2 + Math.min(sourceYPos, destinationYPos);
       
       textSize(18);
       strokeWeight(0);
       text(weightData,textX,textY);
   }
}

function draw(){
    if(realtimeMovementOn) {
        realtimeMovement();
    }
}

function realtimeMovement(){
    clear();
    background(color(31, 153, 153));
    for (let data in stateNodeData) {
        stateNodeData[data].xPos = stateNodeData[data].xPos + random(-10,10);
        stateNodeData[data].yPos = stateNodeData[data].yPos - random(-7,7);

        if(stateNodeData[data].yPos < 0) {
            stateNodeData[data].yPos = 0;
        }
        if(stateNodeData[data].yPos > height) {
            stateNodeData[data].yPos = height;
        }
        if(stateNodeData[data].xPos < 0) {
            stateNodeData[data].xPos = 0;
        }
        if(stateNodeData[data].xPos > width) {
            stateNodeData[data].xPos = width;
        }
    }
    drawTopology();
    drawNodes();
}


function turnOnAutomation() {
    automate = automate ? false : true;
    let turnOnAutomateBtn= document.getElementById("turnOnAutomationBtn");
    turnOnAutomateBtn.textContent = automate ? "Turn Off Dynamic Topology" : "Turn On Dynamic Topology";
    let delay = 2000;
    if(automate) {
        automation = setInterval( () =>{ generateTopology(); },delay)
    }
    else {
        clearInterval(automation);
    }
}

function turnOnRealtimeMovement() {
   realtimeMovementOn = realtimeMovementOn ? false : true;
   let realtimeMovementBtn = document.getElementById("realtimeMovementBtn")
   realtimeMovementBtn.textContent = realtimeMovementOn ? "Turn Off Realtime Movement" : "Turn On Realtime Movement";
}


function discoverRoute() {
    let sourceNodeId = document.getElementById("source").value;
    let destinationNodeId = document.getElementById("destination").value;
    console.log("discovering routes from", nodeNamesToId[sourceNodeId], "to", nodeNamesToId[destinationNodeId])
    
    $.get('http://localhost:8000/discoverRoute', {sourceId: nodeNamesToId[sourceNodeId], destinationId: nodeNamesToId[destinationNodeId] })
    .done(response => {
        console.log(response)
        discoverRouteData = response.RouteData;
        function draw() {
            clear();
            background(color(31, 153, 153));
            drawTopology();
            drawRoute();
            drawNodes();
        }
        draw();
    })
    .fail(response => {
        console.log(response.responseJSON);
    });
}

function drawRoute() {

    for (let data in discoverRouteData) {
       let sourceId = discoverRouteData[data].source;
       let destinationId = discoverRouteData[data].destination;
       let sourceXPos = stateNodeData[sourceId].xPos;
       let sourceYPos = stateNodeData[sourceId].yPos;
       let destinationXPos = stateNodeData[destinationId].xPos;
       let destinationYPos = stateNodeData[destinationId].yPos;

       strokeWeight(5);
       stroke(color(0,255,0))
       console.log("Drawing Line =>", idToNodeNames[sourceId], idToNodeNames[destinationId])
       // line(stateNodeData[sourceId].xPos, stateNodeData[sourceId].yPos, 
              // stateNodeData[destinationId].xPos, stateNodeData[destinationId].yPos)
       line(sourceXPos,sourceYPos,destinationXPos,destinationYPos);
   }
   
}