"use strict"

const required = () => { throw new Error('Param is required'); };

function randomInt(min = required(), max = required()) {
	return Math.floor(Math.random() * (max-min) + min);
}

function randomGrey() {
	let grey = randomInt(0,255)
	return `rgb(${grey},${grey},${grey})`
}

function randomPosition(canvas = required()) {
	return { 
		x: randomInt(BIRD_SIZE/2, canvas.width-BIRD_SIZE/2),
		y: randomInt(BIRD_SIZE/2, canvas.height-BIRD_SIZE/2)
	}; 
}

function distanceTo(p1 = required(), p2 = required()) {
	return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.x-p1.x,2));
}

