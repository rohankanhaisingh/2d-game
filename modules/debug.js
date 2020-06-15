import { Players, PlayerTrails } from './player.js';
import { Lines } from './draw.js';
import { Particles, Particle } from './particle.js';
import { GameObjects, GameObject } from './gameObject.js';
import { Bullets, Bullet, BulletTrails } from './shoot.js';

export var debug = {
    getTrails: function () {
        console.log("PlayerTrails: " + PlayerTrails.length);
        console.log("BulletTrails: " + BulletTrails.length);
        console.log("EnemyBulletTrails: " + EnemyBulletTrails.length);
    },
    getEnemies: function () {

    },
    clearAllArrays: function () {
        while (Particles.length > 0) {
            Particles.pop();
        }
        while (GameObjects.length > 0) {
            GameObjects.pop();
        }
        while (Bullets.length > 0) {
            Bullets.pop();
        }
        while (BulletTrails.length > 0) {
            BulletTrails.pop();
        }
    },
    entities: []
}

window.db = debug;