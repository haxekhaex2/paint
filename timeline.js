"user strict";

export let layers = new Array(); 

export function getFrameCount(){
    return document.getElementById("frameList").childElementCount;
}

export function getLayerCount(){
    return document.getElementById("layerList").childElementCount;
}

export function resize(length){
    let table = document.getElementById("table");
    let frameList = document.getElementById("frameList");

    while(frameList.childElementCount > length) frameList.removeChild(frameList.lastChild);
    while(frameList.childElementCount < length){
        let frameListing = document.createElement("span");
        frameListing.innerText = frameList.childElementCount;
        frameListing.setAttribute("data-index", frameList.childElementCount);
        frameList.appendChild(frameListing);
    }

    for(let frameArray of table.children){
        while(frameArray.childElementCount > length) frameArray.removeChild(frameArray.lastChild);
        while(frameArray.childElementCount < length){
            let frameElement = document.createElement("span");
            frameElement.setAttribute("data-index", frameArray.childElementCount);
            frameArray.appendChild(frameElement);
        }
    }
}

export function createLayer(){
    let table = document.getElementById("table");
    let layerList = document.getElementById("layerList");
    let frameList = document.getElementById("frameList");
    
    let layerListing = document.createElement("div");
    layerListing.setAttribute("data-index", layerList.childElementCount);
    layerList.appendChild(layerListing);

    let frameArray = document.createElement("div");
    while(frameArray.childElementCount < frameList.childElementCount){
        let frameElement = document.createElement("span");
        frameElement.setAttribute("data-index", frameArray.childElementCount);
        frameArray.appendChild(frameElement);
    }
    frameArray.setAttribute("data-index", table.childElementCount);
    table.appendChild(frameArray);

    layers.push({
        frames: new Map(),
    });
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("table").addEventListener("scroll", function(){
        let table = document.getElementById("table");
        let frameList = document.getElementById("frameList");
        let layerList = document.getElementById("layerList");
        frameList.scrollLeft = table.scrollLeft;
        layerList.scrollTop = table.scrollTop;
    });

    document.getElementById("layerList").addEventListener("scroll", function(){
        let table = document.getElementById("table");
        let layerList = document.getElementById("layerList");
        table.scrollTop = layerList.scrollTop;
    });

    document.getElementById("frameList").addEventListener("scroll" , function(){
        let table = document.getElementById("table");
        let frameList = document.getElementById("frameList");
        table.scrollLeft = frameList.scrollLeft;
    });
});