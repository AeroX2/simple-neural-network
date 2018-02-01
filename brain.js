"use strict"
class Neuron {
	constructor(weights_len) {
		this.weights = []
		for (let i = 0; i < weights_len; i++) this.weights.push(Math.random());
	}

	update(inputs) {
		let output = 0;
		let length = inputs.length

		//Sum up all the inputs with the weights
		for (let i = 0; i < length-1; i++) {
			output += inputs[i] * this.weights[i];
		}

		//Add in the bias
		output += this.weights[length] * -1;

		return this.sigmoid(output);
	}

	sigmoid(x) {
		// This is not actually the sigmoid function 
		// but it is close enough

		return x / (1+Math.abs(x));
		//return Math.max(0,x);
	}
}

class Brain {
	constructor(inputs,
				hidden_width,
				hidden_height,
				outputs) {

		this.input_layer = [];
		this.hidden_layers = [];
		this.output_layer = [];

		let i;
		for (i = 0; i < inputs; i++) {
			this.input_layer.push(new Neuron());
		}
		for (i = 0; i < hidden_width; i++) {
			this.hidden_layers.push([]);
			for (let j = 0; j < hidden_height; j++) {
				this.hidden_layers[this.hidden_layers.length-1].push(new Neuron());
			}
		}
		for (i = 0; i < inputs; i++) {
			this.output_layer.push(new Neuron());
		}
	}

	update(inputs) {
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

		return outputs;
	}
}
