var VAROBJ = {
 cardswithHtml : [],
 suits : ['spades','diamonds', "clubs" , 'hearts'],
 values : ['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
 prioritySeq : {'A':13,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7,'9':8,'10':9,'J':10,'Q':11,'K':12},
 cardSeq : ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'],
 trumpArr : ['2S', '2D', '2C', '2H', 'Joker'],
 cardIconsUnicodes : {
    'spades': ['&#x1F0A1;', '&#x1F0A2;', '&#x1F0A3;', '&#x1F0A4;', '&#x1F0A5;', '&#x1F0A6;', '&#x1F0A7;', '&#x1F0A8;', '&#x1F0A9;', '&#x1F0AA;', '&#x1F0AB;', '&#x1F0AD;', '&#x1F0AE;'],
    'diamonds' : [ '&#x1F0C1;', '&#x1F0C2;', '&#x1F0C3;', '&#x1F0C4;', '&#x1F0C5;', '&#x1F0C6;', '&#x1F0C7;', '&#x1F0C8;', '&#x1F0C9;', '&#x1F0CA;', '&#x1F0CB;', '&#x1F0CD;', '&#x1F0CE;'],
    'clubs' : [ '&#x1F0D1;', '&#x1F0D2;', '&#x1F0D3;', '&#x1F0D4;', '&#x1F0D5;', '&#x1F0D6;', '&#x1F0D7;', '&#x1F0D8;', '&#x1F0D9;', '&#x1F0DA;', '&#x1F0DB;',  '&#x1F0DD;', '&#x1F0DE;'],
    'hearts': [ '&#x1F0B1;', '&#x1F0B2;', '&#x1F0B3;', '&#x1F0B4;', '&#x1F0B5;', '&#x1F0B6;', '&#x1F0B7;', '&#x1F0B8;', '&#x1F0B9;', '&#x1F0BA;', '&#x1F0BB;', '&#x1F0BD;', '&#x1F0BE;']
 },
 spadesCollection : ['&#x1F0A1;', '&#x1F0A2;', '&#x1F0A3;', '&#x1F0A4;', '&#x1F0A5;', '&#x1F0A6;', '&#x1F0A7;', '&#x1F0A8;', '&#x1F0A9;', '&#x1F0AA;', '&#x1F0AB;', '&#x1F0AD;', '&#x1F0AE;'],
 heartsCollection : [ '&#x1F0B1;', '&#x1F0B2;', '&#x1F0B3;', '&#x1F0B4;', '&#x1F0B5;', '&#x1F0B6;', '&#x1F0B7;', '&#x1F0B8;', '&#x1F0B9;', '&#x1F0BA;', '&#x1F0BB;', '&#x1F0BD;', '&#x1F0BE;'],
 redJoker : [ '&#x1F0BF;'],
 diamondsCollection : [ '&#x1F0C1;', '&#x1F0C2;', '&#x1F0C3;', '&#x1F0C4;', '&#x1F0C5;', '&#x1F0C6;', '&#x1F0C7;', '&#x1F0C8;', '&#x1F0C9;', '&#x1F0CA;', '&#x1F0CB;', '&#x1F0CD;', '&#x1F0CE;'],
 blackJoker : [ '&#x1F0CF;'],
 clubsCollection : [ '&#x1F0D1;', '&#x1F0D2;', '&#x1F0D3;', '&#x1F0D4;', '&#x1F0D5;', '&#x1F0D6;', '&#x1F0D7;', '&#x1F0D8;', '&#x1F0D9;', '&#x1F0DA;', '&#x1F0DB;',  '&#x1F0DD;', '&#x1F0DE;'],
 whiteJoker : [ '&#x1F0DF;'],
 cardPoints : {
    'spades': [25,0,50,0,0,0,0,0,0,0,15,15,20],
    'diamonds': [25,0,0,0,0,0,0,0,0,0,15,15,20],
    'clubs': [25,0,0,0,0,0,0,0,0,0,15,15,20],
    'hearts': [25,0,0,0,0,0,0,0,0,0,15,15,20],
}
}
function variableScreen() {
   toggleVariablesPopup();
   populateVariablesPopup();
}
function toggleVariablesPopup() {
   let variablePopup = document.getElementById('variablesPopup');
   variablePopup.classList.toggle('show');
}
function populateVariablesPopup() {
   let variablePopup = document.getElementsByClassName('variableSettings')[0];
   //idea is to use a makeEditDiv funciotn which will iterate through VAROBJ and display a div having thos values, which can be editable on click.
   let valueDiv = makeEditDiv('values');

   appendAsChild(variablePopup, valueDiv);
}
function makeEditDiv(someName) {
   if (!VAROBJ[someName]) {
      return;
   }
   let content = VAROBJ[someName];
   if (Array().constructor.isArray(content)) {
      //its an array. directly make divs
      let contentDiv = makeArrayEditSpans(someName,content);
      return contentDiv;
   } else {
      //its an object where each child has an array for it.
      let contentDiv = document.createElement('div');
      for(elem of content) {
         let elemDiv = makeArrayEditSpans(elem);
         appendAsChild(contentDiv, elemDiv);
      }
      return contentDiv;
   }
}
function makeArrayEditSpans(arrayName,arrayElems) {
   let groupDiv = document.createElement('div');
   groupDiv.className = 'start_of ' + arrayName;
   let nameSpan = document.createElement('span');
   nameSpan.className = 'arrayName';
   nameSpan.textContent = arrayName;
   appendAsChild(groupDiv, nameSpan);

   for (elem of arrayElems) {
      let elemSpan = document.createElement('span');
      elemSpan.className = 'arrayElem';
      elemSpan.setAttribute('contenteditable', true);
      elemSpan.textContent = elem;
      appendAsChild(groupDiv,elemSpan);
   }
   return groupDiv;
}