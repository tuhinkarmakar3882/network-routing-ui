window.onload = () => {
    function injectFooter() {
        const footer = document.createElement('footer');
        footer.classList = 'footer lead';
        footer.innerHTML = `
        &copy; Tuhin Karmakar
        <br>
        <small>
        <a class="text-muted" href="#">Back To Top</a>
        </small>
    `
        document.body.appendChild(footer)
    }

    function injectReference() {
        const referenceDiv = document.createElement('div');
        referenceDiv.classList = 'my-4 py-2 container'
        referenceDiv.innerHTML = `
            <h1 id="referenceSection" class="titleText">Reference Section</h1>
            
            <h3 class="mt-5 heading">About the Project</h3>
            <p class="lead referenceText">
                This is a custom made Network Routing Visualizer which is completely made from scratch using
                Python and JavaScript. This aim to solve the problem of simulating the routing algorithms with
                maximum possible extensibility. 
            </p>   
            
            <h3 class="mt-5 heading">Getting Started</h3>
            <p class="lead referenceText">
                <ol>
                  <li class="lead">Create Nodes</li>  
                  <li class="lead">Generate Static Topology</li>  
                  <li class="lead">Start Discovering Paths</li>  
                  <li class="lead">Use Additional Tools if required</li>  
                </ol>
            </p>
            
            <h3 class="mt-5 heading">Want to customize it as per your requirements?</h3>
            <p class="lead referenceText">
                Just Modify the Backend to Handle the Requirements. And It's all Yours!
            </p>   
            

        `
        document.body.appendChild(referenceDiv)
    }

    injectReference();
    injectFooter();
}