// ==UserScript==
// @name         YouTube - Download Video
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Adds a download button to YouTube videos
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function addDownloadButton() {
    if (document.getElementById("downloadBtn")) return; // If button already exists, exit the function

    let downloadLink = document.createElement("a");
    let href = window.location.href;
    let videoId = href.split("v=")[1];
    downloadLink.setAttribute("id", "downloadBtn");
    downloadLink.setAttribute(
      "href",
      `https://www.y2mate.com/youtube/${videoId}`,
    );
    downloadLink.setAttribute("target", "_blank");
    downloadLink.innerText = "VIDEO";
    downloadLink.style.display = "block";
    downloadLink.style.marginLeft = "5px";
    downloadLink.style.background = "#303030";
    downloadLink.style.color = "#a9a9a9";
    downloadLink.style.width = "6rem";
    downloadLink.style.padding = "10px 0";
    downloadLink.style.textAlign = "center";
    downloadLink.style.fontWeight = "500";
    downloadLink.style.fontSize = "1.35rem";
    downloadLink.style.borderRadius = "2px";
    downloadLink.style.textDecoration = "none";

    let parentDiv = document.querySelector("ytd-subscribe-button-renderer");
    let parentDivAlt = document.querySelector(
      "ytd-video-secondary-info-renderer",
    );
    if (parentDiv) {
      // parentDiv.parentElement.insertBefore(downloadLink, parentDiv.nextSibling);
      parentDiv.appendChild(downloadLink);
    } else if (parentDivAlt) {
      parentDivAlt.parentElement.insertBefore(
        downloadLink,
        parentDivAlt.nextSibling,
      );
    }
  }

  // Since YouTube is a single-page application and it dynamically loads content,
  // we use a MutationObserver to listen for changes and add the download button when necessary.
  const targetNode = document.getElementById("content");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        addDownloadButton();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  // Add the download button initially
  addDownloadButton();
})();
