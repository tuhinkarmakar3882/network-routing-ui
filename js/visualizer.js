let stateNodeData, statePathData, discoverRouteData, nodeNamesToId = {}, idToNodeNames = {};
let dynamicTopologyGenerationMode = false, realtimeMovementOn = false, offset = 80, dynamicTopologyGenerator;
let topologyGenerationDelay = 2000;

const bg = {
    red: 170,
    green: 170,
    blue: 170,
}
const highLightedRoute = {
    red: 4,
    green: 156,
    blue: 100,
}
const nodeFill = {
    red: 196,
    green: 242,
    blue: 127,
}

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    $.get('http://localhost:8000/', {
        totalNodesRequired: nodeInput.value,
        maxX: window.innerWidth - offset,
        maxY: window.innerHeight - offset
    }).done(response => {
        stateNodeData = response.NodeData;

        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            drawNodes();
        }

        draw();
    }).fail(response => {
        console.log(response.responseJSON);
    });
}

function generateTopology() {
    $.get('http://localhost:8000/generateTopology').done(response => {
        statePathData = response.pathData;

        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            drawTopology()
            drawNodes();
        }

        draw();
    }).fail(response => {
        console.log(response.responseJSON);
    });
}

function setup() {
    createCanvas(window.innerWidth - offset, window.innerHeight - offset);
}

function drawNodes() {
    stroke(color(0, 0, 0))
    nodeNamesToId = {}
    idToNodeNames = {}
    let radius = 30;
    for (let data in stateNodeData) {
        strokeWeight(1);
        let xPos = stateNodeData[data].xPos;
        let yPos = stateNodeData[data].yPos;
        let textData = stateNodeData[data].text;
        fill(color(nodeFill.red, nodeFill.green, nodeFill.blue));
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
        line(sourceXPos, sourceYPos, destinationXPos, destinationYPos);

        let textX = Math.abs((sourceXPos - destinationXPos)) / 2 + Math.min(sourceXPos, destinationXPos);
        let textY = Math.abs((sourceYPos - destinationYPos)) / 2 + Math.min(sourceYPos, destinationYPos);

        textSize(18);
        strokeWeight(0);
        text(weightData, textX, textY);
    }
}

function draw() {
    if (realtimeMovementOn) {
        realtimeMovement();
    }
}

function realtimeMovement() {
    clear();
    background(color(bg.red, bg.green, bg.blue));
    for (let data in stateNodeData) {
        stateNodeData[data].xPos = stateNodeData[data].xPos + random(-10, 10);
        stateNodeData[data].yPos = stateNodeData[data].yPos - random(-7, 7);

        if (stateNodeData[data].yPos < 0) {
            stateNodeData[data].yPos = 0;
        }
        if (stateNodeData[data].yPos > height) {
            stateNodeData[data].yPos = height;
        }
        if (stateNodeData[data].xPos < 0) {
            stateNodeData[data].xPos = 0;
        }
        if (stateNodeData[data].xPos > width) {
            stateNodeData[data].xPos = width;
        }
    }
    drawTopology();
    drawNodes();
}

function toggleDynamicTopology() {
    dynamicTopologyGenerationMode = !dynamicTopologyGenerationMode;
    let turnOnAutomateBtn = document.getElementById("enableDynamicTopologyBtn");
    turnOnAutomateBtn.textContent = dynamicTopologyGenerationMode ? "Turn Off Dynamic Topology" : "Turn On Dynamic Topology";
    if (dynamicTopologyGenerationMode) {
        dynamicTopologyGenerator = setInterval(() => {
            generateTopology();
        }, topologyGenerationDelay)
    } else {
        clearInterval(dynamicTopologyGenerator);
    }
}

function enableRealtimeMovement() {
    realtimeMovementOn = !realtimeMovementOn;
    let realtimeMovementBtn = document.getElementById("realtimeMovementBtn")
    realtimeMovementBtn.textContent = realtimeMovementOn ? "Turn Off Realtime Movement" : "Turn On Realtime Movement";
}

function discoverRoute() {
    let sourceNodeId = document.getElementById("source").value;
    let destinationNodeId = document.getElementById("destination").value;
    console.log("discovering routes from", nodeNamesToId[sourceNodeId], "to", nodeNamesToId[destinationNodeId])

    $.get('http://localhost:8000/discoverRoute', {
        sourceId: nodeNamesToId[sourceNodeId],
        destinationId: nodeNamesToId[destinationNodeId]
    }).done(response => {
        console.log(response)
        discoverRouteData = response.RouteData;

        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            drawTopology();
            drawRoute();
            drawNodes();
        }

        draw();

    }).fail(response => {
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
        stroke(color(highLightedRoute.red, highLightedRoute.green, highLightedRoute.blue));
        console.log("Drawing Line =>", idToNodeNames[sourceId], idToNodeNames[destinationId])
        line(sourceXPos, sourceYPos, destinationXPos, destinationYPos);
    }

}

function startMessageListener() {
    console.log("Set up backend.")
}