const NeuralNetwork = require('./neuralnetwork.js');
const TrainNeuralNetwork = require('./trainneuralnetwork.js');

// the plot will be a square with sides of length range
function generatePoints(amount) {
    var range = 10 ** 6;
    var pointArray = [];
    for (var i = 0; i < amount; i++) {
        pointArray.push([
            Math.random() * range,//x
            Math.random() * range,//y
            Math.random() * range//a
        ])
    }
    return pointArray;
}

function calcError(model, point) {
    return ((this.askAI(model, point) >= 1 ? 1 : -1) - (point[2] * point[0] <= point[1] ? 1 : -1)) / 2;
}

function testModel(model, iterations, returnType = 'num') {
    var right = 0;
    var pointArr = generatePoints(iterations)
    for (var i = 0; i < iterations; i++) {
        if (this.calcError(model, pointArr[i]) === 0) {
            right++;
        }
    }
            return right / iterations;
}

var neuralNetwork = new NeuralNetwork(null, [3, 6, 6, 3, 1], calcError, testModel, generatePoints);

const fs = require('fs');
// var model = JSON.parse(fs.readFileSync('brain.json'))

// console.log(testModel(model, 10 ** 4, 'frac'))
var precision = 4;
for (var i = 0; i < 100; i++) {
    console.log('neuralNetwork.model')
    console.log(neuralNetwork.model)
    neuralNetwork.setModel(TrainNeuralNetwork(0.001, generatePoints(10**precision), calcError, testModel, neuralNetwork.model));
    if (neuralNetwork.model.accuracy === 1 && precision < 7){
        precision ++;
        neuralNetwork.resetAccuracy(precision);
    }
    if (precision >= 7){
        i = 100;
    }
}
console.log(neuralNetwork.model)
fs.writeFileSync('brain.json', JSON.stringify(neuralNetwork.model));
