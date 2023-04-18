let timeoutID;
let timerStarted = false;
let timerIntervalId;
let timer = 0;
let user = "";

function flipCard(event) {
    // Get the number of active elements and the clicked card element
    const activeElements = document.querySelectorAll('.active').length;
    const clickedCard = event.currentTarget.closest('.click_box');

    
    // Ignore clicks on already matched cards or if there are already 2 active cards
    if (clickedCard.classList.contains('won') || activeElements >= 2) {
        return;
    }

    const activeDescs = document.querySelectorAll('.descriptions.active').length;
    const activeImages = document.querySelectorAll('.images.active').length;

    // Ignore clicks on descriptions if there is already one or more active descriptions
    if (clickedCard.classList.contains('descriptions') && activeDescs > 0 || clickedCard.classList.contains('images') && activeImages > 0) {
        return;
    }

    if (!timerStarted) {
        timerStarted = true;
        const startTime = Date.now() + 30000; // set the start time to 30 seconds from now
        let styleTime = 30
        timerIntervalId = setInterval(() => {
            const won = document.querySelectorAll('.won').length;
            timer = (startTime - Date.now()) / 1000; // calculate the remaining time
            document.getElementById("timer_text").innerHTML = (timer <= 0 ? "0.00" : timer.toFixed(2)) + " seconds";

            // Stop the timer when all cards are matched or time is up
            if (won == 10 || timer <= 0 ) {
                clearInterval(timerIntervalId);
                let text;
                if (won == 10) {
                    setTimeout(() => {
                        const message = `You have found all pairs. Time left: ${timer.toFixed(2)} seconds \nWhat is your name?`;
                        user = prompt(message, "");
                    }, 10);
                } else {
                    
                    setTimeout(() => {
                        alert(Math.max(0, timer).toFixed(2));
                    }, 10);
                      
                    
                }

                // Save stats and reset game when user enters their name
                if (user != null) {
                    
                } else if(user = ""){
                    alert('Stats not saved');
                    location.reload();
                }
            }
        }, 10);
    }
    
    if (activeElements < 2) {
        
        if (!clickedCard.classList.contains('active')) {
            clickedCard.classList.add('active');
        }


        clearTimeout(timeoutID);
        timeoutID = setTimeout(checkForMatch, 400);

    } 
}

function checkForMatch(event) {
    const flippedCards = document.querySelectorAll('.active');
        
    if (flippedCards.length == 2) {
        const card1Data = flippedCards[1].getAttribute('data-match-id');
        const card2Data = flippedCards[flippedCards.length - 2].getAttribute('data-match-id');

        const card1 = flippedCards[1];
        const card2= flippedCards[flippedCards.length - 2];
        
        if (card1Data == card2Data) {

            // console.log("Found");
            card1.classList.remove("active");
            card2.classList.remove("active");

            card1.classList.add("won");
            card2.classList.add("won");
        } else {
            flippedCards.forEach(card => card.classList.remove('active'));
        }
    }
}
