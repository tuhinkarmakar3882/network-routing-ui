window.onload = () => {
    setTimeout(() => {
        injectBody();
    }, 2500)
    injectHeaders();
}

function injectHeaders() {
    loadJS("js/visualizer.js");
    loadJS("js/jquery-3.5.1.min.js");
    loadJS("js/bootstrap.bundle.min.js");

    loadCSS("css/bootstrap.min.css");
    loadCSS("css/themeData.css");
    loadCSS("css/visualizer.css");
    loadCSS("https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&family=Source+Serif+Pro:wght@400;600&display=swap");
}

function injectBody() {
    document.body.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark container-fluid">
            <a class="navbar-brand" href="#">
                <svg fill="#06B7C4" class="mx-1" id="Capa_1" enable-background="new 0 0 512 512" height="40"
                     viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path id="XMLID_320_"
                              d="m493.767 182.257h-107.879v-55.027h62.425l-5.406 5.408c-5.857 5.858-5.856 15.356.002 21.213 2.929 2.928 6.767 4.392 10.605 4.392s7.679-1.465 10.607-4.395l30.746-30.753c5.856-5.857 5.856-15.354 0-21.211l-30.746-30.752c-5.856-5.859-15.354-5.859-21.213-.002-5.858 5.857-5.859 15.355-.002 21.213l4.886 4.887h-76.904c-8.284 0-15 6.716-15 15v70.027h-84.888v-131.039l5.139 5.14c5.855 5.859 15.354 5.859 21.213.002 5.858-5.857 5.859-15.355.002-21.213l-30.747-30.752c-2.812-2.814-6.628-4.395-10.607-4.395s-7.795 1.581-10.607 4.395l-30.746 30.753c-5.857 5.858-5.856 15.356.002 21.213 2.929 2.928 6.768 4.392 10.605 4.392 3.839 0 7.679-1.465 10.607-4.395l5.139-5.14v131.039h-84.888v-70.027c0-8.284-6.716-15-15-15h-76.904l4.886-4.887c5.857-5.858 5.856-15.356-.002-21.213-5.857-5.856-15.355-5.856-21.213.002l-30.746 30.752c-5.856 5.857-5.856 15.354 0 21.211l30.746 30.753c2.929 2.93 6.768 4.395 10.607 4.395 3.838 0 7.677-1.464 10.605-4.392 5.858-5.857 5.859-15.355.002-21.213l-5.406-5.408h62.425v55.027h-107.879c-8.284 0-15 6.716-15 15v117.517c0 8.284 6.716 15 15 15h107.879v55.19h-62.424l5.406-5.407c5.857-5.858 5.856-15.356-.002-21.213-5.857-5.856-15.355-5.856-21.213.002l-30.746 30.752c-5.856 5.857-5.856 15.354 0 21.211l30.746 30.752c2.929 2.93 6.768 4.395 10.607 4.395 3.838 0 7.677-1.464 10.605-4.392 5.858-5.857 5.859-15.355.002-21.213l-4.886-4.887h76.904c8.284 0 15-6.716 15-15v-70.19h84.889v131.007l-5.139-5.14c-5.855-5.859-15.354-5.859-21.213-.002-5.858 5.857-5.859 15.355-.002 21.213l30.746 30.753c2.813 2.814 6.629 4.395 10.608 4.395s7.795-1.581 10.607-4.395l30.746-30.752c5.857-5.858 5.856-15.356-.002-21.213-5.857-5.856-15.355-5.856-21.213.002l-5.139 5.14v-131.008h84.888v70.19c0 8.284 6.716 15 15 15h76.904l-4.886 4.887c-5.857 5.858-5.856 15.356.002 21.213 2.929 2.928 6.768 4.392 10.605 4.392 3.839 0 7.679-1.465 10.607-4.395l30.746-30.752c5.856-5.857 5.856-15.354 0-21.211l-30.746-30.752c-5.856-5.859-15.354-5.859-21.213-.002-5.858 5.857-5.859 15.355-.002 21.213l5.406 5.407h-62.425v-55.19h107.879c8.284 0 15-6.716 15-15v-117.517c.003-8.284-6.713-15-14.997-15zm-15 117.517h-445.534v-87.517h445.533v87.517z"/>
                        <ellipse id="XMLID_319_" cx="68.466" cy="256.016" rx="15.24" ry="15.243"
                                 transform="matrix(1 -.004 .004 1 -1.113 .3)"/>
                        <ellipse id="XMLID_318_" cx="120.601" cy="256.016" rx="15.24" ry="15.243"
                                 transform="matrix(1 -.004 .004 1 -1.112 .527)"/>
                        <ellipse id="XMLID_317_" cx="172.735" cy="256.016" rx="15.24" ry="15.243"
                                 transform="matrix(1 -.004 .004 1 -1.112 .754)"/>
                        <path id="XMLID_316_"
                              d="m443.534 271.259c8.417 0 15.24-6.825 15.24-15.243s-6.823-15.243-15.24-15.243-15.24 6.825-15.24 15.243 6.823 15.243 15.24 15.243z"/>
                    </g>
                </svg>
                Network Routing Visualizer
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Visualizer <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#referenceSection">References</a>
                    </li>
                </ul>
            </div>
        </nav>
        
        <div class="container-fluid">
            <h1 class="titleText display-4">Network Routing Visualizer</h1>
        
            <div class="row justify-content-center mt-5 px-lg-5">
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-lg-6 col-12 my-2">
                            <div class="card shadow ">
                                <div class="card-header">
                                    <p class="text-center mb-0">Create Nodes</p>
                                </div>
                                <div class="card-body">
        
                                    <label class="mb-3 lead" for="nodeInput">How Many Nodes?</label>
                                    <input class="form-control form-control-sm mb-3" id="nodeInput" type="text"
                                           placeholder="e.g. 5">
                                    <p class="lead">This will create nodes with random Values</p>
                                </div>
                                <div class="card-footer text-center">
                                    <button class="btn customBtn" onclick="createNodes()" type="button">Create now!</button>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-lg-6 col-12 my-2">
                            <div class="card shadow ">
                                <div class="card-header">
                                    <p class="text-center mb-0">Start Scanning</p>
                                </div>
                                <div class="card-body ">
                                    <label class="mb-3 lead" for="maxRangeInput">Scanning Range:</label>
                                    <input class="form-control form-control-sm mb-3" type="text" id="maxRangeInput"
                                           placeholder="e.g. 250"/>
                                    <p class="lead">This will Start Scanning For Other ADHOC Nodes</p>
                                </div>
                                <div class="card-footer text-center">
                                    <button onclick="scanForNodes()" class="btn customBtn " type="button">
                                        Start Scanning
                                    </button>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-lg-6 col-12 my-2">
                            <div class="card shadow ">
                                <div class="card-header">
                                    <p class="text-center mb-0">Discover Route</p>
                                </div>
                                <div class="card-body ">
                                    <label class="mb-3 lead" for="source">Source Node:</label>
                                    <input class="form-control form-control-sm mb-3" id="source" type="text">
                                    <label class="mb-3 lead" for="destination">Destination Node:</label>
                                    <input class="form-control form-control-sm mb-3" id="destination" type="text">
                                </div>
                                <div class="card-footer text-center">
                                    <button id="discoverRoute" onclick="discoverRoute()" class="btn customBtn " type="button">
                                        Perform
                                        Discovery!
                                    </button>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-lg-6 col-12 my-2">
                            <div class="card shadow ">
                                <div class="card-header">
                                    <p class="text-center mb-0">Send Data Packets</p>
                                </div>
                                <div class="card-body ">
                                    <label class="mb-2 lead" for="msgSource">Source Node:</label>
                                    <input class="form-control form-control-sm mb-2" type="text" id="msgSource"
                                           placeholder="PQR"/>
                                    <label class="mb-2 lead" for="msgDestination">Destination Node:</label>
                                    <input class="form-control form-control-sm mb-2" type="text" id="msgDestination"
                                           placeholder="XIY"/>
                                    <label class="mb-2 lead" for="packetsCount">Total Packets:</label>
                                    <input class="form-control form-control-sm mb-2" type="text" id="packetsCount"
                                           placeholder="100"/>
                                </div>
                                <div class="card-footer text-center">
                                    <button onclick="testDelivery()" class="btn customBtn" type="button">
                                        Test Delivery Ratio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="row outputLogger justify-content-center my-2">
                        <div class="col-12">
                            <h1 class="titleText">Output Log</h1>
                        </div>
                        <div class="col-12">
                            <div class="text-white px-3 py-2">
                                <p class="w-100" id="logger"></p>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button onclick="clearLog()" class="btn px-5 my-4 customBtn" type="button">
                                Clear Log
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <h1 class="titleText">Additional Controls</h1>
        
        <div class="container">
            <div class="row text-center justify-content-center align-items-center">
                <div class="col-12 col-md-6 col-lg-4 text-center my-3">
                    <button class="btn customBtn" id="realtimeMovementBtn" onclick="enableRealtimeMovement()">
                        Turn on Realtime Movement
                    </button>
                </div>
                <div class="col-12 col-md-6 col-lg-4 text-center my-3">
                    <button class="btn customBtn" id="sendMessagePackets" onclick="startMessageListener()">
                        Start Message Listeners
                    </button>
                </div>
                <div class="col-12 col-md-6 col-lg-4 text-center my-3">
                    <button class="btn customBtn" id="enableDynamicTopologyBtn" onclick="toggleDynamicTopology()">
                        Turn on Dynamic Topology
                    </button>
                </div>
            </div>
        </div>
        
        <div class="jumbotron customBgMetric my-4 py-5 px-5 container">
            <h1 class="titleText">Performance Measurement</h1> 
            <h4 class="text-center mtext mt-5 mb-4">Packet Delivery Loss => <span class="text-warning" id="lossRate">INF</span> %</h4>
            <h4 class="text-center mtext my-4">Route Discovery Time => <span class="text-warning" id="timeTaken">INF</span> seconds</h4>    
        </div>
        
        <h1 class="titleText">Simulation Canvas</h1>
        
    `
    loadJS("js/p5.min.js");
    loadJS("js/controlSet.js");
    setTimeout(() => {
        loadJS("js/injector.js");
    }, 1000)
}

function loadCSS(filename) {
    let htmlLinkElement = document.createElement("link");
    htmlLinkElement.setAttribute("rel", "stylesheet");
    htmlLinkElement.setAttribute("type", "text/css");
    htmlLinkElement.setAttribute("href", filename);
    htmlLinkElement.setAttribute("media", "print");
    htmlLinkElement.setAttribute("onload", "this.media='all'");

    document.getElementsByTagName("head")[0].appendChild(htmlLinkElement)
}

function loadJS(filename, sync, defer) {
    let htmlScriptElement = document.createElement('script')
    htmlScriptElement.setAttribute("type", "text/javascript")
    htmlScriptElement.setAttribute("src", filename)
    if (!sync) {
        htmlScriptElement.setAttribute("async", '');
    }
    if (defer) {
        htmlScriptElement.setAttribute("defer", '');
    }
    document.getElementsByTagName("head")[0].appendChild(htmlScriptElement)
}
