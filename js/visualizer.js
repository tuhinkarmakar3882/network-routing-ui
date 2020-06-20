let stateNodeData, statePathData, automate = false, realtimeMovementOn = false, offset = 80;

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    $.get('http://localhost:8000/', {totalNodesRequired: nodeInput.value, maxX : window.innerWidth - offset , maxY : window.innerHeight - offset })
    .done(response => {
        let nodeData = response.NodeData;
        stateNodeData = nodeData;
        function draw() {
            clear();
            background(color(38,189,189));
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
            background(color(38,189,189))
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

function drawNodes(){
    radius = 30;
    for (let data in stateNodeData) {
        let xPos = stateNodeData[data].xPos;
        let yPos = stateNodeData[data].yPos;
        let textData = stateNodeData[data].text;
        fill(color(245, 6, 128));
        circle(xPos, yPos, radius);
        fill(color(0, 0, 0));
        textSize(16);
        textStyle(BOLD);
        text(textData, xPos, yPos);
    }
}

function drawTopology(){
    for (let data in statePathData) {
       let sourceId = statePathData[data].source;
       let destinationId = statePathData[data].destination;
       let sourceXPos = stateNodeData[sourceId].xPos;
       let sourceYPos = stateNodeData[sourceId].yPos;
       let destinationXPos = stateNodeData[destinationId].xPos;
       let destinationYPos = stateNodeData[destinationId].yPos;
       strokeWeight(2)
       line(sourceXPos,sourceYPos,destinationXPos,destinationYPos);
   }
}

function draw(){
    if(realtimeMovementOn) {
        realtimeMovement();
    }
}

function realtimeMovement(){
    clear();
    background(color(38,189,189));
    for (let data in stateNodeData) {
        stateNodeData[data].xPos = stateNodeData[data].xPos + random(-15,15);
        stateNodeData[data].yPos = stateNodeData[data].yPos - random(-10,10);

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
    turnOnAutomateBtn.textContent = automate ? "Turn Off Automation" : "Turn On Automation";
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
