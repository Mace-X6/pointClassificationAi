class NeuralNetwork {

    constructor(model, nodeConfig,
    testModelAccuracy, // must take model & testgenerations, must return 0 <= float <= 1 
    ) {
        this.testModelAccuracy = testModelAccuracy;

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

    resetAccuracy(decimalPlaces){
        this.model.accuracy = this.testModelAccuracy(this.model, 10 ** decimalPlaces)
    }

    setModel(model){
        this.model = model;
    }
}
module.exports = NeuralNetwork;