import { Setup, canvas } from '../../modules/setup.js';
import { Player, Players, playerscore } from '../../modules/player.js';
import { Update } from '../../modules/update.js';
import { Entities, Entity } from '../../modules/entity.js';
import { debug } from '../../modules/debug.js';
import { LogCommand } from '../../modules/console.js';


g.DefineNames(true);

window.onload = function () {
    Setup();
    Players.push(new Player());
    Update();
    LogCommand(`Document has been loaded at <code class="console-date">${new Date()}</code>`);
    this.setTimeout(function () {
        g.Selector(".site-loader").Css("opacity", "0");
        this.setTimeout(function () {
            g.Selector(".site-loader").Css("display", "none");
        }, 300);
        this.setTimeout(function () {
            StartWave();
            this.setInterval(CheckEnemies, 400);
        }, 1000);
    }, 500);
}

function StartWave() {
    for (var i = 0; i < 5; i++) {
        a(i);
    }

    function a(i) {
        var i;
        var a = Math.floor(Math.random() * canvas.width);
        var b = Math.floor(Math.random() * canvas.height);
        setTimeout(function () {
            Entities.push(new Entity('neutral_entity', a, b));
        }, i * 100);
    }
}

var hasCompletedWave = false;

function CheckEnemies() {
    //if (Enemies.length == 0) {
    //    if (hasCompletedWave == false) {
    //        hasCompletedWave = true;
    //        LogCommand("Wave has been completed at " + new Date());
    //        var data = playerscore;
    //        window.localStorage.setItem("data", JSON.stringify(data));
    //        //setTimeout(function () {
    //        //    g.Selector(".site-loader").style.display = 'inline';
    //        //    setTimeout(function () {
    //        //        g.Selector(".site-loader").removeAttribute("style");
    //        //    }, 300);
    //        //    setTimeout(function () {
    //        //        location.href = '../wave2';
    //        //    }, 1000);
    //        //}, 2000);
    //    }
    //}
}