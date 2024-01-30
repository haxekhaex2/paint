let canvas;
let context;
let mouse = {x: 0, y: 0, held: false};

/* Entry point after DOM is loaded. */
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	document.getElementById("download").onclick = download;
});

/* Mouse movement listener. */
document.addEventListener("DOMContentLoaded", function(){document.addEventListener("mousemove", function(){
	let rect = canvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
	mouse.y = event.clientY - rect.top;
	draw();
});});

/* Mouse down and up listener. */
document.addEventListener("DOMContentLoaded", function(){["mousedown", "mouseup"].forEach(function(eventType){document.addEventListener(eventType, function(){
	if(event.type === "mousedown") mouse.held = true;
	if(event.type === "mouseup") mouse.held = false;
	draw();
});});});

/* Draw blobs where the mouse is. */
function draw(){
	if(mouse.held){
		context.fillStyle = "green";
		context.fillRect(mouse.x, mouse.y, 8, 8);
	}
}

/* Execute a download of the canvas. */
function download(){
	let link = document.createElement("a");
	link.setAttribute("download", "canvas.png");
	link.setAttribute("href", canvas.toDataURL("image/png"));
	link.click();
}
