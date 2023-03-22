// the plot will be a square with sides of length range
function generatePoints(amount) {
    var range = 10**4;
    var pointArray = [];
    for (var i = 0; i < amount; i++) {
        pointArray.push({
            y: Math.random() * range,
            x: Math.random() * range,
            a: Math.random() * range
        })
    }
    return pointArray;
}

function classifyPoint(point) {
    return point.a * point.x <= point.y ? 1 : -1;
}

function birthNewBrain(nodeArr) {
    var nodeArr = nodeArr.concat([1]);
    var brain = {
        w: [],
        b: [],
        accuracy: 0,
        nodeConfig: nodeArr.slice(0)
    };
    for (var i = 0; i < nodeArr.length - 1; i++) {
        brain.w[i] = [];
        for (var t = 0; t < nodeArr[i] * nodeArr[i + 1]; t++) {
            brain.w[i].push(Math.random() * 2 - 1);
        }
    }
    nodeArr.shift();
    for (var i = 0; i < nodeArr.length; i++) {
        brain.b[i] = [];
        for (var t = 0; t < nodeArr[i]; t++) {
            brain.b[i].push(Math.random() * 2 - 1);
        }
    }
    return brain;
}

function askAI(brain, input) {
    var inputNodes = [input.a, input.x, input.y];
    var tempArr = [];
    for (var i = 0; i < brain.nodeConfig.length; i++) {
        i === 0 ? tempArr[0] = inputNodes : tempArr[i] = [];
        if (i > 0) {
            for (var t = 0; t < brain.nodeConfig[i]; t++) {
                var tempNodeVal = 0;
                for (var o = 0; o < (tempArr[i - 1].length === 1 ? tempArr[i - 1].length + 1 : tempArr[i - 1].length); o++) {
                    tempNodeVal += tempArr[i - 1][o] * brain.w[i - 1][o + t];
                }
                tempNodeVal += brain.b[i-1][t];
                tempArr[i].push(tempNodeVal);
            }
        }
    }
    return tempArr[tempArr.length - 1] >= 0 ? -1 : 1;
}

function calcError(brain, point) {
    return  (askAI(brain, point) - classifyPoint(point)) / 2;
}

function train(generations, learnRate, brain = birthNewBrain([3])) {
    var points = generatePoints(generations);

    for (var i = 0; i < generations; i++) {
        var error = calcError(brain, points[i])
        var point = [points[i].x, points[i].y, points[i].a];
        if (error != 0) {
            for (var u = 0; u < brain.w.length; u++) {
                for (var t = 0; t < brain.w[u].length; t++) {
                    brain.w[u][t] = brain.w[u][t] + point[t%point.length] * (u % 2 === 0 ? error : -error) * learnRate;
                }
            }
                for (var u = 0; u < brain.b.length; u++) {
                    for (var t = 0; t < brain.b[u].length; t++) {
                        brain.b[u][t] = brain.b[u][t] + point[t%point.length] * error * learnRate;
                    }
                }
            // console.log(`   [${'█'.repeat(Math.floor((i + 1) / generations * loaderSize)) + '_'.repeat(loaderSize - Math.floor((i + 1) / generations * loaderSize))}] ${Math.round(((i + 1) / generations * 10000)) / 100 + '%'}`);
        }
    }
    brain.accuracy = testBrain(brain, 10**4);
    return brain;
}

function testBrain(brain, iterations, returnStr = false) {
    var right = 0;
    var pointArr = generatePoints(iterations)
    for (var i = 0; i < iterations; i++) {
        if (askAI(brain, pointArr[i]) === classifyPoint(pointArr[i])) {
            right++;
        }
    }
    if (returnStr){
        return `${Math.round((right / iterations) * 10000) / 100}% ( ${right} correct out of ${iterations} iterations ) `;
    }
    else{
        return Math.round((right / iterations) * 10000) / 100;
    }
}
var model = birthNewBrain([3,4]);
for (var i = 0; i < 25; i ++){
    if (model.accuracy === 100){
        i = 25
        break;
    }
    tempModel = train(10**6, 0.001, Object.assign({}, model));
    if (tempModel.accuracy > model.accuracy){
        model = tempModel;
        // console.log(tempModel.accuracy + " > " + model.accuracy)
    }
    console.log(model.accuracy)
}
console.log(model)