"use strict"
class Neuron {
	constructor(weights_len = required()) {
		this.weights = []
		for (let i = 0; i < weights_len+1; i++) this.weights.push(Math.random());
	}

	update(inputs = required()) {
		let output = 0;
		let length = inputs.length-1;

		//Sum up all the inputs with the weights
		for (let i = 0; i < length; i++) {
			output += inputs[i] * this.weights[i];
		}

		//Add in the bias
		output += this.weights[length] * -1;

		return this.sigmoid(output);
	}

	sigmoid(x = required()) {
		return 1/(1+Math.exp(-x));
		//return Math.max(0,x);
	}
}

class Brain {
	constructor(inputs = required(),
				hidden_width = required(),
				hidden_height = required(),
				outputs = required()) {

		this.input_layer = [];
		this.hidden_layers = [];
		this.output_layer = [];

		let i;
		for (i = 0; i < inputs; i++) {
			this.input_layer.push(new Neuron(1));
		}

		for (i = 0; i < hidden_width; i++) {
			let temp = [];
			let weights_size = i == 0 ? inputs : hidden_height;
			this.hidden_layers.push(temp);
			for (let j = 0; j < hidden_height; j++) {
				temp.push(new Neuron(weights_size));
			}
		}
		for (i = 0; i < outputs; i++) {
			this.output_layer.push(new Neuron(hidden_height));
		}
	}

	update(inputs = required()) {
		let outputs = [];
		for (let neuron of this.input_layer) {
			outputs.push(neuron.update(inputs));
		}

		//Each layers outputs feeds into the next
		for (let layer of this.hidden_layers) {
			inputs = outputs;
			outputs = [];
			for (let neuron of layer) {
				outputs.push(neuron.update(inputs));
			}
		}

		inputs = outputs;
		outputs = [];
		for (let neuron of this.output_layer) {
			outputs.push(neuron.update(inputs));
		}

		if (outputs.some((x) => isNaN(x))) {
			throw new Error('Sanity check failed, no output returned');
		}

		return outputs;
	}
}
