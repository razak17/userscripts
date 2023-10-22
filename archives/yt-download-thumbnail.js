// ==UserScript==
// @name         YouTube - Download Thumbnail
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Adds a button to get the thumbnail of a YouTube video.
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function addThumbnailBtn() {
    if (document.getElementById("thumbnailBtn")) return; // If button already exists, exit the function

    let thumbnailLink = document.createElement("a");
    thumbnailLink.setAttribute("id", "thumbnailBtn");
    thumbnailLink.setAttribute(
      "href",
      `https://10downloader.com/download?v=${window.location.href}`,
    );
    thumbnailLink.setAttribute("target", "_blank");
    thumbnailLink.innerText = "THUMBNAIL";
    thumbnailLink.style.display = "block";
    thumbnailLink.style.marginLeft = "5px";
    thumbnailLink.style.background = "#303030";
    thumbnailLink.style.color = "#a9a9a9";
    thumbnailLink.style.width = "10rem";
    thumbnailLink.style.padding = "10px 0";
    thumbnailLink.style.textAlign = "center";
    thumbnailLink.style.fontWeight = "500";
    thumbnailLink.style.fontSize = "1.35rem";
    thumbnailLink.style.borderRadius = "2px";
    thumbnailLink.style.textDecoration = "none";

    let parentDiv = document.querySelector("ytd-subscribe-button-renderer");
    if (parentDiv) {
      parentDiv.appendChild(thumbnailLink);
    }
  }

  const targetNode = document.getElementById("content");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        addThumbnailBtn();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  addThumbnailBtn();
})();
