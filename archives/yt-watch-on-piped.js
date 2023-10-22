// ==UserScript==
// @name         YouTube - Watch on Piped
// @namespace    http://yournamespace.com/
// @version      0.1
// @description  Add a button to watch YouTube videos on Piped
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function watchOnPipedButton() {
        if (document.getElementById('pipedButton')) return; // If button already exists, exit the function

        let pipedLink = document.createElement('a');
        let href = window.location.href;
        let videoId = href.split('v=')[1];
        console.debug("DEBUGPRINT[2]: watch_on_piped.js:21: videoId=", videoId)
        pipedLink.setAttribute('id', 'pipedButton');
        pipedLink.setAttribute('href', `https://piped.video/watch?v=${videoId}`);
        pipedLink.setAttribute('target', '_blank');
        pipedLink.innerText = 'PIPED';
        pipedLink.style.display = 'block';
        pipedLink.style.marginLeft = '5px';
        pipedLink.style.background = '#303030';
        pipedLink.style.color = '#a9a9a9';
        pipedLink.style.width = '6rem';
        pipedLink.style.padding = '10px 0';
        pipedLink.style.textAlign = 'center';
        pipedLink.style.fontWeight = '500';
        pipedLink.style.fontSize = '1.35rem';
        pipedLink.style.borderRadius = '2px';
        pipedLink.style.textDecoration = 'none';

        let parentDiv = document.querySelector('ytd-subscribe-button-renderer');
        if (parentDiv) {
            parentDiv.appendChild(pipedLink);
        }
    }

    const targetNode = document.getElementById('content');
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                watchOnPipedButton();
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    watchOnPipedButton();

})();
