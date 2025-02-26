const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;

gameCanvas.width = gameWidth;
gameCanvas.height = gameHeight;

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

// base class for drawable objects. They all need x, y, a color, and a z.
class drawObject {
    constructor(x, y, color='black', z='0') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.z = z;
    }
}

class rect extends drawObject{
    constructor(x, y, w, h, color='black', z='0') {
        super(x, y, color, z);
        this.w = w;
        this.h = h;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class circle extends drawObject{
    constructor(x, y, r, color='black', z='0') {
        super(x, y, color, z)
        this.r = r;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
    }
}

class drawnSprite {
    constructor(shape, updateCallback, startCallback) {
        // run startCallback
        this.shape = shape;
        this.update = updateCallback;
        this.start = startCallback;

        try{startCallback()} catch(error){console.error(error);}
    }
}

let e = new circle(10, 10, 5, 'black');
e.draw();


