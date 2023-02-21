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
function classifyPoint(functionObj = { a : 1, b : 1 }, point){ 
    return point.x * functionObj.a + point.y * functionObj.b <= 0 ? 1 : -1;
}

function birthNewBrain(){
    var brain = {
        w1 : Math.random() * 2 - 1,
        w2 : Math.random() * 2 - 1
    }
    return brain;
}

console.log(birthNewBrain())