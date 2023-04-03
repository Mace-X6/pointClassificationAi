var NeuralNetwork = require('../neuralnetwork.js');
describe('Neural Network', () => {
    it('should create a neural network', () => {
        const nn = new NeuralNetwork(null, [3, 6, 6, 3, 1]);
        expect(nn.model).toBeDefined();
    })});