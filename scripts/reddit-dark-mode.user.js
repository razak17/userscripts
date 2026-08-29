// ==UserScript==
// @name         Default Reddit To Dark Mode
// @namespace    https://github.com/razak17/userscripts
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*.reddit.com/*
// @homepageURL  https://github.com/razak17/userscripts
// @supportURL   https://github.com/razak17/userscripts/issues
// @icon         https://www.redditstatic.com/desktop2x/img/favicon/favicon-96x96.png

// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var c = document.cookie;
    var u = "eyJwcmVmcyI6eyJ0b3BDb250ZW50RGlzbWlzc2FsVGltZSI6MCwiZ2xvYmFsVGhlbWUiOiJSRURESVQiLCJuaWdodG1vZGUiOnRydWUsImNvbGxhcHNlZFRyYXlTZWN0aW9ucyI6eyJmYXZvcml0ZXMiOmZhbHNlLCJtdWx0aXMiOmZhbHNlLCJtb2RlcmF0aW5nIjpmYWxzZSwic3Vic2NyaXB0aW9ucyI6ZmFsc2UsInByb2ZpbGVzIjpmYWxzZX0sInRvcENvbnRlbnRUaW1lc0Rpc21pc3NlZCI6MH19"
    var path = "/"

    // If there's no USER cookie, then create one with a value that enables the Dark Theme
    if(!c || !c.match("^USER=|; ?USER=")) {
        var day = 60*60*24;
        var expiresIn = 60*60*24*365*2;
        var expires = day + expiresIn;
        document.cookie = "USER="+ u +";domain=reddit.com;max-age="+expires+";path="+path;
        // window.location.reload(false);
    }
})();
