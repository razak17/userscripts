// ==UserScript==
// @name         YouTube Downloader - MP3, MP4, Thumbnail + Watch on Piped
// @namespace    http://tampermonkey.net/
// @description  Adds a button to download YouTube videos as MP3, MP4, Thumbnail, or Watch on Piped (YouTube without distractions)
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// @run-at       document-end
// @version      0.1
// ==/UserScript==

const buttons = ["MP3", "MP4", "THUMBNAIL", "PIPED"];

const cssText = `
    .download-button {
        border-radius: 2px;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        background-color: #303030;
        color: #a9a9a9;
        padding: var(--yt-button-padding);
        margin: auto var(--ytd-subscribe-button-margin, 4px);
        white-space: nowrap;
        max-height: 36px;
        font-size: var(--ytd-tab-system-font-size, 1.2rem);
        font-weight: var(--ytd-tab-system-font-weight, 500);
        letter-spacing: var(--ytd-tab-system-letter-spacing, .007px);
        text-transform: var(--ytd-tab-system-text-transform, uppercase);
    }
    .download-button-text {
        --yt-formatted-string-deemphasize_-_display: initial;
        --yt-formatted-string-deemphasize-color: var(--yt-spec-text-secondary);
        --yt-formatted-string-deemphasize_-_margin-left: 4px;
    }
    .download-button-container {
        display: flex;
        flex-direction: row;
    }
    .download-button-container-shorts {
        display: flex;
        flex-direction: column;
    }
    .download-playlist-button {
        margin-right: 8px;
        margin-left: 0px;
    }
    .download-playlist-button-text {
        color: #a9a9a9;
    }
    .download-button-shorts {
        border-radius: 2px;
        height: 48px;
        width: 48px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        background-color: #303030;
        color: white;
        white-space: nowrap;
        font-size: 13px;
        font-weight: var(--ytd-tab-system-font-weight, 500);
        letter-spacing: var(--ytd-tab-system-letter-spacing, .007px);
        text-transform: var(--ytd-tab-system-text-transform, uppercase);
    }
`;

(function () {
  "use strict";
  window.onload = () => {
    function run() {
      if (window.location.href.includes("youtube.com/watch")) {
        document.getElementById("downloadshorts").remove();
      }
    }

    window.onload = run;
    window.addEventListener("yt-navigate-start", run, true);

    // playlist pages will try to add the buttons repeatedly
    let playlistButtonsAdded = false;
    let youtubeshorts = false;

    window.addEventListener("yt-navigate-finish", () => {
      setTimeout(() => {
        // apply css
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = cssText;
        document.head.appendChild(style);

        // check for playlist and create appropriate query
        let query = "#analytics-button:not(.download-panel)";

        let inPlaylist = location.href.includes("/playlist");
        if (inPlaylist && !playlistButtonsAdded) {
          query += ", div.metadata-buttons-wrapper:not(.download-panel)";
          playlistButtonsAdded = true;
        }

        if (window.location.toString().includes("youtube.com/shorts/")) {
          // check for youtube shorts
          youtubeshorts = true;
          query = "#actions:not(.download-panel)";
        }

        document.querySelectorAll(query).forEach((panel) => {
          const container = document.createElement("div");

          if (youtubeshorts) {
            container.classList.add("download-button-container-shorts");
            container.id = "downloadshorts";

            for (let i = 0; i < 3; i++) {
              if (i == 0) {
                const button = document.createElement("div");
                button.classList.add("download-button-shorts");

                button.addEventListener("click", () => {
                  let url = window.location.toString();
                  let videoId = url.split("/").pop();
                  window.open("https://www.y2mate.com/youtube/" + videoId);
                  document.getElementById("download-shorts").disabled = true;
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                buttonText.innerHTML = "MP3";
                button.appendChild(buttonText);
                button.title = "Download MP3 from short";
                container.appendChild(button);
              }

              if (i == 1) {
                const button = document.createElement("div");
                button.classList.add("download-button-shorts");

                button.addEventListener("click", () => {
                  let url = window.location.toString();
                  let videoId = url.split("/").pop();
                  window.open("https://ytmp3x.com/" + videoId);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                buttonText.innerHTML = "MP4";
                button.appendChild(buttonText);
                button.title = "Download MP4 from short";
                button.style.margin = "15px 0px 0px 0px";
                container.appendChild(button);
              }

              if (i == 2) {
                const button = document.createElement("div");
                button.classList.add("download-button-shorts");

                button.addEventListener("click", () => {
                  let url = window.location.toString();
                  window.open("https://10downloader.com/download?v=" + url);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                buttonText.innerHTML = "THUMBNAIL";
                button.appendChild(buttonText);
                button.title = "Download Thumbnail from short";
                button.style.margin = "15px 0px 0px 0px";
                container.appendChild(button);
              }
            }
          } else {
            container.classList.add("download-button-container");
            for (let i = 0; i < 4; i++) {
              const button = document.createElement("div");
              button.classList.add("download-button");
              if (inPlaylist) {
                button.classList.add("download-playlist-button");
              }

              if (i == 0) {
                button.addEventListener("click", () => {
                  const videoId = new URL(
                    window.location.href,
                  ).searchParams.get("v");
                  window.open("https://ytmp3x.com/" + videoId);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                if (inPlaylist) {
                  buttonText.classList.add("download-playlist-button-text");
                }
                buttonText.innerHTML = buttons[i];
                button.appendChild(buttonText);
                button.title = "Download MP3 from Video";
                container.appendChild(button);
              }

              if (i == 1) {
                button.addEventListener("click", () => {
                  const videoId = new URL(
                    window.location.href,
                  ).searchParams.get("v");
                  window.open("https://www.y2mate.com/youtube/" + videoId);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                if (inPlaylist) {
                  buttonText.classList.add("download-playlist-button-text");
                }
                buttonText.innerHTML = buttons[i];
                button.appendChild(buttonText);
                button.title = "Download Video as MP4";
                container.appendChild(button);
              }

              if (i == 2) {
                button.addEventListener("click", () => {
                  const url = window.location.href;
                  window.open("https://10downloader.com/download?v=" + url);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                if (inPlaylist) {
                  buttonText.classList.add("download-playlist-button-text");
                }
                buttonText.innerHTML = buttons[i];
                button.appendChild(buttonText);
                button.title = "Download Thumbnail from Video";
                container.appendChild(button);
              }

              if (i == 3) {
                button.addEventListener("click", () => {
                  const videoId = new URL(
                    window.location.href,
                  ).searchParams.get("v");
                  window.open("https://piped.video/watch?v=" + videoId);
                });

                const buttonText = document.createElement("span");
                buttonText.classList.add("download-button-text");
                if (inPlaylist) {
                  buttonText.classList.add("download-playlist-button-text");
                }
                buttonText.innerHTML = buttons[i];
                button.appendChild(buttonText);
                button.title = "Watch Video on Piped";
                container.appendChild(button);
              }
            }
          }

          panel.classList.add("download-panel");
          panel.insertBefore(container, panel.firstElementChild);
        });
      }, 200);
    });
  };
})();
