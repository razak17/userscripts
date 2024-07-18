// ==UserScript==
// @name         Dark Mode for various sites
// @namespace    http://tampermonkey.net/
// @version      2024-07-18
// @description  try to take over the world!
// @author       You
// @match        *://*.kulala.mwco.app/*
// @match        *://*.folke.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const theme = localStorage.getItem('theme');

  if (!theme || theme !== 'dark') {
    localStorage.setItem('theme', 'dark');
    window.location.reload();
  }

  // Your code here...
})();
