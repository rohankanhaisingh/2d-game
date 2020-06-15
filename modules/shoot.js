import { ctx, canvas } from './setup.js';
import { Lines } from './draw.js';
import { Particles, Particle } from './particle.js';

export var Bullets = [];
export var BulletProperties = {
    BulletRadius: 5,
    ConnectField: 0,
    Glitter: 1,
    TrailDecreaseAmount: 0.4
}
var id = 0;
export class Bullet {
    constructor(x, y, targetX, targetY, color, damage, firespeed) {
        id++;
        this.bulletID = id;
        this.x = x; 
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.radius = BulletProperties.BulletRadius;
        this.fireSpeed = firespeed;
        this.color = color;
        this.damage = damage;

        this.polarDirection = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width - this.radius) {
            for (var a = 0; a < Bullets.length; a++) {
                if (Bullets[a].bulletID == this.bulletID) {
                    Bullets.splice(a, 1);
                }
            }
            delete this;

        }
        if (this.x < 0 + this.radius) {
            for (var a = 0; a < Bullets.length; a++) {
                if (Bullets[a].bulletID == this.bulletID) {
                    Bullets.splice(a, 1);
                }
            }
            delete this;
  
        }
        if (this.y < 0 + this.radius) {
            for (var a = 0; a < Bullets.length; a++) {
                if (Bullets[a].bulletID == this.bulletID) {
                    Bullets.splice(a, 1);
                }
            }
            delete this;

        }
        if (this.y > canvas.height - this.radius) {
            for (var a = 0; a < Bullets.length; a++) {
                if (Bullets[a].bulletID == this.bulletID) {
                    Bullets.splice(a, 1);
                }
            }
            delete this;

        }

        // Connect bullets with eachother
        for (var i = 0; i < Bullets.length; i++) {
            if (this.bulletID !== Bullets[i].bulletID) {
                if ((this.x > Bullets[i].x - BulletProperties.ConnectField && this.x < Bullets[i].x + BulletProperties.ConnectField) && (this.y > Bullets[i].y - BulletProperties.ConnectField && this.y < Bullets[i].y + BulletProperties.ConnectField)) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(Bullets[i].x, Bullets[i].y);
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 0.2;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }

        var color = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
        }
        var r = 'rgb(' + color.r + ' , ' + color.g + ', ' + color.b + ')';

        //for (var i = 0; i < Enemies.length; i++) {
        //    if ((this.x > Enemies[i].x - 1 && this.x < Enemies[i].x + Enemies[i].radius + 1) && (this.y > Enemies[i].y - 1 && this.y < Enemies[i].y + Enemies[i].radius + 1)) {
        //        Enemies[i].health -= this.damage;
        //        for (var a = 0; a < Bullets.length; a++) {
        //            if (Bullets[a].bulletID == this.bulletID) {
        //                Bullets.splice(a, 1);
        //            }
        //        }
        //        delete this;
        //        for (var e = 0; e < 20; e++) {
        //            Particles.push(new Particle(this.x, this.y));
        //        }
        //    }
        //}

        BulletTrails.push(new BulletTrail(this.x, this.y, this.radius, r));

        this.x += Math.cos(this.polarDirection) * this.fireSpeed;
        this.y += Math.sin(this.polarDirection) * this.fireSpeed;
        this.draw();
    }
}

export var BulletTrails = [];
class BulletTrail {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.decreaseAmount = BulletProperties.TrailDecreaseAmount;

        for (var i = 0; i < BulletProperties.Glitter; i++) {
            Particles.push(new Particle(this.x, this.y, 'glitter'));
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    update() {
        if (this.radius > this.decreaseAmount) {
            this.radius -= this.decreaseAmount;
        } else {
            delete this;
            BulletTrails.shift();
        }


        this.draw();
    }
}
