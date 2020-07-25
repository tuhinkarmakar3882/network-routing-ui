let stateNodeData, statePathData, discoverRouteData, nodeNamesToId = {}, idToNodeNames = {};
let outputLog;
let dynamicTopologyGenerationMode = false, realtimeMovementOn = false, offset = 80, dynamicTopologyGenerator;
let topologyGenerationDelay = 2000;
let specialNodes = [], nodeObjectArray = [];
let tracking = false

const bg = {
    red: 170,
    green: 170,
    blue: 170,
}
const highLightedRoute = {
    red: 156,
    green: 4,
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


class Node {
    constructor(x, y, r, maxRange, textData) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.range = 0;
        this.maxRange = maxRange;
        this.connection = 0;
        this.textData = textData;
    }

    runScan() {
        if (this.range > this.maxRange) {
            this.range = 0;
        }
        this.range++;
    }

    show() {
        strokeWeight(1);
        noFill();
        circle(this.x, this.y, this.range);

        if (isASpecialNodes(this.x, this.y)) {
            fill(color(specialNodeFill.red, specialNodeFill.green, specialNodeFill.blue));
        } else {
            fill(color(defaultNodeFill.red, defaultNodeFill.green, defaultNodeFill.blue));
        }

        circle(this.x, this.y, this.r);
        this.runScan();
        fill(color(0, 0, 0));
        stroke(0)
        strokeWeight(0);
        textSize(11);
        textStyle(BOLD);
        text(this.textData, this.x, this.y);
    }
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
        discoverRouteData = []
    }).fail(response => {
        printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
    });
}

function scanForNodes() {
    let maxRange = document.getElementById("maxRangeInput").value;
    printToLog(`[+] Initializing Scan with range = ${maxRange ? maxRange : "undefined"}`, "text-success")
    if (maxRange) {
        for (let node of nodeObjectArray) {
            node.maxRange = maxRange
        }
        printToLog("[+] Range Update Successful.", "text-success");
    } else {
        printToLog("[!] Invalid Range.", "text-danger");
    }
}

function discoverRoute() {
    let sourceNodeName = document.getElementById("source").value;
    let destinationNodeName = document.getElementById("destination").value;
    // printToLog(`[+] Discovering Routes from ${sourceNodeName} to ${destinationNodeName}`)
    tracking = false;
    toggleTracking()

    $.get('http://localhost:8000/discoverRoute/', {
        sourceId: sourceNodeName,
        destinationId: destinationNodeName,
        maxRange: document.getElementById("maxRangeInput").value ? document.getElementById("maxRangeInput").value : 100,
        nodeData: JSON.stringify(stateNodeData),
    }).done(response => {
        discoverRouteData = response.RouteData;

        // printToLog(discoverRouteData)
        function draw() {
            clear();
            background(color(bg.red, bg.green, bg.blue));
            // drawTopology();
            // drawRoute();
            drawNodes();
        }

        draw();
        // printToLog(`[+] ${response.message}`, 'text-success');
        printToLog(`[+] Path Found:  ${response.found}`, 'text-success');
        printToLog(`[+] Time Taken:  ${response.timeTaken} seconds`, 'text-warning');
        document.getElementById('timeTaken').textContent = response.timeTaken;
    }).fail(response => {
        printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
    });
}

function testDelivery() {
    tracking = false;
    toggleTracking();

    let sourceNodeName = document.getElementById("msgSource").value;
    let destinationNodeName = document.getElementById("msgDestination").value;
    let maximumAllowedPacket = document.getElementById("packetsCount").value ? document.getElementById("packetsCount").value : 0;

    discoverRouteData = []
    let successFullyDelivered = 0;
    let deliveryTime = [];
    document.getElementById('totalPackets').textContent = maximumAllowedPacket.toString();
    let totalTime = 0;
    for (let packetNumber = 0; packetNumber < maximumAllowedPacket; packetNumber++) {
        $.get('http://localhost:8000/discoverRoute/', {
            sourceId: sourceNodeName,
            destinationId: destinationNodeName,
            maxRange: document.getElementById("maxRangeInput").value ? document.getElementById("maxRangeInput").value : 100,
            nodeData: JSON.stringify(stateNodeData),
        }).done(response => {
            discoverRouteData = response.RouteData;

            function draw() {
                clear();
                background(color(bg.red, bg.green, bg.blue));
                // drawTopology();
                // drawRoute();
                drawNodes();
            }

            draw();
            successFullyDelivered++;
            printToLog(`[+] Path Found:  ${response.found}`, 'text-success');
            printToLog(`[+] Time Taken:  ${response.timeTaken} seconds`, 'text-warning');

            document.getElementById('lossRate').textContent = (((maximumAllowedPacket - successFullyDelivered) / maximumAllowedPacket) * 100).toString();
            document.getElementById('timeTaken').textContent = response.timeTaken;
            deliveryTime.push(response.timeTaken);

            document.getElementById('leftToSend').textContent = (maximumAllowedPacket - packetNumber - 1).toString();

            deliveryTime.forEach(item => {
                totalTime += item
            })
            document.getElementById('avgTime').textContent = (totalTime / deliveryTime.length).toString();

        }).fail(response => {
            document.getElementById('lossRate').textContent = (((maximumAllowedPacket - successFullyDelivered) / maximumAllowedPacket) * 100).toString();
            document.getElementById('leftToSend').textContent = (maximumAllowedPacket - packetNumber - 1).toString();
            console.log(successFullyDelivered)
            discoverRouteData = []
            printToLog(`[!] ${response.responseJSON['message']}`, 'text-danger')
        });
    }

}

function toggleTracking() {
    tracking = !tracking;
    document.getElementById('toggleTracking').textContent = tracking ? 'Stop Tracking' : 'Start Tracking';
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
    background(color(bg.red, bg.green, bg.blue));
    for (let data in stateNodeData) {
        stateNodeData[data].xPos = stateNodeData[data].xPos + random(-7, 7);
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

    for (var i = stateNodeData.length - 1; i >= 0; i--) {
        nodeObjectArray[i].x = stateNodeData[i].xPos;
        nodeObjectArray[i].y = stateNodeData[i].yPos;
    }

    if (tracking) {
        // discoverRoute()
        drawRoute();
    }

    // if(displayRoute) {
    //     drawRoute()
    // }
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
    clear()
    if (realtimeMovementOn) {
        realtimeMovement();
    }
    nodeObjectArray.forEach(node => {
        node.show()
        x = node.x
        y = node.y
        range = node.range
        stroke(0)
        strokeWeight(0)
        fill(0)
        for (let node1 of nodeObjectArray) {
            if (node !== node1) {
                let distance = Math.round(dist(x, y, node1.x, node1.y))
                if (distance < range) {
                    textSize(12)
                    text(distance, (x + node1.x) / 2, (y + node1.y) / 2)
                    strokeWeight(1)
                    line(x, y, node1.x, node1.y)
                    node1.connections++;
                }
            }
        }
    });
    if (tracking) {
        discoverRoute();
        // drawRoute();
    }
}

function drawNodes() {
    stroke(color(0, 0, 0))
    nodeNamesToId = {}
    idToNodeNames = {}
    let radius = 35;
    nodeObjectArray = []

    for (let data of stateNodeData) {
        let xPos = data.xPos;
        let yPos = data.yPos;
        let textData = data.text;
        let maxRange = document.getElementById("maxRangeInput").value ? document.getElementById("maxRangeInput").value : 100,
            node = new Node(xPos, yPos, radius, maxRange, textData);
        nodeObjectArray.push(node);
        node.show();
        nodeNamesToId[textData] = data.id;
        idToNodeNames[data.id] = textData
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
        // printToLog(`Drawing Line => ${idToNodeNames[sourceId]} ${idToNodeNames[destinationId]}`, 'text-white')
        line(sourceXPos, sourceYPos, destinationXPos, destinationYPos);
    }

}