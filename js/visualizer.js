let stateNodeData, statePathData, discoverRouteData, nodeNamesToId = {}, idToNodeNames = {};
let outputLog;
let dynamicTopologyGenerationMode = false, realtimeMovementOn = false, offset = 80, dynamicTopologyGenerator;
let topologyGenerationDelay = 2000;
let specialNodes = [];
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
const defaultNodeFill = {
    red: 255,
    green: 255,
    blue: 255,
}
const specialNodeFill = {
    red: 196,
    green: 242,
    blue: 127,
}

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    printToLog(`[+] Generating ${nodeInput.value ? nodeInput.value : 'undefined'} Nodes...`)
    $.get('http://localhost:8000/generateNodes', {
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
        printToLog(`[+] ${response.message}`, 'text-success');
    }).fail(response => {
        printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
    });
}

function generateTopology() {
    let totalIterations = document.getElementById('totalIterationsInput');
    printToLog(`[+] Generating Topology... Iterations = ${totalIterations.value ? totalIterations.value : 'undefined'}`);
    $.get('http://localhost:8000/generateTopology', {
        totalIterations: totalIterations.value
    }).done(response => {
        statePathData = response.pathData;

        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            drawTopology()
            drawNodes();
        }

        draw();
        printToLog(`[+] ${response.message}`, 'text-success');
    }).fail(response => {
        printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
    });
}

function discoverRoute() {
    let sourceNodeId = document.getElementById("source").value;
    let destinationNodeId = document.getElementById("destination").value;
    printToLog(`[+] Discovering Routes from ${nodeNamesToId[sourceNodeId]} to ${nodeNamesToId[destinationNodeId]}`)

    $.get('http://localhost:8000/discoverRoute', {
        sourceId: nodeNamesToId[sourceNodeId],
        destinationId: nodeNamesToId[destinationNodeId]
    }).done(response => {
        discoverRouteData = response.RouteData;

        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            drawTopology();
            drawRoute();
            drawNodes();
        }

        draw();
        printToLog(`[+] ${response.message}`, 'text-success');
    }).fail(response => {
        printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
    });
}

function testDelivery() {
    alert("Set Up BackEnd!")
}

function startMessageListener() {
    alert("Set up backend.")
}

function toggleDynamicTopology() {
    dynamicTopologyGenerationMode = !dynamicTopologyGenerationMode;
    let enableDynamicTopologyButton = document.getElementById("enableDynamicTopologyBtn");
    enableDynamicTopologyButton.textContent = dynamicTopologyGenerationMode ? "Turn Off Dynamic Topology" : "Turn On Dynamic Topology";
    printToLog(dynamicTopologyGenerationMode ? "Turned ON Dynamic Topology" : "Turned OFF Dynamic Topology");
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
    printToLog(realtimeMovementOn ? "Turned ON Realtime Movement" : "Turned OFF Realtime Movement");
}

function realtimeMovement() {
    clear();
    background(color(bg.red, bg.green, bg.blue));
    for (let data in stateNodeData) {
        stateNodeData[data].xPos = stateNodeData[data].xPos + random(-10, 10);
        stateNodeData[data].yPos = stateNodeData[data].yPos - random(-7, 7);

        if (stateNodeData[data].yPos < 20) {
            stateNodeData[data].yPos = 20;
        }

        if (stateNodeData[data].yPos > height - 20) {
            stateNodeData[data].yPos = height - 20;
        }

        if (stateNodeData[data].xPos < 20) {
            stateNodeData[data].xPos = 20;
        }

        if (stateNodeData[data].xPos > width - 20) {
            stateNodeData[data].xPos = width - 20;
        }
    }
    drawTopology();
    drawNodes();
}

function isASpecialNodes(xPos, yPos) {
    for (let node of specialNodes) {
        if ((node.xPos === xPos) && (node.yPos === yPos)) {
            return true;
        }
    }
    return false;
}

function setup() {
    createCanvas(window.innerWidth - offset, window.innerHeight - offset);
}

function draw() {
    if (realtimeMovementOn) {
        realtimeMovement();
    }
}

function drawNodes() {
    stroke(color(0, 0, 0))
    nodeNamesToId = {}
    idToNodeNames = {}
    let radius = 35;
    for (let data in stateNodeData) {
        strokeWeight(1);
        let xPos = stateNodeData[data].xPos;
        let yPos = stateNodeData[data].yPos;
        let textData = stateNodeData[data].text;

        if (isASpecialNodes(xPos, yPos)) {
            fill(color(specialNodeFill.red, specialNodeFill.green, specialNodeFill.blue));
        } else {
            fill(color(defaultNodeFill.red, defaultNodeFill.green, defaultNodeFill.blue));
        }
        circle(xPos, yPos, radius);
        fill(color(0, 0, 0));
        strokeWeight(0);
        textSize(11);
        textStyle(BOLD);
        text(textData, xPos, yPos + 4);
        nodeNamesToId[textData] = stateNodeData[data].id;
        idToNodeNames[stateNodeData[data].id] = textData
    }
    specialNodes = [];
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
        //let weightData = Math.round(dist(sourceXPos, sourceYPos, destinationXPos, destinationYPos));
        let weightData = statePathData[data].weightData;

        noFill();
        beginShape();

        curveVertex(random(200, 405), random(400, 805));

        curveVertex(sourceXPos, sourceYPos);
        curveVertex(destinationXPos, destinationYPos);

        curveVertex(random(200, 405), random(200, 605));

        endShape();
        fill(0);

        // Fix Text Alignment on curved edges

        let textX = Math.abs((sourceXPos - destinationXPos)) / 2 + Math.min(sourceXPos, destinationXPos) - 80;
        let textY = Math.abs((sourceYPos - destinationYPos)) / 2 + Math.min(sourceYPos, destinationYPos) - 80;

        textSize(18);
        strokeWeight(0);
        textAlign(CENTER, BOTTOM);
        text(weightData, textX, textY);

    }
}

function drawRoute() {
    for (let data in discoverRouteData) {

        let sourceId = discoverRouteData[data].source;
        let destinationId = discoverRouteData[data].destination;
        let sourceXPos = stateNodeData[sourceId].xPos;
        let sourceYPos = stateNodeData[sourceId].yPos;
        let destinationXPos = stateNodeData[destinationId].xPos;
        let destinationYPos = stateNodeData[destinationId].yPos;

        specialNodes.push({
            xPos: sourceXPos,
            yPos: sourceYPos,

        });
        specialNodes.push({
            xPos: destinationXPos,
            yPos: destinationYPos,

        });

        strokeWeight(5);
        stroke(color(highLightedRoute.red, highLightedRoute.green, highLightedRoute.blue));
        printToLog(`Drawing Line => ${idToNodeNames[sourceId]} ${idToNodeNames[destinationId]}`, 'text-white')
        line(sourceXPos, sourceYPos, destinationXPos, destinationYPos);
    }

}