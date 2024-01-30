let mouse = {x: 0, y: 0, held: false, pressure: 1};
let mouseQueue = Array();

/* Mouse movement listener. */
document.addEventListener("DOMContentLoaded", function(){document.addEventListener("pointermove", function(){
	/* Javascript deems it within its right to ignore input events while one of its same type is being processed. */
	/* Therefore, one must keep pointer events processing as short as possible, in order to speed up the polling rate. */
	let rect = mainCanvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
	mouse.y = event.clientY - rect.top;
	mouse.pressure = event.pressure;
	
	let state = {...mouse};
	mouseQueue.push(state);
});});

/* Mouse down and up listener. */
document.addEventListener("DOMContentLoaded", function(){["mousedown", "mouseup"].forEach(function(eventType){document.addEventListener(eventType, function(){
	if(event.type === "mousedown") mouse.held = true;
	if(event.type === "mouseup") mouse.held = false;
	
	let state = {...mouse};
	mouseQueue.push(state);
});});});

/* Key listener. */
document.addEventListener("DOMContentLoaded",
function(){document.addEventListener("keydown",
function(event){
	if(event.ctrlKey && event.key === "z"){
		undo();
	}
});});

