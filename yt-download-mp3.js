// ==UserScript==
// @name         YouTube - Download MP3
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Adds a button to get the mp3 of a YouTube video.
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function addMp3Button() {
    if (document.getElementById("mp3Btn")) return; // If button already exists, exit the function

    let mp3Link = document.createElement("a");
    let href = window.location.href;
    let videoId = href.split("v=")[1];
    mp3Link.setAttribute("id", "mp3Btn");
    mp3Link.setAttribute("href", `https://ytmp3x.com/${videoId}`);
    mp3Link.setAttribute("target", "_blank");
    mp3Link.innerText = "MP3";
    mp3Link.style.display = "block";
    mp3Link.style.marginLeft = "5px";
    mp3Link.style.background = "#303030";
    mp3Link.style.color = "#a9a9a9";
    mp3Link.style.width = "6rem";
    mp3Link.style.padding = "10px 0";
    mp3Link.style.textAlign = "center";
    mp3Link.style.fontWeight = "500";
    mp3Link.style.fontSize = "1.35rem";
    mp3Link.style.borderRadius = "2px";
    mp3Link.style.textDecoration = "none";

    let parentDiv = document.querySelector("ytd-subscribe-button-renderer");
    if (parentDiv) {
      parentDiv.appendChild(mp3Link);
    }
  }

  const targetNode = document.getElementById("content");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        addMp3Button();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  addMp3Button();
})();
