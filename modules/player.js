import { canvas, ctx } from './setup.js';
import { Lines } from './draw.js';
import { Particle, Particles } from './particle.js';
import { GameObjects, GameObject } from './gameObject.js';
import { Bullets, Bullet } from './shoot.js';
import { debug } from './debug.js';
import { IsInConsole } from './console.js';

var IsPressingKey = {
    Space: false,
    A: false,
    S: false,
    D: false,
    E: false
}

var IsPressingMouse = {
    Button0: false,
    Button1: false,
    Button2: false
}

var MousePosition = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousedown", function (event) {
    IsPressingMouse['Button' + event.button] = true;
});
window.addEventListener("mouseup", function (event) {
    IsPressingMouse['Button' + event.button] = false;
});

window.addEventListener("mousemove", function (event) {
    MousePosition.x = event.offsetX;
    MousePosition.y = event.offsetY;
});

window.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        IsPressingKey.Space = true;
    }
    if (event.keyCode == 65) {
        IsPressingKey.A = true;
    }
    if (event.keyCode == 83) {
        IsPressingKey.S = true;
    }
    if (event.keyCode == 68) {
        IsPressingKey.D = true;
    }
    if (event.keyCode == 69) {
        IsPressingKey.E = true;
    }
});
window.addEventListener("keyup", function (event) {
    if (event.keyCode == 32) {
        IsPressingKey.Space = false;
    }
    if (event.keyCode == 65) {
        IsPressingKey.A = false;
    }
    if (event.keyCode == 83) {
        IsPressingKey.S = false;
    }
    if (event.keyCode == 68) {
        IsPressingKey.D = false;
    }
    if (event.keyCode == 69) {
        IsPressingKey.E = false;
    }
});

var AbleToPressE = false;
var FocussedDoor;

export var playerscore = {
    wave: 0,
    coins: 0,
    xp: 0
}

export var MainPlayer = undefined;
export var Players = [];
export class Player {
    constructor() {
        this.radius = 30;
        this.x = canvas.width / 2 - this.radius;
        this.y = canvas.height - 520;
        this.moveSpeed = {
            x: 0,
            y: 0,
            multiplier: 1
        };
        this.gravityBounce = 0;
        this.isOnGround = false;
        this.health = 100;
        this.color = '#e3e3e3';

        this.firespeed = 30;

        this.healthElement = g.CreateElement("div.player-health", ".ui");
        this.healthTrack = g.CreateElement("div.player-health-track", this.healthElement);
        debug.player = this;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.radius, this.radius);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    update() {

        // Handling movement for the player.
        if (!IsInConsole) {
            if (IsPressingKey.Space == true) {
                this.moveSpeed.y -= 20;
                for (var i = 0; i < (20); i++) {
                    Particles.push(new Particle(this.x + this.radius / 2, this.y + this.radius));
                }
                this.gravityBounce = -this.moveSpeed.y;
                IsPressingKey.Space = false;
            }
            if (IsPressingKey.S == true) {
                this.moveSpeed.y += this.moveSpeed.multiplier;
            }
            if (IsPressingKey.A == true) {
                this.moveSpeed.x -= this.moveSpeed.multiplier;
            }
            if (IsPressingKey.D == true) {
                this.moveSpeed.x += this.moveSpeed.multiplier;
            }
        }

        // Handling smooth movespeed decreaser.
        if (this.moveSpeed.x > 0) {
            this.moveSpeed.x -= this.moveSpeed.multiplier / 2;
        }
        if (this.moveSpeed.x < 0) {
            this.moveSpeed.x += this.moveSpeed.multiplier / 2;
        }

        // Gravity
        if (this.isOnGround == false) {
            if (this.y < canvas.height - this.radius) {
                this.moveSpeed.y += 1;
            }
            // Collider to the ground
            if (this.y > canvas.height - this.radius) {
                if (this.gravityBounce > 0) {
                    this.gravityBounce -= 1;
                }
                if (this.moveSpeed.y > 60) {
                    canvas.classList.add("view-shake");
                    // g.Selector(".ui-navbar").classList.add("view-shake");
                    for (var i = 0; i < (this.moveSpeed.y * 5); i++) {
                        Particles.push(new Particle(this.x + this.radius / 2, this.y, 'big-explode'));
                    }
                    setTimeout(function () {
                        canvas.classList.remove("view-shake");
                        g.Selector(".ui-navbar").classList.remove("view-shake");
                    }, 1000);
                }
                if (this.moveSpeed.y < 60) {
                    for (var i = 0; i < (this.moveSpeed.y * 2); i++) {
                        Particles.push(new Particle(this.x + this.radius / 2, this.y));
                    }
                }
                this.moveSpeed.y = -this.gravityBounce;
                this.y = canvas.height - this.radius;
            }
        }


        // Add colliders to the edge of the canvas
        if (this.x > canvas.width - this.radius) {
            this.x = canvas.width - this.radius;
            for (var b = 0; b < (12); b++) {
                Particles.push(new Particle(this.x + this.radius / 2, this.y + this.radius));
            }
            this.moveSpeed.x = 0;
        }
        if (this.x < 0) {
            for (var b = 0; b < (12); b++) {
                Particles.push(new Particle(this.x, this.y + this.radius));
            }
            this.x = 0;
            this.moveSpeed.x = 0;
        }
        if (this.moveSpeed.y < -20) {
            this.moveSpeed.y = -20;
        }

        // Shootings

        if (!IsInConsole) {
            if (IsPressingMouse.Button0) {
                Bullets.push(new Bullet(this.x + this.radius / 2, this.y + this.radius / 2, MousePosition.x, MousePosition.y, '#e3e3e3', 70, this.firespeed));
                IsPressingMouse.Button0 = false;
            }
        }


        // Player score
        g.Selector("<span> in .game-wave").innerText = "Wave " + playerscore.wave;
        g.Selector("<span> in .game-coins").innerText = playerscore.coins + " coins";
        g.Selector("<span> in .game-xp").innerText = playerscore.xp + " XP";

        // Player health
        this.healthTrack.style.width = this.health + "%";
        this.healthElement.style.top = this.y - 20 + "px";
        this.healthElement.style.left = this.x - 15 + "px";;
        player_health.style.width = this.health + "%";
        var color = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
        }
        var r = 'rgb(' +  color.r + ' , ' + color.g + ', ' + color.b + ')';

        if ((this.moveSpeed.x > 0 || this.moveSpeed.y > 0) || (this.moveSpeed.x < 0 || this.moveSpeed.y < 0)) {
            PlayerTrails.push(new PlayerTrail(this.x, this.y, this.radius, r));
        }

        this.x += this.moveSpeed.x;
        this.y += this.moveSpeed.y;
        this.draw();
    }
}

export var PlayerTrails = [];
export class PlayerTrail {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.defaultRadius = radius;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x + (this.defaultRadius / 2) - (this.radius / 2), this.y + (this.defaultRadius / 2) - (this.radius / 2), this.radius, this.radius);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    update() {
        if (this.radius > 0) {
            this.radius -= 3;
        } else {
            PlayerTrails.shift();
            delete this;
        }
        this.draw();
    }
}