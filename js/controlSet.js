let cards = document.getElementsByClassName("collapsible");
for (let card of cards) {
    card.addEventListener('click', () => {
        if (card.style.maxHeight === '61px') {
            card.style.maxHeight = '460px';
        } else {
            card.style.maxHeight = '61px';
        }
    });
}

printToLog("[+] Interface Ready")