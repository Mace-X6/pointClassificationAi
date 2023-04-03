class TrainNeuralNetwork {
    constructor(learnRate, trainingData, calcError, testModelAccuracy, model) {
        var tempModel = Object.assign({}, model);
        var trainingDataArray = trainingData
        for (var i = 0; i < trainingData.length; i++) {
            var trainingData = trainingDataArray[i];
            var error = calcError(tempModel, trainingDataArray[i])
            if (error != 0) {

                adjustWeights = (() => {
                    for (var u = 0; u < tempModel.w.length; u++) {
                        for (var t = 0; t < tempModel.w[u].length; t++) {
                            tempModel.w[u][t] += trainingData[t % trainingData.length] * (u % 2 === 0 ? -error : error) * learnRate;
                        }
                    }
                })();

                adjustBiases = (() => {
                    for (var u = 0; u < tempModel.b.length; u++) {
                        for (var t = 0; t < tempModel.b[u].length; t++) {
                            tempModel.b[u][t] += trainingData[t % trainingData.length] * error * learnRate;
                        }
                    }
                })();
            }
        }

        tempModel.accuracy = testModelAccuracy(tempModel, trainingData.length);
        if (model.accuracy <= tempModel.accuracy) {
            return tempModel;
        }
        else { return model }
    }
}
module.exports = TrainNeuralNetwork;