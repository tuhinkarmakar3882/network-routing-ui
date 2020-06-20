let stateNodeData, statePathData;

function createNodes() {
    let nodeInput = document.getElementById('nodeInput');

    $.get('http://localhost:8000/', {totalNodesRequired: nodeInput.value})
        .done(response => {
            let nodeData = response.NodeData;
            stateNodeData = nodeData;
            function draw() {
                clear();
                background(220);
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
                   background(220)
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
    createCanvas(1500, 600);
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

//window.onload = () => {
//     let nodeInput = document.getElementById('nodeInput');
//     nodeInput.value = Math.random() * 10
//
//     createNodes();
//     setInterval(()=>{
//        generateTopology();
//     },10000)
//}