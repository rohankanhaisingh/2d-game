/*

	By Rohan Kanhaisingh (CEO Corona or Microsoft Visual Studio)
	https://github.com/rohankanhaisingh

*/

import { Setup, canvas } from './modules/setup.js';
import { Player, Players } from './modules/player.js';
import { Update } from './modules/update.js';
import { CreateMap } from './modules/map.js';
import { Enemies, Enemy } from './modules/enemy.js';
import { debug } from './modules/debug.js';
import { Intro } from './modules/gameplay.js';


g.DefineNames(true);
let fps = 1000 / 60;
window.onload = function () {
    Setup();
    SetUniqueID();
    Update();
    Players.push(new Player());
    g.Notification({
        Text: "Would you like to play this game on fullscreen?",
        Duration: 10000,
        Title: "$title",
        Button: {
            Accept: function () {
                var elem = document.body;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            },
            Cancel: true
        }
    });
    this.setTimeout(function () {
        Intro();
        g.Selector(".site-loader").remove(null);
    }, 1000);
}

function SetUniqueID() {
    for (var i = 0; i < g.All("<*>").length; i++) {
        if (g.Selector("<*>", i).getAttribute("unique-id") !== null) {
            if (g.Selector("<*>", i).getAttribute("unique-id") == '') {
                var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
                var b = "";
                for (var c = 0; c < 24; c++) {
                    b += a.charAt(Math.floor(Math.random() * a.length));
                }
                g.Selector("<*>", i).setAttribute("unique-id", b);
            }
        }
    }
}