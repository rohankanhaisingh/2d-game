import { debug } from './debug.js';

export function Intro() {
    var a, b, c, d, e, f;
    a = g.Selector(".ui-intro");
    a.style.display = 'inline';
    g.Notification({
        Text: "Welcome by this Epic 2D Game! Use WASD and SPACE to move. Click on OK when you are ready!",
        Duration: 1000000000,
        Title: "$title",
        Button: {
            Accept: function () {
                a.removeAttribute("style");
                location.href = './wave/wave1';
            }
        }
    });
}