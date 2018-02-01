"use strict"
class Bird {
	constructor(position) {
		this.color = "rgb(0,0,0)"
		this.position = position;
		this.old_position = position;
		this.velocity = { x: 0, y: 0 };
	}

	update() {
		this.old_position = this.position;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	draw(c) {
		c.fillStyle = this.color
		c.beginPath();
		c.arc(this.position.x, this.position.y, BIRD_SIZE, 0, 2*Math.PI);
		c.fill();
	}

	collision() {
		this.position = this.old_position;
		this.velocity.x = -this.velocity.x;
		this.velocity.y = -this.velocity.y;
	}
}

class Pigeon extends Bird {
	constructor(position) {
		super(position);

		this.color = randomGrey()
		this.brain = new Brain(BIRD_BRAIN_INPUT_LEN,
			BIRD_BRAIN_HIDDEN_WIDTH,
			BIRD_BRAIN_HIDDEN_HEIGHT,
			BIRD_BRAIN_OUTPUT_LEN 
		);
	}

	update(food_position) {
		super.update();

		let inputs = [food_position.x, food_position.y];
		let outputs = this.brain.update(inputs);

		//Up, down, left, right
		if (outputs[0] > 0.5) velocity.y += BIRD_SPEED;
		if (outputs[1] > 0.5) velocity.y -= BIRD_SPEED;
		if (outputs[2] > 0.5) velocity.x -= BIRD_SPEED;
		if (outputs[3] > 0.5) velocity.x += BIRD_SPEED;
	}
}

class Seagull extends Bird {
	update(food_position) {
		super.update()

		this.color = "brown"
	}
}
