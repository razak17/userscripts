/* eslint-disable max-len */
/* eslint-disable no-undef */
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

const youtubeLinks = [
  {
    url: "https://addyoutube.com/watch?v=",
    title: "HD Quality Options",
    param: "videoId",
    type: "MP4",
  },
  {
    url: "https://yt1s.com/youtube-to-mp3?q=",
    title: "Multi Download",
    param: "videoId",
    type: "MP4",
  },
  {
    url: "https://www.y2mate.com/youtube/",
    title: "Download Video as MP4",
    param: "videoId",
    type: "MP4",
  },
  {
    url: "https://ytmp3x.com/",
    title: "Download MP3 from Video",
    param: "videoId",
    type: "MP3",
  },
  {
    url: "https://10downloader.com/download?v=",
    title: "Download Thumbnail from Video",
    param: "url",
    type: "THUMBNAIL",
  },
  {
    url: "https://piped.video/watch?v=",
    title: "Watch Video on Piped",
    param: "videoId",
    type: "PIPED",
  },
  {
    url: "https://invidious.flokinet.to/watch?v=",
    title: "Watch Video on Invidious",
    param: "videoId",
    type: "INVIDIOUS",
  },
];

const shortsLinks = [
  {
    url: "https://ytmp3x.com/",
    title: "Download MP3 from short",
    param: "videoId",
    type: "MP3",
  },
  {
    url: "https://www.y2mate.com/youtube/",
    title: "Download MP4 from short",
    param: "videoId",
    type: "MP4",
  },
];

const cssText = `
    .download-button {
        border-radius: 2px;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        background-color: transparent;
        color: #f1f1f1;
        margin: auto var(--ytd-subscribe-button-margin, 4px);
        white-space: nowrap;
        max-height: 36px;
        padding: 0 16px;
        line-height: 36px;
        font-size: var(--ytd-tab-system-font-size, 14px);
        font-weight: var(--ytd-tab-system-font-weight, 500);
        letter-spacing: var(--ytd-tab-system-letter-spacing, .007px);
        text-transform: var(--ytd-tab-system-text-transform, uppercase);
        position: relative;
    }
    .download-button-text {
        --yt-formatted-string-deemphasize_-_display: initial;
        --yt-formatted-string-deemphasize-color: var(--yt-spec-text-secondary);
        --yt-formatted-string-deemphasize_-_margin-left: 4px;
    }
    .download-button-container {
        display: flex;
        flex-direction: row;
        position: relative;
    }
    .download-button-container-shorts {
        display: flex;
        flex-direction: column;
        position: relative;
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
        background-color: transparent;
        color: #f1f1f1;
        white-space: nowrap;
        font-size: 13px;
        font-weight: var(--ytd-tab-system-font-weight, 500);
        letter-spacing: var(--ytd-tab-system-letter-spacing, .007px);
        text-transform: var(--ytd-tab-system-text-transform, uppercase);
        position: relative;
    }
    .download-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #282828;
        color: var(--yt-spec-text-primary, #f1f1f1);
        border-radius: 4px;
        min-width: 280px;
        z-index: 10000;
        display: none;
        box-shadow: 0 4px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05);
        backdrop-filter: blur(20px);
        overflow: hidden;
        margin-top: 8px;
        animation: dropdown-fade-in 0.15s cubic-bezier(0.05, 0.7, 0.1, 1.0);
    }
    @keyframes dropdown-fade-in {
        from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    .download-dropdown.show {
        display: block;
    }
    .download-dropdown-item {
        padding: 14px 20px;
        color: var(--yt-spec-text-primary, #f1f1f1);
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        transition: background-color 0.1s ease;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #535353;
    }
    .download-dropdown-item:last-child {
        border-bottom: none;
    }
    .download-dropdown-item:hover {
        background-color: var(--yt-spec-brand-button-text, rgba(255,255,255,0.1));
    }
    .download-dropdown-item:active {
        background-color: var(--yt-spec-brand-button-text, rgba(255,255,255,0.2));
    }
    .download-dropdown-shorts {
        top: 0;
        left: 100%;
        margin-left: 12px;
        min-width: 240px;
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
        let query = "#owner:not(.download-panel)";
        // let query = "#analytics-button:not(.download-panel)";

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

            const button = document.createElement("div");
            button.classList.add("download-button-shorts");

            const buttonText = document.createElement("span");
            buttonText.classList.add("download-button-text");
            buttonText.innerHTML = "DL";

            const arrow = document.createElement("span");

            button.appendChild(buttonText);
            button.appendChild(arrow);
            button.title = "Download Options";

            const dropdown = document.createElement("div");
            dropdown.classList.add(
              "download-dropdown",
              "download-dropdown-shorts",
            );

            let url = window.location.toString();
            let videoId = url.split("/").pop();

            for (let i = 0; i < shortsLinks.length; i++) {
              const dropdownItem = document.createElement("div");
              dropdownItem.classList.add("download-dropdown-item");
              dropdownItem.innerHTML = shortsLinks[i].title;

              dropdownItem.addEventListener("click", (e) => {
                e.stopPropagation();
                if (shortsLinks[i].param === "videoId") {
                  window.open(shortsLinks[i].url + videoId);
                } else if (shortsLinks[i].param === "url") {
                  window.open(shortsLinks[i].url + url);
                }
                dropdown.classList.remove("show");
              });

              dropdown.appendChild(dropdownItem);
            }

            button.addEventListener("click", (e) => {
              e.stopPropagation();
              dropdown.classList.toggle("show");
            });

            button.appendChild(dropdown);
            container.appendChild(button);
          } else {
            container.classList.add("download-button-container");

            const videoId = new URL(window.location.href).searchParams.get("v");
            const url = window.location.href;

            const button = document.createElement("div");
            button.classList.add("download-button");
            if (inPlaylist) {
              button.classList.add("download-playlist-button");
            }

            const buttonText = document.createElement("span");
            buttonText.classList.add("download-button-text");
            if (inPlaylist) {
              buttonText.classList.add("download-playlist-button-text");
            }
            buttonText.innerHTML = "DOWNLOAD";

            const arrow = document.createElement("span");

            button.appendChild(buttonText);
            button.appendChild(arrow);
            button.title = "Download & Watch Options";

            const dropdown = document.createElement("div");
            dropdown.classList.add("download-dropdown");

            for (let i = 0; i < youtubeLinks.length; i++) {
              const dropdownItem = document.createElement("div");
              dropdownItem.classList.add("download-dropdown-item");
              dropdownItem.innerHTML = youtubeLinks[i].title;

              dropdownItem.addEventListener("click", (e) => {
                e.stopPropagation();
                if (youtubeLinks[i].param === "videoId") {
                  window.open(youtubeLinks[i].url + videoId);
                } else if (youtubeLinks[i].param === "url") {
                  window.open(youtubeLinks[i].url + url);
                }
                dropdown.classList.remove("show");
              });

              dropdown.appendChild(dropdownItem);
            }

            button.addEventListener("click", (e) => {
              e.stopPropagation();
              dropdown.classList.toggle("show");
            });

            button.appendChild(dropdown);
            container.appendChild(button);
          }

          panel.classList.add("download-panel");
          panel.appendChild(container, panel.firstElementChild);
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
          document
            .querySelectorAll(".download-dropdown")
            .forEach((dropdown) => {
              dropdown.classList.remove("show");
            });
        });
      }, 200);
    });
  };
})();
