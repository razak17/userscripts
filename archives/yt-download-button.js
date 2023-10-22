// ==UserScript==
// @name         YouTube Download Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a download button to YouTube videos
// @author       Sponers
// @match        https://www.youtube.com/watch*
// @grant        GM_setClipboard
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function addButton() {
        // Check if button already exists
        if(document.getElementById("customDownloadButton")) return;

        // Create a new button element
        var button = document.createElement("button");
        button.innerHTML = "Download MP3";
        button.id = "customDownloadButton";
        button.style = "padding:10px 20px;font-size:15px;cursor:pointer;background-color:#ff0000;color:#ffffff;border:none;border-radius:25px;margin-left:5px;transition:transform 0.3s, background-color 0.3s;";

        // Add CSS for hover effect
        button.onmouseover = function(){
            button.style.transform = "scale(0.95)";
            button.style.backgroundColor = "#cc0000";
        };
        button.onmouseout = function(){
            button.style.transform = "scale(1)";
            button.style.backgroundColor = "#ff0000";
        };

        // Add an event listener to the button
        button.addEventListener("click", function() {
            // Copy the current URL to clipboard
            GM_setClipboard(window.location.href, "text");

            // Open the download link in a new tab
            window.open("https://link-target.net/978944/tymp3");
        });

        // Find the YouTube subscribe button container
        var subscribeButtonContainer = document.querySelector("ytd-subscribe-button-renderer");

        // Append the button to the subscribe button container
        if (subscribeButtonContainer) {
            subscribeButtonContainer.appendChild(button);
        }
    }

    // Wait for the page to load fully, then add the button
    var checkExist = setInterval(function() {
        if (document.querySelector("ytd-subscribe-button-renderer")) {
            addButton();
            clearInterval(checkExist);
        }
    }, 1000); // check every 1000ms
})();
