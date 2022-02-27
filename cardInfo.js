let cardswithHtml = [];
var suits = ['spades','diamonds', "clubs" , 'hearts'];
var values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let prioritySeq = {'A':13,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7,'9':8,'10':9,'J':10,'Q':11,'K':12}
let cardSeq = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
let cardIconsUnicodes = {
    'spades': ['&#x1F0A1;', '&#x1F0A2;', '&#x1F0A3;', '&#x1F0A4;', '&#x1F0A5;', '&#x1F0A6;', '&#x1F0A7;', '&#x1F0A8;', '&#x1F0A9;', '&#x1F0AA;', '&#x1F0AB;', '&#x1F0AD;', '&#x1F0AE;'],
    'diamonds' : [ '&#x1F0C1;', '&#x1F0C2;', '&#x1F0C3;', '&#x1F0C4;', '&#x1F0C5;', '&#x1F0C6;', '&#x1F0C7;', '&#x1F0C8;', '&#x1F0C9;', '&#x1F0CA;', '&#x1F0CB;', '&#x1F0CD;', '&#x1F0CE;'],
    'clubs' : [ '&#x1F0D1;', '&#x1F0D2;', '&#x1F0D3;', '&#x1F0D4;', '&#x1F0D5;', '&#x1F0D6;', '&#x1F0D7;', '&#x1F0D8;', '&#x1F0D9;', '&#x1F0DA;', '&#x1F0DB;',  '&#x1F0DD;', '&#x1F0DE;'],
    'hearts': [ '&#x1F0B1;', '&#x1F0B2;', '&#x1F0B3;', '&#x1F0B4;', '&#x1F0B5;', '&#x1F0B6;', '&#x1F0B7;', '&#x1F0B8;', '&#x1F0B9;', '&#x1F0BA;', '&#x1F0BB;', '&#x1F0BD;', '&#x1F0BE;']
}
let spadesCollection = ['&#x1F0A1;', '&#x1F0A2;', '&#x1F0A3;', '&#x1F0A4;', '&#x1F0A5;', '&#x1F0A6;', '&#x1F0A7;', '&#x1F0A8;', '&#x1F0A9;', '&#x1F0AA;', '&#x1F0AB;', '&#x1F0AD;', '&#x1F0AE;'];
let heartsCollection = [ '&#x1F0B1;', '&#x1F0B2;', '&#x1F0B3;', '&#x1F0B4;', '&#x1F0B5;', '&#x1F0B6;', '&#x1F0B7;', '&#x1F0B8;', '&#x1F0B9;', '&#x1F0BA;', '&#x1F0BB;', '&#x1F0BD;', '&#x1F0BE;'];
let redJoker = [ '&#x1F0BF;'];
let diamondsCollection = [ '&#x1F0C1;', '&#x1F0C2;', '&#x1F0C3;', '&#x1F0C4;', '&#x1F0C5;', '&#x1F0C6;', '&#x1F0C7;', '&#x1F0C8;', '&#x1F0C9;', '&#x1F0CA;', '&#x1F0CB;', '&#x1F0CD;', '&#x1F0CE;'];
let blackJoker = [ '&#x1F0CF;'];
let clubsCollection = [ '&#x1F0D1;', '&#x1F0D2;', '&#x1F0D3;', '&#x1F0D4;', '&#x1F0D5;', '&#x1F0D6;', '&#x1F0D7;', '&#x1F0D8;', '&#x1F0D9;', '&#x1F0DA;', '&#x1F0DB;',  '&#x1F0DD;', '&#x1F0DE;'];
let whiteJoker = [ '&#x1F0DF;'];