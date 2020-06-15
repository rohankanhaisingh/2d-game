import { ctx, canvas } from './setup.js';
import { Players, PlayerTrails} from './player.js';
import { Lines } from './draw.js';
import { Particles } from './particle.js';
import { GameObjects, GameObject } from './gameObject.js';
import { Bullets, Bullet, BulletTrails } from './shoot.js';
import { Entities } from './entity.js';
import { debug } from './debug.js';

export function Update() {
    window.anim = window.requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    debug.requestedFrames = window.anim;
    
    for (var i = 0; i < Players.length; i++) {
        Players[i].update();
    }
    for (var i = 0; i < Lines.length; i++) {
        Lines[i].update();
    }
    for (var i = 0; i < Particles.length; i++) {
        Particles[i].update();
    }
    for (var i = 0; i < GameObjects.length; i++) {
        GameObjects[i].update();
    }
    for (var i = 0; i < Bullets.length; i++) {
        Bullets[i].update();
    }
    for (var i = 0; i < PlayerTrails.length; i++) {
        PlayerTrails[i].update();
    }
    for (var i = 0; i < BulletTrails.length; i++) {
        BulletTrails[i].update();
    }
    for (var i = 0; i < Entities.length; i++) {
        Entities[i].update();
    }
}
