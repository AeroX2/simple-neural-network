"use strict"
class Bird {
	constructor(position = required()) {
		this.color = "rgb(0,0,0)"
		this.position = position;
		this.old_position = position;
		this.velocity = { x: 0, y: 0 };
	}

	update() {
		if (this.velocity.x < -BIRD_MAX_SPEED) this.velocity.x = -BIRD_MAX_SPEED;
		if (this.velocity.x > BIRD_MAX_SPEED) this.velocity.x = BIRD_MAX_SPEED;
		if (this.velocity.y < -BIRD_MAX_SPEED) this.velocity.y = -BIRD_MAX_SPEED;
		if (this.velocity.y > BIRD_MAX_SPEED) this.velocity.y = BIRD_MAX_SPEED;

		this.old_position = this.position;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.velocity.x *= FRICTION;
		this.velocity.y *= FRICTION;
	}

	draw(c = required()) {
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

	update(food_position = required(),
		   screen_width = required(),
		   screen_height = required()) {
		super.update();

		let inputs = [
			(this.position.x - food_position.x) / screen_width,
			(this.position.y - food_position.y) / screen_height
		];
		let outputs = this.brain.update(inputs);

		//Up, down, left, right
		if (outputs[0] > 0.5) this.velocity.y = BIRD_SPEED;
		if (outputs[1] > 0.5) this.velocity.y = -BIRD_SPEED;
		if (outputs[2] > 0.5) this.velocity.x = -BIRD_SPEED;
		if (outputs[3] > 0.5) this.velocity.x = BIRD_SPEED;
	}
}

class Seagull extends Bird {
	constructor(position) {
		super(position);

		this.color = "brown"
	}

	update(food_position) {
		super.update()

		//Up, down. left. right
		if (food_position.y > this.position.y) this.velocity.y = BIRD_SPEED;	
		if (food_position.y < this.position.y) this.velocity.y = -BIRD_SPEED;	
		if (food_position.x < this.position.x) this.velocity.x = -BIRD_SPEED;	
		if (food_position.x > this.position.x) this.velocity.x = BIRD_SPEED;	
	}
}
