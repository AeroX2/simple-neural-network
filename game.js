"use strict"

/** @type {Canvas} */
var canvas = null;

/** @type {CanvasRenderingContext2D} */
var c = null;

/** @type {Array<Bird>} */
var birds = [];

/** @type {Seagull} */
var seagull = null;

/** @type {Array<Pigeon>} */
var pigeons = [];

function init() {
	canvas = document.getElementById("game_canvas");
	c = canvas.getContext("2d");
	resize_canvas();

	let random_position = randomPosition(canvas);
	seagull = new Seagull(random_position)
	for (let i = 0; i < PIGEON_COUNT; i++) {
		random_position = randomPosition(canvas);
		pigeons.push(new Pigeon(random_position))
	}

	birds.push(seagull);
	birds = birds.concat(pigeons);

	window.requestAnimationFrame(loop);
}

function update() {
	// Update the state of the birds
	for (let bird of birds) {
		bird.update({x: 200, y: 200});
		for (let other_bird of birds) {
			if (bird === other_bird) continue;

			if (distanceTo(bird.position, other_bird.position) < 2*BIRD_SIZE) {
				bird.collision();
			}
		}
	}
}

function draw() {
	// Draw the state of the world
	
	// Draw all the birds
	for (let bird of birds) {
		bird.draw(c);
	}
}

function loop(timestamp) {
	update();
	draw();

	window.requestAnimationFrame(loop);
}

function resize_canvas() {
	if (canvas.width  < window.innerWidth) {
		canvas.width  = window.innerWidth;
	}

	if (canvas.height < window.innerHeight)	{
		canvas.height = window.innerHeight;
	}
}

window.onload = init;
