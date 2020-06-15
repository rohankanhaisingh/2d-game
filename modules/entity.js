import { ctx, canvas } from './setup.js';
import { Players, MainPlayer, playerscore } from './player.js';
import { Particle, Particles } from './particle.js';
import { debug } from './debug.js';

export var Entities = [];

export var EntityID = 0;
export class Entity {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.id = EntityID;
        this.moveX = 0;
        this.moveY = 0;
        this.isOnGround = false;
        this.gravityBounce = 14;

        // Entity appearance
        this.radius;
        this.color;

        // Entity behavior
        this.isPassive;
        this.isNeutral;
        this.playerViewField;
        this.takeDamage;
        this.happiness;
        this.anger;
        this.fear;

        // Entity move behavior
        this.movedX = 0;
        this.moveDirection;
        this.isAbleToMove = true;
        this.maxMovedX = 200;

        // Entity type selector
        if (this.type == 'neutral_entity') {
            this.isPassive = false;
            this.isNeutral = true;
            this.playerViewField = 200;
            this.takeDamage = 5;
            this.happiness = 70;
            this.anger = 0;
            this.fear = 0;
            this.radius = 30;
            this.color = '#6be03d';
        }

        EntityID += 1;
        debug.entities.push(this);
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.radius, this.radius);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    wander() {
        if (this.moveDirection == 'right') {
            if (this.isAbleToMove == true) {
                this.moveX = 2;
            }
        }
        if (this.moveDirection == 'left') {
            if (this.isAbleToMove == true) {
                this.moveX = -2;
            }
        }

        if (this.movedX < 200) {
            this.movedX += 1;
        }
        
        if (this.movedX == 200 || this.movedX > 200) {
            this.movedX = 0;
            this.moveX = 0;
            this.isAbleToMove = false;

            setTimeout(() => {
                var a = ['left', 'right'];
                var b = Math.floor(Math.random() * a.length);
                this.moveDirection = a[b];
                this.maxMovedX = Math.floor(Math.random() * 300);
                this.isAbleToMove = true;
            }, Math.floor(Math.random() * (8000 - 3000 + 1) + 3000));
        }
    }
    update() {

        // Speed decreaser
        if (this.moveX < 0) {
            this.moveX += 0.2;
        }
        if (this.moveX > 0) {
            this.moveX -= 0.2;
        }


        // Gravity
        if (this.isOnGround == false) {
            if (this.y < canvas.height - this.radius) {
                this.moveY += 1;
            }
            // Collider to the ground
            if (this.y > canvas.height - this.radius) {
                if (this.gravityBounce > 0) {
                    this.gravityBounce -= 1;
                }
                this.moveY = -this.gravityBounce;
                this.y = canvas.height - this.radius;
            }
        }

        // Collide to other entities
        for (var i = 0; i < Entities.length; i++) {
            if (this.id !== Entities[i].id) {
                if ((this.x > Entities[i].x - 3 && this.x < Entities[i].x + Entities[i].radius + 3) && (this.y > Entities[i].y - 3 && this.y < Entities[i].y + Entities[i].radius + 3)) {
                    this.y -= 10;
                    this.gravityBounce = 4;
                    if (this.movedX > 0 && this.movedX < 100) {
                        this.moveDirection = 'left';
                    } else {
                        this.moveDirection = 'right';
                    }
                }
            }
        }

        if (this.moveY < -20) {
            this.moveY = -20;
        }

        // Collide to edges of the canvas
        if (this.x < 0 + this.radius) {
            this.isAbleToMove = false;
            this.x = this.radius;
            this.moveX = 0;
            this.moveDirection = 'right';
            this.movedX = 199;
        }
        if (this.x > canvas.width - this.radius) {
            this.x = canvas.width - this.radius;
            this.moveX = 0;
            this.moveDirection = 'left';
            this.movedX = 199;
        }
        
        this.x += this.moveX;
        this.y += this.moveY;
        this.wander();
        this.draw();
    }
}