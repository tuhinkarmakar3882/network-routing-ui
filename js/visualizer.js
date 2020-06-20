let stateNodeData;

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    $.get('http://localhost:8000/', {totalNodesRequired: nodeInput.value})
        .done(response => {
            let nodeData = response.NodeData;

            function draw() {
                background(220);
                radius = 30;
                for (let data in nodeData) {
                    let xPos = nodeData[data].xPos;
                    let yPos = nodeData[data].yPos;
                    let textData = nodeData[data].text;
                    fill(color(245, 6, 128));
                    circle(xPos, yPos, radius);
                    fill(color(0, 0, 0));
                    textSize(16);
                    textStyle(BOLD);
                    text(textData, xPos, yPos);
                }
            }

            draw();
            stateNodeData = nodeData;
        })
        .fail(response => {
            console.log(response.responseJSON);
        });
}

function generateTopology() {
    $.get('http://localhost:8000/generateTopology')
            .done(response => {
                let pathData = response.pathData;
                function draw() {
                   for (let data in pathData) {
                       let sourceId = pathData[data].source;
                       let destinationId = pathData[data].destination;
                       let sourceXPos = stateNodeData[sourceId].xPos;
                       let sourceYPos = stateNodeData[sourceId].yPos;
                       let destinationXPos = stateNodeData[destinationId].xPos;
                       let destinationYPos = stateNodeData[destinationId].yPos;
                       line(sourceXPos,sourceYPos,destinationXPos,destinationYPos);
                   }
               }

                draw();
            })
            .fail(response => {
                console.log(response.responseJSON);
            });
}

function setup() {
    createCanvas(1350, 600);
}
