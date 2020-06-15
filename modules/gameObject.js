import { canvas, ctx } from './setup.js';

export var GameObjects = [];

export class GameObject {
    constructor(x, y, type, objectName, properties) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.objectName = objectName;
        this.properties = properties;
        this.mainObject = {
            Action: {
                Teleport: {
                    TeleportToObject: 'door-2'
                }
            }
        }
        for (var a in properties) {
            if (typeof properties[a] == 'object') {
                this.mainObject[a] = properties[a];
            }
        }
    }
    draw() {
        if (this.type == 'ladder') {
            ctx.beginPath();
            ctx.drawImage(ladder, this.x, this.y, 70, 357);
        }
        if (this.type == 'door') {
            ctx.beginPath();
            ctx.drawImage(door, this.x, this.y, 50, 88);
        }
    }
    update() {

        this.draw();
    }
}