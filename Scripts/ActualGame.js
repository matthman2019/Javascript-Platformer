import {mainLoop, runArray, rect, circle, drawnSprite} from '/Scripts/GameEngine.js';

let c = new drawnSprite(new circle(10, 10, 10, 'red', 0),
    (self)=>{
    self.shape.x += 3;
    self.shape.y += 3;
    self.shape.r += 3;
})

runArray.push(c);


mainLoop();