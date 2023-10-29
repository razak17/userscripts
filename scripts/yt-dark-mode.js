// ==UserScript==
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

var pref = c.split(";").find((item) => item.includes("PREF"));
var value = pref.split("=").splice(1).join("=");
var prefValue = value.split(" ")[0];

// Set dark mode if not set
if (!prefValue.match(/f6=\d+/)) {
  document.cookie = "PREF=f6=400;domain=youtube.com";
}
