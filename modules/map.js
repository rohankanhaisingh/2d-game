import { Line, Lines } from './draw.js';
import { canvas, ctx } from './setup.js';
import { GameObject, GameObjects } from './gameObject.js';

export function CreateMap() {
    // Create a ground

    Lines.push(new Line({ Start: { x: 0, y: canvas.height - 200 }, End: { x: canvas.width, y: canvas.height - 200 } }));
    Lines.push(new Line({ Start: { x: 0, y: canvas.height - 600 }, End: { x: canvas.width, y: canvas.height - 600 } }));


    // Create doors
    GameObjects.push(new GameObject(canvas.width - 50, canvas.height - 88, 'door', 'door-1', {
        Action: {
            Teleport: {
                TeleportToObject: 'door-2'
            }
        }
    }));
    GameObjects.push(new GameObject(0, canvas.height - 600 - 88, 'door', 'door-2', {
        Action: {
            Teleport: {
                TeleportToObject: 'door-1'
            }
        }
    }));
}