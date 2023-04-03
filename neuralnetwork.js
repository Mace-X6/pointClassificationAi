class neuralNetwork {

    constructor(model, nodeConfig, calcError /* must take model & input - must output -1 / 1 / 0 */, testModelAccuracy /* must take model & testgenerations, must return 0 <= float <= 1 */, generateTrainingData /* must take amount of expected outcomes, must return array with array of data */) {
        this.calcError = calcError;
        this.testModelAccuracy = testModelAccuracy;
        this.generateTrainingData = generateTrainingData;

        if (nodeConfig) {
            var model = {
                w: [],
                b: [],
                accuracy: 0,
                nodeConfig: nodeConfig.slice(0)
            };
            for (var i = 0; i < nodeConfig.length - 1; i++) {
                model.w[i] = [];
                for (var t = 0; t < nodeConfig[i] * nodeConfig[i + 1]; t++) {
                    model.w[i].push(Math.random() * 2 - 1);
                }
            }
            nodeConfig.shift();
            for (var i = 0; i < nodeConfig.length; i++) {
                model.b[i] = [];
                for (var t = 0; t < nodeConfig[i]; t++) {
                    model.b[i].push(Math.random() * 2 - 1);
                }
            }
            this.model = model;
        } else if (model) {
            this.model = model;
        }
    }

    askAI(input) {
        var model = this.model;
        var inputNodes = input;
        var tempArr = [];
        for (var i = 0; i < model.nodeConfig.length; i++) {
            i === 0 ? tempArr[0] = inputNodes : tempArr[i] = [];
            if (i > 0) {
                for (var t = 0; t < model.nodeConfig[i]; t++) {
                    var tempNodeVal = 0;
                    for (var o = 0; o < (tempArr[i - 1].length === 1 ? tempArr[i - 1].length + 1 : tempArr[i - 1].length); o++) {
                        tempNodeVal += tempArr[i - 1][o] * model.w[i - 1][o + t];
                    }
                    tempNodeVal += model.b[i - 1][t];
                    tempArr[i].push(tempNodeVal);
                }
            }
        }
        return tempArr[tempArr.length - 1];
    }

    train(learnRate, generations) {
        var model = Object.assign({}, this.model);
        var trainingDataArray = this.generateTrainingData(generations)
        for (var i = 0; i < generations; i++) {
            var trainingData = trainingDataArray[i];
            var error = this.calcError(model, trainingDataArray[i])
            if (error != 0) {
                for (var u = 0; u < model.w.length; u++) {
                    for (var t = 0; t < model.w[u].length; t++) {
                        model.w[u][t] += trainingData[t % trainingData.length] * (u % 2 === 0 ? -error : error) * learnRate;
                    }
                }
                for (var u = 0; u < model.b.length; u++) {
                    for (var t = 0; t < model.b[u].length; t++) {
                        model.b[u][t] += trainingData[t % trainingData.length] * error * learnRate;
                    }
                }
                // console.log(`   [${'█'.repeat(Math.floor((i + 1) / generations * loaderSize)) + '_'.repeat(loaderSize - Math.floor((i + 1) / generations * loaderSize))}] ${Math.round(((i + 1) / generations * 10000)) / 100 + '%'}`);
            }
        }
        model.accuracy = this.testModelAccuracy(model, generations);
        if (this.model.accuracy <= model.accuracy){
            this.model = Object.assign({}, model)
        }
        return this.model;
    }

    resetAccuracy(decimalPlaces){
        this.model.accuracy = this.testModelAccuracy(this.model, 10 ** decimalPlaces)
    }
}
module.exports = neuralNetwork;