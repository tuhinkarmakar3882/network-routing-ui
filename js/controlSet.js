function printToLog(message, classNames) {
    if (!outputLog)
        outputLog = document.getElementById("logger")

    if(outputLog.innerHTML.length > 10000){
        outputLog.innerHTML = ``
    }
    outputLog.innerHTML += `
         <br/>
         <span class="${classNames ? classNames : 'text-muted'}">${message}</span>
    `;
}

function clearLog() {
    if (!outputLog)
        outputLog = document.getElementById("logger")
    outputLog.innerHTML = ``;
}

function bootUpSystem() {
    printToLog('[+] Interface Ready', 'text-success')

    printToLog("[i] Checking for Backend...", 'text-muted')

    $.get('http://localhost:8000/testConnection')
        .done(() => {
            printToLog(`<span class="text-success">[+] Backend is Online</span>`)
        })
        .fail((response) => {
            printToLog('[X] ERROR! No Backend Found. ', 'text-danger');
            printToLog('[!] Limited Functionality Warning (Only Frontend will work)', 'text-warning');
        });
}

bootUpSystem();
