import { playerscore } from './player.js';

export var ctx;
export var canvas;
export function Setup() {
    var a, b, c, d, e, f;
    if (typeof g !== 'undefined') {

        if (typeof window.localStorage !== 'undefined') {
            a = localStorage.getItem("data");
            b = JSON.parse(a);
            for (d in b) {
                playerscore[d] = b[d];
            }
        }

        var c = g.Selector("<canvas>");
        c.On("contextmenu", function (event) {
            event.preventDefault();
        });
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx = c.getContext("2d");
        canvas = c;
    }
}