/* Light/Dark Theme Toggle and Giscus Integration
 Copy of code run in jslibs/instantclick/init.js */
const btn = document.querySelector(".btn-light-dark");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

function getGiscusTheme() {
    const themeFromLS = localStorage.getItem("theme");
    if (themeFromLS) return themeFromLS;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        moon.style.display = 'block';
        sun.style.display = 'none';
    } else {
        document.body.classList.remove("dark-theme");
        moon.style.display = 'none';
        sun.style.display = 'block';
    }
    // Giscus theme update
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        giscusFrame.contentWindow.postMessage({
            giscus: { setConfig: { theme: theme === "dark" ? "dark" : "light" } }
        }, "https://giscus.app");
    }
}

function loadGiscus() {
    const giscusDiv = document.getElementById("giscus_thread");
    if (!giscusDiv) return;
    giscusDiv.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "pocofrosty/pocofrosty.github.io");
    script.setAttribute("data-repo-id", "R_kgDOO8yaKw");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOO8yaK84CwB5F");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", getGiscusTheme());
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;
    giscusDiv.appendChild(script);
}

function getInitialTheme() {
    const themeFromLS = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeFromHugo = document.body.classList.contains("dark-theme") ? "dark" : null;
    if (themeFromLS) {
        return themeFromLS;
    } else if (themeFromHugo) {
        return themeFromHugo;
    } else {
        return prefersDark ? "dark" : "light";
    }
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);
loadGiscus();

if (!localStorage.getItem("theme")) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? "dark" : "light";
        applyTheme(newTheme);
        loadGiscus();
    });
}

btn.onclick = function () {
    document.body.classList.toggle("dark-theme");
    let theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    loadGiscus();
};