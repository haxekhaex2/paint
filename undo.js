/* This is the undo stack. Save states yet to be changed so they may be rolled back. */
let undoStack = Array();

function pushToUndoStack(object){
	undoStack.push(object);
	if(undoStack.length > 8) undoStack.shift();
	renderUndoStack();
}

document.addEventListener("DOMContentLoaded", renderUndoStack);
function renderUndoStack(){
	let undoCanvas = document.getElementById("undoCanvas");
	let undoContext = undoCanvas.getContext("2d");
	undoContext.fillStyle = "black";
	undoContext.fillRect(0, 0, undoCanvas.width, undoCanvas.height);
	
	for(let index = 0; index < undoStack.length; index++){
		if(undoStack[index].type === "region"){
			console.log(undoStack[index].canvas);
			undoContext.drawImage(undoStack[index].canvas, 0, 0, undoStack[index].canvas.width, undoStack[index].canvas.height, 550 / 8 * index, 0, 550 / 8, 350 / 8);
		}
	}
}

function undo(){
	let state = undoStack.pop();
	switch(state.type){
		case "region":
			mainContext.drawImage(state.canvas, state.x, state.y);
			break;
	}
	renderUndoStack();
}

export let pushRegion = function(x, y, canvas){
	let region = {
		type: "region",
		x: x,
		y: y,
		canvas: canvas
	};
	
	pushToUndoStack(region);
};

export function foo(){
	console.log("foo");
}
