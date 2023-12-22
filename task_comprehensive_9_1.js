'use strict';
let parent_result = document.querySelector('#parent_result');
let parent_rolename = document.querySelector('#parent_rolename');
let child_result = document.querySelector('#child_result');
let child_rolename = document.querySelector('#child_rolename');
let button = document.querySelector('#button');
let numberOfPieces = 5;
let startNumberOfTrump = 2;
let numberOfSheets = 14

function getTrumpImageList(){
  let spadeImageList = [];
  let cloverImageList = [];
  let diamondImageList = [];
  let heartImageList = [];
  for(let i = startNumberOfTrump; i <= numberOfSheets; i++){
    spadeImageList.push("images/0_" + i + ".png");
    heartImageList.push("images/1_" + i + ".png");
    diamondImageList.push("images/2_" + i + ".png");
    cloverImageList.push("images/3_" + i + ".png");
  }
  let trumpImageList = spadeImageList.concat(heartImageList).concat(diamondImageList).concat(cloverImageList);
  return trumpImageList;
}

function getCards(){
  let spadeIndexNumber = 0;
  let heartIndexNumber = 1;
  let diamondIndexNumber = 2;
  let cloverIndexNumber = 3;
  let cardNumberList = [];
  for(let i = startNumberOfTrump; i <= numberOfSheets; i++){
    cardNumberList.push([spadeIndexNumber,i]);
    cardNumberList.push([heartIndexNumber,i]);
    cardNumberList.push([diamondIndexNumber,i]);
    cardNumberList.push([cloverIndexNumber,i]);
  }
  return cardNumberList;
}

function randomTrump(){
  let startPosition = 1;
  let suitIndexNumber = 0;
  let cardIndexNumber = 1;
  let getCardNumber = [];
  let trumpImageList = getTrumpImageList();
  let cardNumberList = getCards();
  let suitNumber = [];
  let cardNumber = [];
  for(let i = startPosition; i <= numberOfPieces; i++){
    let randomIndex = [Math.floor(Math.random() * trumpImageList.length)];
    getCardNumber.push(cardNumberList[randomIndex]);
    suitNumber.push(getCardNumber[i - startPosition][suitIndexNumber]);
    cardNumber.push(getCardNumber[i - startPosition][cardIndexNumber]);
    trumpImageList.splice(randomIndex,1);
    cardNumberList.splice(randomIndex,1);
  }
  return{suitNumber,cardNumber};
}

function getRoleName(suitNumber,cardNumber){
  let sortSuitNumber = (suitNumber.slice().sort(function(a,b){return a - b;})).join('');
  let sliceSortCardNumber = (cardNumber.slice().sort(function(a,b){return a - b;})).join('');
  let card = sliceSortCardNumber.replace(/10/g,'T').replace(/11/g,'J').replace(/12/g,'Q').replace(/13/g,'K').replace(/14/g,'A');
  let sliceFirstCard = card.replace(/^./,"");
  let sortCardNumber = cardNumber.sort(function(a,b){return a - b;});

  return{sortSuitNumber,card,sliceFirstCard,sortCardNumber};
}

function resultReturn(sortSuitNumber,card,sliceFirstCard){
  if(sortSuitNumber.match(/^0{5}$|^1{5}$|^2{5}$|^3{5}$/)){
    if(card.match(/T(?=JQKA)/)){
      return 9;
    }else if(card.match(/2(?=3456)|3(?=4567)|4(?=5678)|5(?=6789)|6(?=789T)|7(?=89TJ)|8(?=9TJQ)|9(?=TJQK)/)){
      return 8;
    }else{
      return 5;
    }
  }else if(card.match(/2(?=3456)|3(?=4567)|4(?=5678)|5(?=6789)|6(?=789T)|7(?=89TJ)|8(?=9TJQ)|9(?=TJQK)|T(?=JQKA)/)){
    return 4;
  }else if(card.match(/(.)\1{3}/)){
    return 7;
  }else if((card.match(/^(.)\1/) && card.match(/(.)\1{2}$/)) || (card.match(/(.)\1$/) && card.match(/^(.)\1{2}/))){
    return 6;
  }else if(card.match(/(.)\1{2}/)){
    return 3;
  }else if((card.match(/^(.)\1/) && card.match(/(?<=^.{2})(.)\1/)) || (card.match(/^(.)\1/) && card.match(/(.)\1$/)) || (sliceFirstCard.match(/^(.)\1/) && card.match(/(.)\1$/))){
    return 2;
  }else if(card.match(/(.)\1/)){
    return 1;
  }else{
    return 0;
  }
}

function getTrumpElement(count = 0) {
  let startPosition = 1;
  let trumpElements = [];
  for (let i = startPosition; i <= numberOfPieces; i++) {
    let currentTrump = document.querySelector('#trump_' + (i + count));
    trumpElements.push(currentTrump);
  }
  return trumpElements;
}

function pastingImage(trumpElements, suitNumber, sortCardNumber, cardNumber) {
  sortCardNumber = cardNumber.sort(function (a, b) { return a - b; });
  for (let i = 0; i < trumpElements.length; i++) {
    trumpElements[i].innerHTML = '<img src="images/' + suitNumber[i] + '_' + sortCardNumber[i] + '.png" width="100%" height="100%">';
  }
}

function roleName(rolename,result){
  switch(result){
    case 0:
      rolename.innerHTML = 'ハイカード';
      break;
    case 1:
      rolename.innerHTML = 'ワンペア';
      break;
    case 2:
      rolename.innerHTML = 'ツーペア';
      break;
    case 3:
      rolename.innerHTML = 'スリーオブアカインド';
      break;
    case 4:
      rolename.innerHTML = 'ストレート';
      break;
    case 5:
      rolename.innerHTML = 'フラッシュ';
      break;
    case 6:
      rolename.innerHTML = 'フルハウス';
      break;
    case 7:
      rolename.innerHTML = 'フォーカード';
      break;
    case 8:
      rolename.innerHTML = 'ストレートフラッシュ';
      break;
    case 9:
      rolename.innerHTML = 'ロイヤルフラッシュ';
      break;
    default:
      rolename.innerHTML = '';
      break;
  }
}

function resultVictoryOrDefeat(parentResultNumber,childResultNumber,parentCard,childCard){
  let parentLastNumber = parseInt((parentCard[parentCard.length - 1]).replace(/T/g,'10').replace(/J/g,'11').replace(/Q/g,'12').replace(/K/g,'13').replace(/A/g,'14'));
  let childLastNumber = parseInt((childCard[childCard.length - 1]).replace(/T/g,'10').replace(/J/g,'11').replace(/Q/g,'12').replace(/K/g,'13').replace(/A/g,'14'));
  if(parentResultNumber > childResultNumber){
    parent_result.innerHTML = 'WIN';
    child_result.innerHTML = 'LOSE';
  }else if(parentResultNumber < childResultNumber){
    parent_result.innerHTML = 'LOSE';
    child_result.innerHTML = 'WIN';
  }else if(parentResultNumber === 0 && childResultNumber === 0){
    if(parentLastNumber > childLastNumber){
      parent_result.innerHTML = 'WIN';
      child_result.innerHTML = 'LOSE';
    }else if(parentLastNumber < childLastNumber){
      parent_result.innerHTML = 'LOSE';
      child_result.innerHTML = 'WIN';
    }else{
      parent_result.innerHTML = 'DRAW';
      child_result.innerHTML = 'DRAW';
    }
  }else{
    parent_result.innerHTML = 'DRAW';
    child_result.innerHTML = 'DRAW';
  }
}

button.addEventListener('click',function(){
  let { suitNumber:parentSuitNumber,cardNumber:parentCardNumber } = randomTrump(); 
  let { suitNumber:childSuitNumber,cardNumber:childCardNumber } = randomTrump(); 
  let { sortSuitNumber:sortParentSuitNumber, card:parentCard, sliceFirstCard:sliceFirstParentCard, sortCardNumber:sortParentCardNumber } = getRoleName(parentSuitNumber,parentCardNumber);
  let { sortSuitNumber:sortChildSuitNumber, card:childCard, sliceFirstCard:sliceFirstChildCard, sortCardNumber:sortChildCardNumber } = getRoleName(childSuitNumber,childCardNumber);
  let parentResultNumber = resultReturn(sortParentSuitNumber,parentCard,sliceFirstParentCard);
  let childResultNumber = resultReturn(sortChildSuitNumber,childCard,sliceFirstChildCard);
  let parent_trump = getTrumpElement();
  let child_trump = getTrumpElement(numberOfPieces);
  pastingImage(parent_trump, parentSuitNumber, sortParentCardNumber, parentCardNumber);
  pastingImage(child_trump, childSuitNumber, sortChildCardNumber, childCardNumber);
  roleName(parent_rolename,parentResultNumber);
  roleName(child_rolename,childResultNumber);
  resultVictoryOrDefeat(parentResultNumber,childResultNumber,parentCard,childCard);
},false);