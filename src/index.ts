const CANVAS_SIZE = 1024;

const canvas = document.createElement('canvas');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

document.body.append(canvas);
console.log('hey');