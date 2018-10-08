"use strict";
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var parentListNode = document.getElementById("list");
var childListElements = parentListNode.querySelectorAll("li");
var listArray = []; //used to located item clicked for strikethrough
var lowerCaseListArray = [];

//initiates program
listenForListElementClick();

function listenForListElementClick(){
	let indexValue;
	let i = 0;

	fillArray();
	for (i; i < arrayLength(); i++) {	
		parentListNode.children[i].onclick = function() {
		indexValue = listArray.indexOf(this.innerHTML);
		strikeThrough(indexValue);
		fillArray();
		}
	}
}

function strikeThrough(indexValue){
	let on_Off_Switch;

	if (indexValue != arrayLength()) {
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
	}
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

function fillArray() {
	listArray = [];
	let i = 0;
	for (i; i < arrayLength(); i++){
		listArray.push(parentListNode.children[i].innerHTML);
	}
	lowerCaseArray();
	return listArray;
}

function lowerCaseArray(){
	lowerCaseListArray = [];
	let i = 0;
	for (i; i < arrayLength(); i++) {
		lowerCaseListArray.push(listArray[i].toLowerCase());
	}
	return lowerCaseListArray;
}

function inputLength() {
	return input.value.length;
}

function arrayLength() {
	return parentListNode.childElementCount;
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
let checkInputText = new RegExp(inputText.toLowerCase());	
return checkInputText.test(lowerCaseListArray);
}

//Create a delete button and add it adjacent to the line item targeted for deletion.
function createDeleteButton(indexValue){
	var deleteButton = document.createElement("BUTTON");
	var deleteButtonText = document.createTextNode("Delete Line");

	deleteButton.appendChild(deleteButtonText);
	parentListNode.children[indexValue].appendChild(deleteButton);
	deleteButton.addEventListener("click", function(event) {
		event.target.parentNode.remove();
		strikeThrough(indexValue);
	})
}

//Remove the delete button if user unstrikes the line.
function removeDeleteButton(indexValue){
	parentListNode.children[indexValue].firstElementChild.remove();
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
