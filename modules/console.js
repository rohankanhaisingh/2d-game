import { Players, Player } from './player.js';
import { canvas, ctx } from './setup.js';


export var IsInConsole = false;
export var IsFocussingInput = false;

// Opening and closing the console.

window.addEventListener("keydown", function (event) {
    var consoleElement = g.Selector(".console");
    var inputElement = g.Selector("<input> in .console-input");
    if (event.keyCode == 192) {
        if (IsInConsole == false) {
            IsInConsole = true;
            consoleElement.classList.add("console-visible");
        } else {
            IsInConsole = false;
            consoleElement.classList.remove("console-visible");
        }
    } 
    if (event.keyCode == 13) {
        if (IsFocussingInput) {
            ProcessCommand(inputElement.value);
            inputElement.value = "";
        }
    }
});

// Handle console input

g.Selector("<input> in .console-input").On("focusin", function () {
    IsFocussingInput = true;
});

g.Selector("<input> in .console-input").On("focusout", function () {
    IsFocussingInput = false;
});

var outputlogs = [];

export function LogCommand(log, type) {
    var a, b, c, d, e, f, log, type;
    a = g.CreateElement("div.console-output-log", ".console-output");
    b = g.CreateElement("span", a);
    b.innerHTML = log;
    outputlogs.push(a);
    if (type == 'error') {
        b.classList.add("console-error");
    }
    g.Selector(".console-output").scrollTop = g.Selector(".console-output").scrollHeight * 2;
}


export function ProcessCommand(cmd) {
    var a, b, c, d, e, f, cmd, errorcodes, type;
    a = ["get", "set", "echo", "return", "function", "$", "help", "clear", "summon", "kill", "bind"];
    b = cmd.split(" ");
    for (d in a) {
        if (a[d] == b[0]) {
            type = b[0];
        }
    }
    if (type !== undefined) {
        if (type == 'clear') {
            var i = 0;
            while (i < outputlogs.length) {
                outputlogs[i].remove();
                i++;
            }
            LogCommand(`<code class="console-js-eval-undefined">Clear console at ${new Date()}</code>`);
        }
        if (type == 'help') {
            LogCommand(`-----------------------------------------------------------------`);
            LogCommand(`For more information on a specific command, type help [command]`);
            for (c in a) {
                LogCommand(`Command: ${a[c]}`);
            }
            LogCommand(`-----------------------------------------------------------------`);
        }
        if (type == 'echo') {
            if (cmd.substring(4) !== "" || cmd.substring(4) !== ' ') {
                LogCommand(cmd.substring(4));
            } else {
                LogCommand("Cannot print a empty string", 'error');
            }
        }
        if (type == "$") {
            var te = eval(cmd.substring(2));
            if (te !== undefined) {
                LogCommand(`<code class="console-js-eval-returned">${te}</code>`);
            } else {
                LogCommand(`<code class="console-js-eval-undefined">${te}</code>`);
            }
        }
        if (type == "set") {
            c = cmd.substring(4).split(" ");
            e = ['player', 'frameupdate', 'documentElement', 'bullet'];
            var h, i, j, k, l, m, n, o, p;
            for (f in e) {
                if (e[f] == c[0]) {
                    h = c[0];
                }
            }
            if (h !== undefined) {
                if (h == 'player') {
                    f = [];
                    i = undefined;
                    for (h in Players[0]) {
                        f.push(h);
                    }
                    j = cmd.substring(11).split(" ");
                    for (k in f) {
                        if (f[k] == j[0]) {
                            i = f[k];
                        }
                    }
                    if (i !== undefined) {
                        m = parseFloat(j[1]); 
                        console.log(typeof m);
                        try {
                            Players[0][i] = m;
                            LogCommand(`<code class="console-get-property-name">${i}</code> has been set to <code class="console-set-property">${m}</code>`);
                        } catch (err) {
                            LogCommand(`<code class="console-error">${err.message}</code>`, 'error');
                        }
                    } else {
                        LogCommand(`<code class="console-error">${j} is not a valid property</code>`, 'error');
                    }
                }
                if (h == 'enemy') {

                }
            } else {
                LogCommand(`<code class="console-error">${c[0]} is not a valid property</code>`, 'error');
            }
        }
        if (type == "get") {
            c = cmd.substring(4).split(" ");
            e = ['player', 'enemy', 'enemies', 'fpsrate'];
            var h, i, j, k, l, m, n, o, p;
            for (f in e) {
                if (e[f] == c[0]) {
                    h = c[0];
                } 
            }
            if (h !== undefined) {
                if (h == 'player') {
                    i = cmd.substring(11);
                    if (i == '' || i == ' ') {
                        for (j in Players) {
                            for (k in Players[j]) {
                                LogCommand(`<code class="console-get-property-name">${k}</code>: ${Players[j][k]}`);
                            }
                        }
                    } else {
                        l = [];
                        n = undefined;
                        o = undefined;
                        for (j in Players) {
                            for (k in Players[j]) {
                                l.push(k);
                            }
                        }
                        for (m in l) {
                            if (l[m] == c[1]) {
                                n = l[m];
                            }
                        }
                        if (n !== undefined) {
                            LogCommand(`<code class="console-get-property-name" tooltip="Property of [player] object ">${n}</code>: ${Players[0][n]}`);
                        } else {
                            LogCommand(`<code class="console-error">${c[1]} is not a valid property</code>`, 'error');
                        }
                    }
                }
            } else {
                LogCommand(`<code class='console-error-variable'>${c[0]}</code> is not a valid property`);
            }
        }
    } else {
        LogCommand(`<code class='console-error-variable'>${b[0]}</code> is not a valid command`);
    }
}