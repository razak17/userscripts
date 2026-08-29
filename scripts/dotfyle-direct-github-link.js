// ==UserScript==
// @name         Add Direct link to GitHub plugins
// @namespace    https://github.com/razak17/userscripts
// @version      2025-10-13
// @description  Discover and share Neovim plugins
// @author       razak17
// @match        http://*.dotfyle.com/neovim/plugins/*
// @match        https://*.dotfyle.com/neovim/plugins/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function addGitHubLinks() {
    const pluginLinks = document.querySelectorAll('a[href*="/plugins/"]');

    pluginLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.includes("/plugins/")) return;

      const pluginPath = href.split("/plugins/")[1];
      if (!pluginPath || pluginPath.includes("?") || !pluginPath.includes("/")) return;

      const existingGithubLink = link.parentElement.querySelector(
        ".github-direct-link",
      );
      if (existingGithubLink) return;

      const githubUrl = `https://github.com/${pluginPath}`;

      const githubLink = document.createElement("a");
      githubLink.href = githubUrl;
      githubLink.className = "github-direct-link";
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";
      githubLink.style.cssText =
        "color: #58a6ff; text-decoration: none; font-size: 0.875rem;";
      githubLink.innerHTML = "[GitHub ↗]";

      githubLink.addEventListener("mouseenter", () => {
        githubLink.style.textDecoration = "underline";
      });
      githubLink.addEventListener("mouseleave", () => {
        githubLink.style.textDecoration = "none";
      });

      link.parentElement.appendChild(githubLink);
    });
  }

  addGitHubLinks();

  const observer = new MutationObserver(() => {
    addGitHubLinks();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
