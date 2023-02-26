// let highestBidValue = 0;
let BIDDER_ONE = 'player_1', BIDDER_TWO = 'player_2';
//at the end of bidding, open trump popup and append points to all players (showPointsTextForEachPlayer)
let INCREMENT_STEP_VALUE = 10;
//append 'your bid' and then the value

// <div class="bidContainer" style="display: inline-flex;">
//     <div class="bidbuttonsContainer">
//         <button>inc</button>
//     </div> 
//     <span class="bidValueContainer">myBid:
//         <span class="bidValue">20</span>
//     </span>
// </div>

function makeBidDiv() {
    let bidContainer = document.createElement('div');
    bidContainer.className = 'bidContainer';
    let bidButtonsContainer= document.createElement('div');
    bidButtonsContainer.className = 'bidButtonsContainer';
    let bidValueContainer = document.createElement('span');
    bidValueContainer.textContent = 'myBid:';
    bidValueContainer.className = 'bidValueContainer';
    let bidValue = document.createElement('span');
    bidValue.className = 'bidValue';
    bidValue.textContent = '0';
    
    bidValueContainer.appendChild(bidValue);
    bidContainer.appendChild(bidValueContainer);
    bidContainer.appendChild(bidButtonsContainer)
    return bidContainer;
}
let playerDivs =document.getElementsByClassName('playerDiv');
for (player of playerDivs) {
    appendAsChild(player, makeBidDiv());
}
function makeBidButton(btnType) {
    let bidButton = document.createElement('button');
    bidButton.className = 'bidBtn' + btnType;
    bidButton.setAttribute('btnType', btnType);
    bidButton.textContent = btnType;
    bidButton.addEventListener('click', handleBidBtns(btnType));
    return bidButton;
}
function handleBidBtns(btnType) {
    //here function definitions are returned, which will get executed when click happens on bidBtns
    if (btnType == 'increment') {
        return handleIncrement;
    }
    if (btnType == 'equalise') {
        return handleEqualise;
    }
    if (btnType == 'backout') {
        return handleBackout;
    }
}
function handleIncrement(e) {
    let currBidder = e.target.closest('.playerDiv'),
    currBidderId = currBidder.getAttribute('player'),
    currBidderBidValueSpan = currBidder.querySelector('.bidValue'),
    otherBidder = '', otherBidderBidValueSpan = '';
    if (currBidderId == BIDDER_ONE) {
        //curr Bidder is bidderOne. other bidder is bidderTwo.
        otherBidder = document.getElementsByClassName(BIDDER_TWO)[0];
    } else {
        //curr Bidder is bidderTwo. other bidder is bidderOne.
        otherBidder = document.getElementsByClassName(BIDDER_ONE)[0];
    }
    otherBidderBidValueSpan = otherBidder.querySelector('.bidValue');

    let currBidderBidValue = Number(currBidderBidValueSpan.textContent),
    otherBidderBidValue = Number(otherBidderBidValueSpan.textContent);
    if (otherBidderBidValue >=  currBidderBidValue) {
        currBidderBidValueSpan.textContent = otherBidderBidValue + INCREMENT_STEP_VALUE;
        // currBidder.querySelector('.bidBtnbackout').classList.remove('hidden');
        // otherBidder.querySelector('.bidBtnbackout').classList.add('hidden');
    } else {
        currBidderBidValueSpan.textContent = currBidderBidValue + INCREMENT_STEP_VALUE;

    }
    currBidder.querySelector('.bidBtnbackout').classList.add('hidden');
    otherBidder.querySelector('.bidBtnbackout').classList.remove('hidden');
}
function handleEqualise(e) {
    let currBidder = e.target.closest('.playerDiv'),
    currBidderId = currBidder.getAttribute('player'),
    currBidderBidValueSpan = currBidder.querySelector('.bidValue'),
    //equalise is shown only to BIDDER_ONE
    otherBidder = document.getElementsByClassName(BIDDER_TWO)[0],
    otherBidderBidValueSpan = otherBidder.querySelector('.bidValue');
    if (Number(otherBidderBidValueSpan.textContent) > Number(currBidderBidValueSpan.textContent)) {
        currBidderBidValueSpan.textContent = otherBidderBidValueSpan.textContent;
    }
    currBidder.querySelector('.bidBtnbackout').classList.add('hidden');
    otherBidder.querySelector('.bidBtnbackout').classList.remove('hidden');
}
function handleBackout(e) {
    //case1: bidderOne backsOut. then biddertwo becomes bidderOne, and next player becomes bidderTwo
    //case2: bidderTwo backsOut. then next player becomes bidderTwo.
    //place limit on next player who becomes bidderTwo. if next player is the one who started the bidding,
    // then bidding complete. time to choose trump
    let currBidder = e.target.closest('.playerDiv'),
    currBidderId = currBidder.getAttribute('player'),
    currBidderBidValueSpan = currBidder.querySelector('.bidValue'),
    otherBidder = '', otherBidderBidValueSpan = '',otherBidderId = '';
    if (currBidderId == BIDDER_ONE) {
        //curr Bidder is bidderOne. other bidder is bidderTwo.
        otherBidder = document.getElementsByClassName(BIDDER_TWO)[0];
        otherBidderId = BIDDER_TWO;
    } else {
        //curr Bidder is bidderTwo. other bidder is bidderOne.
        otherBidder = document.getElementsByClassName(BIDDER_ONE)[0];
        otherBidderId = BIDDER_ONE;
    }
    otherBidderBidValueSpan = otherBidder.querySelector('.bidValue');

    let currBidderBidValue = Number(currBidderBidValueSpan.textContent),
    otherBidderBidValue = Number(otherBidderBidValueSpan.textContent),
    highestBidValue = 0;
    if (otherBidderBidValue >=  currBidderBidValue) {
        highestBidValue = otherBidderBidValue;
        // currBidder.querySelector('.bidBtnbackout').classList.remove('hidden');
        // otherBidder.querySelector('.bidBtnbackout').classList.add('hidden');
    } else {
        highestBidValue = currBidderBidValue;
    }
    // console.log(currBidderId, otherBidderId, highestBidValue);
    let nextplayerId = '';
    if (currBidderId == BIDDER_ONE) {
        //case1
        nextplayerId = findNextPlayerId(otherBidderId);
        if (nextplayerId == BIDDER_ONE) {
            biddingComplete(BIDDER_TWO);
            return;
        }
        removeBidbtns(currBidderId);
        removeBidbtns(otherBidderId);
        bidBtns_bidderOne(otherBidderId);
        BIDDER_ONE = otherBidderId;
        BIDDER_TWO = nextplayerId;
    } else {
        //case2
        nextplayerId = findNextPlayerId(currBidderId);
        //if nextplayerId is BIDDER_ONE itself, bidding complete
        if (nextplayerId == BIDDER_ONE) {
            biddingComplete(BIDDER_ONE);
            return;
        }
        removeBidbtns(currBidderId);
        BIDDER_TWO = nextplayerId;
    }
    bidBtns_bidderTwo(nextplayerId);
    addbiddingOutClassTo(currBidderId);
    copyBidvalue(nextplayerId, highestBidValue);
}
function addbiddingOutClassTo(bidderId) {
    let bidDiv = document.getElementsByClassName(bidderId)[0];
    bidDiv.querySelector('.bidContainer').classList.add('biddedOut');
}
function copyBidvalue(copyToBidderId, value) {
    let bidDiv = document.getElementsByClassName(copyToBidderId)[0];
    bidDiv.querySelector('.bidValue').textContent = value;
}
function biddingComplete(bidderId) {
    myLog('normal','bidding complete and won by : ' + bidderId);
    //at the end of bidding, distribute cards and open trump popup and append points to all players (showPointsTextForEachPlayer)
    //also remove bidContainers from all players
    for (elem of document.querySelectorAll('.bidContainer') ) {
        elem.remove();
    }
    showPointsTextForEachPlayer();
    distributeCards();
    setupTrumpPopup();

}
function findNextPlayerId(bidderId) {
    //find next element in a cycle which does not have biddedOut class in bidContainer div, 
    //starting from next element fo currentBidderdId. 
    //Recursive solution
    let playerIdSplit = bidderId.split('_');
    let nextPlayerNumber = '';
    if (Number(playerIdSplit[1]) == NUM_OF_PLAYERS ) {
        nextPlayerNumber = 1;
    } else {
        nextPlayerNumber = Number(playerIdSplit[1]) + 1;
    }
    let nextPlayerId = playerIdSplit[0] + '_' + nextPlayerNumber;
    let nextPlayerDiv = document.getElementsByClassName(nextPlayerId)[0];
    if (nextPlayerDiv.querySelector('.bidContainer').classList.contains('biddedOut')) {
        return findNextPlayerId(nextPlayerId);
    } else {
        return nextPlayerId;
    }

}
function bidBtns_bidderOne(BIDDER_ONE) {
    let playerDiv = document.getElementsByClassName(BIDDER_ONE)[0];
    bidDiv = playerDiv.querySelector('.bidContainer');
    let bidbtnscontainer = bidDiv.querySelector('.bidButtonsContainer');
    bidbtnscontainer.textContent = '';
    appendAsChild(bidbtnscontainer, makeBidButton('increment'));
    appendAsChild(bidbtnscontainer, makeBidButton('equalise'));
    appendAsChild(bidbtnscontainer, makeBidButton('backout'));
}
function bidBtns_bidderTwo(BIDDER_TWO) {
    let playerDiv = document.getElementsByClassName(BIDDER_TWO)[0];
    bidDiv = playerDiv.querySelector('.bidContainer');
    let bidbtnscontainer = bidDiv.querySelector('.bidButtonsContainer');
    bidbtnscontainer.textContent = '';
    appendAsChild(bidbtnscontainer, makeBidButton('increment'));
    // appendAsChild(bidbtnscontainer, makeBidButton('equalise'));
    appendAsChild(bidbtnscontainer, makeBidButton('backout'));
}
function removeBidbtns(bidderId) {
    let bidderDiv = document.getElementsByClassName(bidderId)[0];
    bidderDiv.querySelector('.bidButtonsContainer').replaceChildren();
}
bidBtns_bidderOne(BIDDER_ONE);
bidBtns_bidderTwo(BIDDER_TWO);