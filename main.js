// the plot will be a square with sides of length range
function generatePoints (amount, range){ 
    var pointArray = [];
    for (var i = 0; i < amount; i++){
        pointArray.push({
            x : Math.random() * range,
            y : Math.random() * range
        })
    }
    return pointArray;
}

// functionObj -> ax + by = 0 -> {a: int, b: int}, standard => a: 1, b: 1 -> y = x
function classifyPoint (point, functionObj = { a : -1, b : 1 }){ 
    return point.x * functionObj.a + point.y * functionObj.b <= 0 ? 1 : -1;
}

function birthNewBrain (){
    var brain = {
        w1 : Math.random() * 2 - 1,
        w2 : Math.random() * 2 - 1
    }
    return brain;
}

function askAI (brain, point){
    return point.x * brain.w1 + point.y * brain.w2 <= 0 ? 1 : -1;
}

function train (brain, point){
    return error = (askAI(brain, point) - classifyPoint(point)) / 2;
}

function evolve (generations, learnAmount, brain = birthNewBrain()){
    var points = generatePoints(generations, 100);

    for (var i = 0; i < generations; i++){
        var error = train(brain, points[i])
        if (error != 0){
            brain.w1 = brain.w1 + points[i].x * error * learnAmount
            brain.w2 = brain.w2 + points[i].y * error * learnAmount
        }
    }
    return brain;
}

function testBrain (brain, iterations){
    var right = 0;
    var pointArr = generatePoints(iterations, 100)
    for (var i = 0; i < iterations; i++){
        if (askAI(brain, pointArr[i]) === classifyPoint(pointArr[i])){
            right++;
        }
    }
    return ( right / iterations ) * 100 + '%'
}

var brain = evolve(10000, 0.1);
console.log(testBrain(brain, 1000))