"use strict";

import * as stack from "./stack.js";
import {mouseQueue} from "./input.js";

/* This is the HTML canvas the user sees. */
let mainCanvas = null;
let mainContext = null;

/* This is the canvas where strokes are made. */
let strokeCanvas = null;
let strokeContext = null;

/* Entry point after DOM is loaded. */
document.addEventListener("DOMContentLoaded", function(){
	mainCanvas = document.getElementById("mainCanvas");
	mainContext = mainCanvas.getContext("2d");
	
	stack.pushChange(
		(function(){
			let canvas = document.createElement("canvas");
			let context = canvas.getContext("2d");
			context.fillStyle = "white";
			context.fillRect(0, 0,  mainCanvas.width, mainCanvas.height);
			return canvas;
		})(),
		null,
		function(){
			mainContext.fillStyle = "white";
			mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
		}
	);
	
	mainContext.fillStyle = "white";
	mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
	
	document.getElementById("download").onclick = download;
	document.getElementById("undo").onclick = stack.undo;
	document.getElementById("redo").onclick = stack.redo;
	setInterval(processMouseQueue, 1000 / 60);
	
});

function FUCKER(){
	console.log("FUCK");
}

/* Execute a download of the canvas. */
function download(){
	let link = document.createElement("a");
	link.setAttribute("download", "canvas.png");
	link.setAttribute("href", mainCanvas.toDataURL("image/png"));
	link.click();
}

/* Process the mouse queue; draw all lines. */
function processMouseQueue(){	
	while(mouseQueue.length > 2){
		let mouseState = mouseQueue[0];
		let nextMouseState = mouseQueue[1];
		
		/* Initialize temporary canvas on mouse hold. */
		if(mouseState.held && strokeCanvas == null){
			strokeCanvas = document.createElement("canvas");
			strokeCanvas.setAttribute("width", mainCanvas.width);
			strokeCanvas.setAttribute("height", mainCanvas.height);
			strokeCanvas.setAttribute("class", "overlay");
			strokeCanvas.setAttribute("id", "strokeCanvas");
			mainCanvas.parentElement.insertBefore(strokeCanvas, mainCanvas.nextSibling);
			strokeContext = strokeCanvas.getContext("2d");
		}
		
		/* Process finished brush stroke on mouse release. */
		if(!mouseState.held && strokeCanvas != null){
			
			/* Images of the canvas pre and post brush stroke. */
			let preCanvas = document.createElement("canvas");
			preCanvas.setAttribute("width", mainCanvas.width);
			preCanvas.setAttribute("height", mainCanvas.height);
			(function(){
				let context = preCanvas.getContext("2d");
				context.drawImage(mainCanvas, 0, 0);
			})();
			
			/* Draw the stroke to the visible canvas. */
			mainContext.drawImage(strokeCanvas, 0, 0);
			strokeCanvas.remove();
			strokeCanvas = null;
			strokeContext = null;
			
			/* Set postCanvas. */
			let postCanvas = document.createElement("canvas");
			postCanvas.setAttribute("width", mainCanvas.width);
			postCanvas.setAttribute("height", mainCanvas.height);
			(function(){
				let context = postCanvas.getContext("2d");
				context.drawImage(mainCanvas, 0, 0);
			})();
			
			/* Push change to stack. */
			stack.pushChange(
				postCanvas,
				function(){
					mainContext.drawImage(preCanvas, 0, 0, mainCanvas.width, mainCanvas.height);
				},
				function(){
					mainContext.drawImage(postCanvas, 0, 0, mainCanvas.width, mainCanvas.height);
				}
			);
		}
		
		if(mouseState.held){
			let path = {
				fx: mouseState.x,
				fy: mouseState.y,
				tx: nextMouseState.x,
				ty: nextMouseState.y,
			};
			line(path.fx, path.fy, path.tx, path.ty);
		}
		
		/* Remove the first mouse state; it is already processed. */
		mouseQueue.shift();
	}
}

/* Draws a series of blobs. */
function line(fx, fy, tx, ty){
	let distance = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
	if(distance == 0){
		draw(fx, fy);
		return;
	}
	
	let unit = {x: (tx - fx) / distance, y: (ty - fy) / distance};
	for(let counter = 0; counter < distance; counter++){
		draw(fx += unit.x, fy += unit.y);
	}
}

/* Draw a blob. */
function draw(x, y){
	strokeContext.fillStyle = "green";
	strokeContext.fillRect(Math.floor(x), Math.floor(y), 4, 4);
}

