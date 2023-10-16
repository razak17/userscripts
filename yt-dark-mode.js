// @name         YouTube - Auto Dark Mode
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Dark Mode for YouTube
// @author       You
// @match       *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

"use strict";
var c = document.cookie;

// If there's no PREF cookie, then create one with a value that enables the Dark Theme
if (!c || !c.match("^PREF=|; ?PREF=")) {
  document.cookie = "PREF=f6=400;domain=youtube.com";
}
