// ==UserScript==
// @name         Dark Mode for various sites
// @namespace    http://tampermonkey.net/
// @version      2024-07-18
// @description  try to take over the world!
// @author       You
// @match        *://*.kulala.mwco.app/*
// @match        *://*.folke.io/*
// @match        *://*.lintao-index.pages.dev/*
// @match        *://*.app.simplelogin.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const url = window.location.href;

  if (url.includes("app.simplelogin.io")) {
    const cookie = document.cookie;
    let darkModeCookie = cookie
      .split("; ")
      .find((item) => item.startsWith("dark-mode="));

    if (!darkModeCookie) {
      document.cookie = "dark-mode=true;domain=app.simplelogin.io";
      darkModeCookie = "dark-mode=true";
    }

    const darkModeValue = darkModeCookie.split("=")[1];

    if (darkModeValue !== "true") {
      document.cookie = "dark-mode=true;domain=app.simplelogin.io";
    }
  }

  const theme = localStorage.getItem("theme");

  if (theme !== "dark") {
    localStorage.setItem("theme", "dark");
    window.location.reload();
  }
})();
