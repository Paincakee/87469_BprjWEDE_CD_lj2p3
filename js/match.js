let timeoutID;

function flipCard(event) {
    // Get the number of active elements and the clicked card element
    const activeElements = document.querySelectorAll('.active').length;
    const clickedCard = event.currentTarget.closest('.click_box');

    // Ignore clicks on already matched cards or if there are already 2 active cards
    if (clickedCard.classList.contains('won') || activeElements >= 2) {
        return;
    }

    if (activeElements < 2) {
        if (!clickedCard.classList.contains('active')) {
            clickedCard.classList.add('active');
        }

        // Set timeout to check for a match after a short delay
        clearTimeout(timeoutID);
        timeoutID = setTimeout(checkForMatch, 430);
    } else if (activeElements == 2) {
        // Get the matchIds of the two flipped cards
        const flippedCards = document.querySelectorAll('.active');
        const matchId1 = flippedCards[1].getAttribute('data-match-id');
        const matchId2 = flippedCards[flippedCards.length - 2].getAttribute('data-match-id');

        console.log(matchId1);
        console.log(matchId2);
        
        // If the cards match, mark them as won
        if (matchId1 == matchId2) {
            toggleClasses(flippedCards[1], flippedCards[flippedCards.length - 2], "active", "won"); 
        } else {
            // If the cards don't match, flip them back over
            if (!flippedCards[1].classList.contains('won') && !flippedCards[flippedCards.length - 2].classList.contains('won')) {
                flippedCards[1].classList.remove("active");
                flippedCards[flippedCards.length - 2].classList.remove("active");
            }
        }
    }
}

function checkForMatch() {
    const flippedCards = document.querySelectorAll('.active');
        
  
    if (flippedCards.length === 2) {
        const card1Data = flippedCards[1].getAttribute('data-match-id');
        const card2Data = flippedCards[flippedCards.length - 2].getAttribute('data-match-id');

        const card1 = flippedCards[1];
        const card2= flippedCards[flippedCards.length - 2];
        
        console.log(card1Data);
        console.log(card2Data);
        if (card1Data === card2Data) {

            console.log("ez game");
            card1.classList.remove("active");
            card2.classList.remove("active");

            card1.classList.add("won");
            card2.classList.add("won");
        } else {
            flippedCards.forEach(card => card.classList.remove('active'));
        }
    }
}
