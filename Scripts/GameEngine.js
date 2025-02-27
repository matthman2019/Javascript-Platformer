export const gameCanvas = document.getElementById("gameCanvas");
export const ctx = gameCanvas.getContext("2d");

export let gameWidth = window.innerWidth;
export let gameHeight = window.innerHeight;

export let FPS = 60;
export let bgColor = 'blue';

gameCanvas.width = gameWidth;
gameCanvas.height = gameHeight;

// noneFunction is a default value for callbacks (to prevent errors)
export const noneFunction = ()=>{};

export function widthPercentToPixels(percent) {
    return gameCanvas.width * (percent / 100);
}

export function heightPercentToPixels(percent) {
    return gameCanvas.height * (percent / 100);
}

// base class for drawable objects. They all need x, y, a color, and a z. (Z is depth for sorting order)
export class drawObject {
    constructor(x, y, color='black', z='0') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.z = z;
    }
}

// rect is a rectangle class. Top-left position (x, y), width w, and height h.
export class rect extends drawObject{
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

// circle is a drawnObject class for a circle. It has position (x, y) and a radius of r.
export class circle extends drawObject{
    constructor(x, y, r, color='black', z='0') {
        super(x, y, color, z)
        this.r = r;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

// sprite is the class for things that run in-game. All scripting will be inside its callbacks.
export class sprite {
    constructor(updateCallback=noneFunction, startCallback=noneFunction, updateAfterFrame=noneFunction) {
        this.update = updateCallback;
        this.start = startCallback;
        this.afterFrame = updateAfterFrame;

        try{startCallback()} catch(error){console.error(error);}
    }
}

// drawnSprite is the class for sprites that are drawn.
export class drawnSprite extends sprite {
    constructor(shape, updateCallback=noneFunction, startCallback=noneFunction, updateAfterFrame=noneFunction) {
        super(updateCallback, startCallback, updateAfterFrame);
        // run startCallback
        this.shape = shape;

        try{startCallback()} catch(error){console.error(error);}
    }

    draw() {
        this.shape.draw();
    }
}













// I have to do special things with runArray so I made it a class
export class runArrayClass {
    constructor(items) {
        this.items = items
    }

    // sort through items based on depth.
    sortItems() {
        // try sorting them first
        try {
            this.items.sort((a, b)=>{
                return a.z - b.z;
            });
        } catch {
            // if they don't have a z component, warn in the console and get rid of it.
            console.error("There is something in runArray without a z component. Removing it now.");
            // find the item lacking the 'z'
            for (let i =0; i<this.items.length; i++) {
                let thing = this.items[i];
                if (!'z' in thing) {
                    this.items.splice(i, 1);
                    break;
                }
            }
            // try sorting items again.
            this.sortItems();
        }
    }
        

    push(thing) {
        this.items.push(thing);
        this.sortItems();
    }
}


// everything that runs needs to be in runArray
export let runArray = new runArrayClass([]);


// main loop
export function mainLoop() {
    // sorting is done in the runArray object

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // run update code and render
    for (let thing of runArray.items) {
        // if it's a draw object, run
        if (thing instanceof drawnSprite) {
            thing.update(thing);
            thing.draw();
            thing.afterFrame(thing);
        }
    }

    

    setTimeout(mainLoop, Math.round(1000 / FPS));
}

// here's a basic example. This creates a circle sprite that, every frame, increases it's x y and radius by 3 pixels.
/*
let c = new drawnSprite(new circle(10, 10, 10, 'red', 0),
    (self)=>{
    self.shape.x += 3;
    self.shape.y += 3;
    self.shape.r += 3;
})

runArray.push(c);
*/

//mainLoop();

