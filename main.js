// the plot will be a square with sides of length range
function generatePoints (amount, range){ 
    var pointArray = [];
    for (var i = 0; i < amount; i++){
        pointArray.push({
            y : Math.random() * range,
            x : Math.random() * range,
            a : Math.random() * range
        })
    }
    return pointArray;
}

// functionObj -> ax + by = 0 -> {a: int, b: int}, standard => a: 1, b: 1 -> y = x
function classifyPoint (point){ 
    return point.b - point.y + point.x <= 0 ? -1 : 1;
}

function birthNewBrain (){
    var brain = {
        w1 : Math.random() * 2 - 1,
        w2 : Math.random() * 2 - 1,
        w3 : Math.random() * 2 - 1
    }
    return brain;
}

function askAI (brain, point){
    return point.x * brain.w1 + point.y + brain.w2 <= 0 ? -1 : 1;
}

function train (brain, point){
    return error = -(askAI(brain, point) - classifyPoint(point)) / 2;
}

function evolve (generations, learnRate, brain = birthNewBrain()){
    console.clear()
    var loaderSize = 30;
    var points = generatePoints(generations, 100);

    for (var i = 0; i < generations; i++){
        var error = train(brain, points[i])
        if (error != 0){
            brain.w2 = brain.w2 + points[i].y * error * learnRate;
            brain.w1 = brain.w1 + points[i].x * error * learnRate;
            brain.w3 = brain.w3 + points[i].a * error * learnRate;
        }
        console.clear();
        console.log(`   [${'█'.repeat(Math.floor((i + 1) / generations * loaderSize)) + '_'.repeat(loaderSize - Math.floor((i + 1) / generations * loaderSize))}] ${Math.round(((i + 1) / generations * 10000)) / 100 + '%'}`);
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
    return Math.round( ( right / iterations ) * 10000 ) / 100 + '%'
}

var brain = evolve(10**4, 0.1);
console.log(brain)
console.log(testBrain(brain, 10000))