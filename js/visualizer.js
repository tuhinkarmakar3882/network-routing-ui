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
                    circle(xPos, yPos, radius);
                }
            }

            draw();
        })
        .fail(response => {
            console.log(response.responseJSON);
        });
}

function setup() {
    createCanvas(1000, 500);
}

