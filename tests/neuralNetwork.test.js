const NeuralNetwork = require('../neuralnetwork.js');
describe('Neural Network', () => {
    describe('When creating a neural network', () => {
        it('should create a neural network', () => {
            const nn = new NeuralNetwork();
            expect(nn).toBeDefined();
        });
    });
});