"use strict";

const STACK_SIZE = 8;
let stack = new Array();
let position = -1;

let iconStack = new Array();
let undoStack = new Array();
let redoStack = new Array();

/* Undo. */
export function undo(){
	if(position < 1) return;
	if(!undoStack[position]) return;
	undoStack[position]();
	position--;
	renderStack();
}

/* Redo. */
export function redo(){
	if(position > STACK_SIZE - 2) return;
	if(!redoStack[position + 1]) return;
	redoStack[position + 1]();
	position++;
	renderStack();
}

/* Push a change to the stack. */
export function pushChange(
	icon = null,
	undo = function(){throw new Error("Unsupported operation.");},
	redo = function(){throw new Error("Unsupported operation.");}
){
	iconStack.splice(position + 1);
	undoStack.splice(position + 1);
	redoStack.splice(position + 1);
	iconStack.push(icon);
	undoStack.push(undo);
	redoStack.push(redo);
	position++;
	if(position > STACK_SIZE - 1){
		iconStack.shift();
		undoStack.shift();
		redoStack.shift();
		position--;
	}
	renderStack();
}

/* export function pushChange(object = {
	getIcon: function(){throw new Error("Default icon function.");},
	undo: function(){throw new Error("Default undo function.");},
	redo: function(){throw new Error("Default redo function.");}}){
	stack.splice(position + 1, 0, object);
	position++;
	if(stack.length > STACK_SIZE){
		stack.shift();
		position--;
	}
	renderStack();
} */

/* Render the stack. */
document.addEventListener("DOMContentLoaded", renderStack);
function renderStack(){
	let canvas = document.getElementById("undoCanvas");
	let context = canvas.getContext("2d");
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	for(let index = 0; index < iconStack.length; index++){
		let icon = iconStack[index];
		context.drawImage(icon, 0, 0, icon.width, icon.height, 550 / 8 * index, 0, 550 / 8, 350 / 8);
	}
	
	context.strokeStyle = "red";
	context.lineWidth = 2;
	context.strokeRect(550 / 8 * position, 0, 550 / 8, 350 / 8);
}

/* document.addEventListener("DOMContentLoaded", renderStack);
function renderStack(){
	let undoCanvas = document.getElementById("undoCanvas");
	let undoContext = undoCanvas.getContext("2d");
	undoContext.fillStyle = "black";
	undoContext.fillRect(0, 0, undoCanvas.width, undoCanvas.height);
	
	for(let index = 0; index < stack.length; index++){
		let icon = stack[index].getIcon();
		undoContext.drawImage(icon, 0, 0, icon.width, icon.height, 550 / 8 * index, 0, 550 / 8, 350 / 8);
	}
	undoContext.strokeStyle = "red";
	undoContext.strokeRect(550 / 8 * position, 0, 550 / 8, 350 / 8);
} */
