import { ctx, canvas } from './setup.js';

export var Particles = [];
export class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.moveY;
        this.color = Colors.WHITE;
        this.moveX;
        this.moveY = -Math.random() * (22 - -Math.floor(Math.random() * 10)) + 14;
        this.moveX = Math.random() * (20.4 - -Math.floor(Math.random() * 10)) - 11.6;
        this.type = type;
        this.radiusDecrease = 0.5;
        this.id;

        if (this.type == 'big-explosion') {
            this.moveY = -Math.random() * (122 - -Math.floor(Math.random() * 30)) + 34;
            this.moveX = Math.random() * (50.4 - -Math.floor(Math.random() * 50)) - 25.6;
            this.radiusDecrease = 0.01;
        }

        this.setUniqueID();
    }
    setUniqueID() {
        var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        var b = "";
        for (var c = 0; c < 62; c++) {
            b += a.charAt(Math.floor(Math.random() * a.length));
        }
        this.id = b;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.radius > this.radiusDecrease) {
            this.moveY += 0.3;

            if (this.type !== undefined) {
                if (this.type == 'glitter') {
                    this.radius -= 0.5;
                }
                if (this.type == 'big-explode') {
                    this.radius -= 0.01;
                }
                if (this.type == 'enemy-die') {
                    this.radius -= 0.01;
                    this.color = '#fff';
                    this.radiusDecrease = 0.01;
                }
            }
            if (this.type == undefined) {
                this.radius -= 0.05;
            }


            this.x -= this.moveX;
            this.y += this.moveY;
        } else {
            for (var i = 0; i < Particles.length; i++) {
                if (Particles[i].id == this.id) {
                    Particles.splice(i, 1);
                }
            }
        }
        this.draw();
    }
}