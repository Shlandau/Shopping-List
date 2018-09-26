"use strict";
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var parentListNode = document.getElementById("list");
var childListElements = document.getElementById("li");
var listArray = []; //used to located item clicked for strikethrough
var lowerCaseListArray = [];
var indexValue;
var on_Off_Switch;

//initiates program
fillArray(); 
lowerCaseArray(); 
listenForListElementClick();


function listenForListElementClick(){
	let i = 0;
	fillArray();
	lowerCaseArray();
	for (i; i < arrayLength(); i++) {	
		parentListNode.children[i].onclick = function(){
		indexValue = listArray.indexOf(this.innerHTML);
		strikeThrough(indexValue);
		listenForDeleteButtonClick(indexValue);
		fillArray();
		lowerCaseArray();
		}
	}
}

function strikeThrough(indexValue){
	on_Off_Switch = parentListNode.children[indexValue].classList.toggle("done");
	switch (on_Off_Switch){
		case true:
			createDeleteButton(indexValue);	
			break;
		case false:
			removeDeleteButton(indexValue);
			break;
		default:
			listenForListElementClick();
	}
	return on_Off_Switch;
}

function createListElement() {
	var li = document.createElement("li");
	var inputText = input.value;
	switch(checkForDuplicate(inputText)) {
		case false:	
			li.appendChild(document.createTextNode(inputText));
			parentListNode.appendChild(li);
			input.value = "";
			break;
		case true:	
			alert("This item is already on your list");
			input.value = "";
			break;
		default:
			listenForListElementClick();
	}
}

function listenForDeleteButtonClick(indexValue){
	var buttonDelete = document.getElementById(indexValue);
	if (buttonDelete !== null && buttonDelete !== undefined) {
		buttonDelete.onclick =function() {
			removeListAfterClick(indexValue);
		}
	}
}

function fillArray() {
	listArray = [];
	let i = 0;
	for (i; i < arrayLength(); i++){
		listArray.push(parentListNode.children[i].innerHTML);
	}
	return listArray;
}

function lowerCaseArray(){
	lowerCaseListArray = [];
	let i = 0;
	for (i; i < arrayLength(); i++) {
		lowerCaseListArray.push(listArray[i].toLowerCase());
	}
}

function inputLength() {
	return input.value.length;
}

function arrayLength() {
	return parentListNode.childElementCount;
}

function removeListAfterClick(indexValue){
	parentListNode.removeChild(parentListNode.children[indexValue]);
	
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
	listenForListElementClick();
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
	listenForListElementClick();
}

function checkForDuplicate(inputText) {
//	console.log(inputText + '<button id="' + indexValue + '"> Delete Line</button>'); need to remove everything after "<"".
	if (lowerCaseListArray.indexOf(inputText.toLowerCase()) === -1) {
		return false;
	}
	else return true;
}

//Create a delete button and add it adjacent to the line item targeted for deletion.
function createDeleteButton(indexValue){
	var deleteButton = document.createElement("BUTTON");
	var deleteButtonText = document.createTextNode("Delete Line");
	deleteButton.id = indexValue;
	deleteButton.appendChild(deleteButtonText);
	parentListNode.children[indexValue].appendChild(deleteButton);
	//return deleteButton.id;
}

//Remove the delete button if user unstrikes the line.
function removeDeleteButton(indexValue){
	var itemToRemove = document.getElementById(indexValue);
	itemToRemove.parentNode.removeChild(itemToRemove);
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);