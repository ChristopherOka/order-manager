export default function debounce(fn, delay) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

export function showThrobber() {
    if (document.getElementById("throbber")) return;
    const throbber = document.createElement("div");
    throbber.id = "throbber";
    const spinner = document.createElement("img");
    spinner.src = "/images/misc/logo.png";
    const spinnerDiv = document.createElement("div");
    throbber.style =
        "display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.5); z-index: 1000;";
    spinnerDiv.style =
        "display: flex; justify-content: center; align-items: center; width: 120px; height: 120px; background-color: #161616; border-radius: 10px; opacity: 50%; overflow: hidden; animation: throbber 2s cubic-bezier(0.65, 0, 0.35, 0.98) infinite;";
    spinner.style = "width: 100px; height: 100px;";
    spinnerDiv.appendChild(spinner);
    throbber.appendChild(spinnerDiv);
    document.body.appendChild(throbber);
}

export function hideThrobber() {
    if (!document.getElementById("throbber")) return;
    document.getElementById("throbber").remove();
}
