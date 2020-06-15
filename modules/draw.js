import { ctx, canvas } from './setup.js';

export var Lines = [];

export class Line {
    constructor(obj) {
        this.start = obj.Start;
        this.end = obj.End;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.start.y); 
        ctx.strokeStyle = '#e3e3e3';
        ctx.stroke();
    }
    update() {
        this.draw();
    }
}

var LinePosition = {
    Start: {
        x: undefined,
        y: undefined
    },
    End: {
        x: undefined,
        y: undefined
    } 
}

//window.addEventListener("mousedown", (event) => {
//    LinePosition.Start.x = event.offsetX;
//    LinePosition.Start.y = event.offsetY;
//});

//window.addEventListener("mouseup", (event) => {
//    LinePosition.End.x = event.offsetX;
//    LinePosition.End.y = LinePosition.Start.y;
//    Lines.push(new Line(LinePosition));
//    LinePosition = {
//        Start: {
//            x: undefined,
//            y: undefined
//        },
//        End: {
//            x: undefined,
//            y: undefined
//        }
//    }

//});