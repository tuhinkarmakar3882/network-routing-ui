let peculiarData;

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
            peculiarData = nodeData;
        })
        .fail(response => {
            console.log(response.responseJSON);
        });
}

let x, y;

function setup() {
    createCanvas(1350, 600);
    x = width / 2;
    y = height;
}

function draw() {
    background(220);
    radius = 30;
    for (let data in peculiarData) {
        let xPos = peculiarData[data].xPos;
        let yPos = peculiarData[data].yPos;
        let textData = peculiarData[data].text;
        // peculiarData[data].xPos = peculiarData[data].xPos + (random(-3, 3));
        // Moving up at a constant speed
        // rect(xPos,yPos, yPos,xPos);
        // peculiarData[data].yPos = peculiarData[data].yPos - (random(-3, 3));
        fill(color(225, 225, 0));
        circle(xPos, yPos, radius);
        fill(color(0, 0, 0));
        textSize(16);
        textStyle(BOLD);
        text(textData, xPos, yPos);
        if (peculiarData[data].yPos < 0) {
            peculiarData[data].yPos = height;
        }
    }

}
