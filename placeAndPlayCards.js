let NUM_OF_PLAYERS = 6;
let POT_CONTAINER = document.getElementsByClassName('playAreaDiv')[0];
// let playableCards = document.querySelectorAll('.player-container .cardClass');
let INITIAL_CARD_DISTRIBUTION = 4;
let ARE_CARDS_DISCARDED_AT_START = false;
function makePlayerDiv(playerId) {
    let playerDiv = document.createElement('div');
    playerDiv.className = 'playerDiv player_' + playerId;
    playerDiv.textContent = 'player_' + playerId;
    playerDiv.setAttribute('player', 'player_' + playerId);
    let playerCardsDiv  = document.createElement('div');
    playerCardsDiv.className = 'playerCards';
    appendAsChild(playerDiv, playerCardsDiv);
    return playerDiv;
}
function playerSpaceDivs(noOfPlayers) {
    let playerDivHolder = document.createElement('div');
    for (let i=1; i<=noOfPlayers; i++) {
        playerDivHolder.appendChild(makePlayerDiv(i));
    }
    return playerDivHolder;
}
function appendToPlayerContainer(playerDivsColl) {
    let playerContainerDiv = document.getElementsByClassName('player-container')[0];
    playerContainerDiv.appendChild(playerDivsColl);
    // let playAreaDiv = document.createElement('div');
    // playAreaDiv.className = 'playAreaDiv';
    // playAreaDiv.textContent = 'pot here';
    // playerContainerDiv.appendChild(playAreaDiv);
}

let playerDivsColl = playerSpaceDivs(NUM_OF_PLAYERS);
appendToPlayerContainer(playerDivsColl);
let discardedCards = [];
function distributeCards() {
    discardCardsFromDeckAtStart();
    distributeCardsEqually(NUM_OF_PLAYERS, INITIAL_CARD_DISTRIBUTION);
    playerToStart = document.getElementsByClassName('playerDiv')[0].getAttribute('player');
    applyRestrictedToAllPlayers();
    INITIAL_CARD_DISTRIBUTION = myDeck.deck.length / NUM_OF_PLAYERS;
}
function discardCardsFromDeckAtStart() {
    if (ARE_CARDS_DISCARDED_AT_START == true) {
        return;
    }
    // myDeck.shuffle();
    if(NUM_OF_PLAYERS == 6) {
        //remove all 2s. 
        for(let i=0; i<myDeck.deck.length; i++) {
            if(myDeck.deck[i].value == '2') {
                discardedCards.push(myDeck.popByIndex(i));
                i--;
            }
        }
    }
    ARE_CARDS_DISCARDED_AT_START = true;
    myLog('normal','discarded cards at start');
}
function distributeCardsEqually(noOfPlayers, noOfCardsToEachPlayer) {
    myDeck.shuffle();
    let playerDivs = document.getElementsByClassName('playerCards');
    let i=0;
    while(i < noOfPlayers * noOfCardsToEachPlayer) {
        let lastCard = myDeck.dealLastCard();
        let cardDiv = makeCardDiv(lastCard);
        cardDiv.addEventListener('click', placeCardinPot);
        playerDivs[i%noOfPlayers].appendChild(cardDiv);
        i++;
    }
    // for (elem of playableCards) {
    //     elem.addEventListener('click', placeCardinPot);
    // }
}


// for (elem of cards) {
//     elem.addEventListener('click', placeCardinPot);
// }
function placeCardinPot(e) {
    let targetCard = e.target;
    // let newCard = new Card(targetCard.getAttribute('suit'), targetCard.getAttribute('cardvalue'), targetCard.getAttribute('unicode'), targetCard.getAttribute('cardname'));
    let noOfCardsInPot = POT_CONTAINER.getElementsByClassName('cardClass').length;
    let baseSuit = '';
    if (noOfCardsInPot != 0) {
        baseSuit = POT_CONTAINER.getElementsByClassName('cardClass')[0].getAttribute('suit');
    }
    let playerDiv = targetCard.closest('.playerDiv');
    if (playerDiv.classList.contains('restricted')) {
        myLog('error','Its not your turn. Please wait while current player plays its turn');
    } else {
        if (noOfCardsInPot == 0 || playerCardCheck(targetCard, baseSuit)) {
            cardToPot(targetCard);
            applyRestrictedToSelf(playerDiv);
            // potContainer.appendChild(makeCardDiv(newCard));
        } else {
            myLog('error','You have a card of base suit in your hand. Please play that');
        }
    }
}
function playerCardCheck(cardDiv, baseSuit) {
    //returns true if cardDiv has suit of base suit of pot.
    if (baseSuit == '') {
        return false;
    }
    let cardSuit = cardDiv.getAttribute('suit');
    if (cardSuit == baseSuit) {
        return true;
    }
    let playerCards = cardDiv.closest('.playerDiv').getElementsByClassName('cardClass');
    if (playerAllCardsCheck(playerCards, baseSuit) == false) {
        return false;
    }
    return true;
}
function playerAllCardsCheck(playerCards, baseSuit) {
    for(let i=0; i<playerCards.length; i++) {
        if (playerCards[i].getAttribute('suit') == baseSuit) {
            return false;
        }
    }
}
function potCheck() {
    let cardsInPot = POT_CONTAINER.getElementsByClassName('cardClass');
    if (cardsInPot.length == 0 || cardsInPot.length !== NUM_OF_PLAYERS) {
        myLog('error','Please add cards and wait for all players to play their cards');
        return;
    }
    let highestCardIndex = decideWinningCardOfHand(cardsInPot);
    let resultContainer = makeResultDiv(cardsInPot[highestCardIndex]);
    playerToStart = cardsInPot[highestCardIndex].getAttribute('player');
    appendAsChild(resultContainer, makeCardDiv(cardObjFromDiv(cardsInPot[highestCardIndex])));
    calculatePointsAndAddToPlayer(playerToStart);
    POT_CONTAINER.textContent = '';
    let playerDiv = document.getElementsByClassName(playerToStart)[0];
    removeRestricted(playerDiv);
}
function decideWinningCardOfHand(cardsInPot) {
    //case1: trump not opened. Use base suit 
    //case2: trump opened. There is a trump card in hand
    //case3: trump opened. There is no trump card in hand. use base suit.
    let isTrumpSuitInPot = false;
    let baseSuit = cardsInPot[0].getAttribute('suit');
    let highestCardValue = 0;
    let highestCardIndex = 0;
    let highestCardIndexOfTrump = -1;
    let highestCardValueForTrump = 0;
    for (let i=0; i<NUM_OF_PLAYERS; i++) {
        let currCardSuit = cardsInPot[i].getAttribute('suit');
        let cardPriorityValue = findPriority(cardsInPot[i].getAttribute('cardvalue'));
        if (currCardSuit == SELECTED_TRUMP && isTrumpOpened == true) {
            isTrumpSuitInPot = true;
            if (cardPriorityValue >= highestCardValueForTrump) {
                highestCardValueForTrump = cardPriorityValue;
                highestCardIndexOfTrump = i;
            }
        }
        if (currCardSuit == baseSuit) {
            if (cardPriorityValue >= highestCardValue) {
                highestCardValue = cardPriorityValue;
                highestCardIndex = i;
            }
        }
    }
    if (isTrumpSuitInPot) {
        return highestCardIndexOfTrump;
    } else {
        return highestCardIndex;
    }
}
function makeResultDiv(cardDiv) {
    let text = 'Winner of current Hand is ' + cardDiv.getAttribute('player') + ' for playing card:';
    let resultContainer = document.getElementsByClassName('resultDiv')[0];
    resultContainer.textContent = text;
    return resultContainer;
}
function getHigherValue(card1Div, card2Div) {
    let card1Value = card1Div.getAttribute('value'),
    card2Value = card2Div.getAttribute('value');
    if (findPriority(card1Value) > findPriority(card2Value)) {
        return card1Value;
    } else {
        return card2Value;
    }
}
function findPriority(cardValue) {
    return VAROBJ.prioritySeq[cardValue];
}
function cardToPot(targetCard) {
    // let newCard = cardObjFromDiv(targetCard);
    let player = targetCard.closest('.playerDiv').getAttribute('player');
    // targetCard.remove();
    // let cardDiv = makeCardDiv(newCard);
    // cardDiv.setAttribute('player', player);
    targetCard.setAttribute('player', player);
    appendAsChild(POT_CONTAINER, targetCard);
}
//we can restrict player by adding restricted class to playerDiv. if restricted class, give error.
//at start when distributing we can restrict all except the one who wins bidding (or player_1)
//after potCheck happens and winner of hand is declared, apply restricted to all except winner of hand.
//when an unrestricted player plays their card, apply restricted to itself and allow next player to play by removing restricted class. stop removing when next player is the one who started the hand.
var playerToStart = '';
function applyRestrictedToAllPlayers() {
    let playerDivs = document.getElementsByClassName('playerDiv');
    for(player of playerDivs) {
        applyRestrictedToSelf(player);
    }
    removeRestricted(playerDivs[0]);
}
function applyRestrictedToSelf(playerDiv) {
    // let playerDiv = cardDiv.closest('.playerDiv');
    playerDiv.classList.add('restricted');
    // removeRestricted(playerDiv);
    removeRestrictedFromNext(playerDiv);
}
function removeRestricted(playerDiv) {
    playerDiv.classList.remove('restricted');
}
function removeRestrictedFromNext(currentPlayerCardDiv) {
    let playerDivs = document.getElementsByClassName('playerDiv');
    let nextElem = currentPlayerCardDiv.nextElementSibling;
    if (nextElem == null || nextElem == undefined) {
        nextElem = playerDivs[0];
    }
    let nextElemPlayer = nextElem.getAttribute('player');
    if (nextElemPlayer != playerToStart)  {
        nextElem.classList.remove('restricted');
    }
}
