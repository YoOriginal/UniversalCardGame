console.clear();

// var Cards = [];
// for(var k=0; k<4; k++) {
//     for(var i=0; i<13; i++) {
//         Cards.push(suits[k] + ' ' + values[i]);
//     }
// }
// console.log(Cards);
console.log('Lets try shuffling');
class Card {
    constructor(suit, value, cardIconUnicode, cardName) {
        this.suit = suit;
        this.value = value;
        this.cardIconUnicode = cardIconUnicode;
        this.cardName = cardName;
        if (suit == 'diamonds' || suit == 'hearts') {
            this.color = 'red';
        } else {
            this.color = 'black';
        }
        this.points = '';
    }

    setPoints(pointsVal) {
        this.points = pointsVal;
    }
}
// let myCard = new Card('Spades', '2');
// console.log(myCard);
class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck(suitsArr, valuesArr, cardIconUnicodes, cardSeq) {
        for (let suit of suitsArr) {
            for (let i=0; i<valuesArr.length; i++) {
                this.deck.push(new Card(suit, valuesArr[i], cardIconUnicodes[suit][i], cardSeq[i]));
            }
        }
        return this.deck;
    }

    shuffle() {
        //get a random index. swap it with current index (which is being run from 0 to 51)
        for(let currentIndex=0; currentIndex<this.deck.length; currentIndex++) {
            let randomIndex = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temp;
        }
    }
    dealLastCard() {
        let hand;
        hand = this.deck.pop();
        return hand;
    }
    popByIndex(index) {
        let returnCard = [];
        returnCard = this.deck[index];
        this.deck.splice(index, 1);
        return returnCard;
    }
    findIndexBy(suit, value) {
        let returnIndex = -1;
        for(let i=0; i<this.deck.length; i++) {
            if (this.deck[i].suit == suit) {
                if (this.deck[i].value == value) {
                    returnIndex =  i;
                    break;
                }
            }
        }
        return returnIndex;
    }
}

let myDeck = new Deck();
console.log(myDeck);
// myDeck.createDeck(suits, values);
console.log(myDeck.createDeck(suits,values, cardIconsUnicodes, cardSeq));
// console.log(myDeck.dealLastTwo());
// myDeck.shuffle();
// console.log(myDeck.dealLastTwo());
function cardObjFromDiv(cardDiv) {
    let suit = cardDiv.getAttribute('suit'),
    value = cardDiv.getAttribute('cardvalue'),
    unicode = cardDiv.getAttribute('unicode'),
    cardname = cardDiv.getAttribute('cardname');
    return new Card(suit, value, unicode, cardname);
}
function makeCardDiv(cardObj) {
    let cardDiv = document.createElement('span');
    // console.log(unicodevalue, valueClass);
    cardDiv.className = 'cardClass ' + cardObj.suit + ' ' + cardObj.cardName + ' ' + cardObj.color;
    cardDiv.setAttribute('suit', cardObj.suit);
    cardDiv.setAttribute('cardValue', cardObj.value);
    cardDiv.setAttribute('cardName', cardObj.cardName);
    cardDiv.setAttribute('unicode', cardObj.cardIconUnicode);
    cardDiv.setAttribute('points', cardObj.points)
    cardDiv + ' ' + cardObj.className
    // cardDiv.textContent = '\\' + 'u' +  '{' + unicodevalue + '}';
    // cardDiv.textContent = `${String.fromCodePoint(unicodevalue.split('x')[1].split(';')[0])}`;
    // let iniStr = `\u{` + unicodevalue + `}`;
    // cardDiv.textContent = `\u${unicodevalue.split('x')[1].split(';')[0]}`;
    let iniStr = cardObj.cardIconUnicode.split('x')[1].split(';')[0];
    let decFromHex = parseInt(iniStr, 16);
    cardDiv.textContent = String.fromCodePoint(decFromHex);
    // console.log(cardDiv);
    return cardDiv;
}
function appendCardstoDiv() {
    let cardHolder = document.getElementsByClassName('card-container')[0];
    let cardsArr = document.createElement('div');
    // for(let i=0; i<spadesCollection.length; i++) {
    //     cardsArr.appendChild(makeCardDiv(spadesCollection[i]), i);
    // }
    // cardsArr.appendChild(document.createElement('br'));
    // for(let i=0; i<diamondsCollection.length; i++) {
    //     cardsArr.appendChild(makeCardDiv(diamondsCollection[i]),i);
    // }
    // cardsArr.appendChild(document.createElement('br'));
    // for(let i=0; i<clubsCollection.length; i++) {
    //     cardsArr.appendChild(makeCardDiv(clubsCollection[i]),i);
    // }
    // cardsArr.appendChild(document.createElement('br'));
    // for(let i=0; i<heartsCollection.length; i++) {
    //     cardsArr.appendChild(makeCardDiv(heartsCollection[i]),i);
    // }
    // appendAll(myDeck, cardsArr);
    appendSpecificCards(myDeck, cardsArr);
    cardHolder.appendChild(cardsArr);
    console.log(cardsArr.length);
}
appendCardstoDiv();
function appendAll(myDeck, cardsArr) {
    for(let i=0; i<myDeck.deck.length; i++) {
        cardsArr.appendChild(makeCardDiv(myDeck.deck[i]));
    }
}
function appendSpecificCards(myDeck, cardsArr) {
    let reqIndex = myDeck.findIndexBy('hearts', 'J');
    cardsArr.appendChild(makeCardDiv(myDeck.deck[reqIndex]));
}
function appendAsChild(container, elem) {
    container.appendChild(elem);
}