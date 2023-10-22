// ==UserScript==
// @name         YouTube - Remove Download Button
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Removes the download button from video
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function removeDownloadButton() {
    const menu = document.getElementById("top-level-buttons-computed");
    const existingDownloadButton = document.querySelector(
      ".style-scope.ytd-download-button-renderer",
    );
    if (existingDownloadButton) existingDownloadButton.remove();
  }

  const targetNode = document.getElementById("content");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        removeDownloadButton();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  removeDownloadButton();
})();
