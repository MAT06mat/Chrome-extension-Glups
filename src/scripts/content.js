const body = document.querySelector(".authentication-outlet")

var button = document.createElement("button")
button.innerText = "Glups"
button.classList.add("customButton")


button.addEventListener("mousedown", () => {
    button.classList.add("click")
});
button.addEventListener("mouseup", () => {
    button.classList.remove("click")
});
button.addEventListener("mouseleave", () => {
    button.classList.remove("click")
});


let currentUrl = location.href;

urlChange()
function urlChange() {
    if (currentUrl.includes('linkedin.com/in/')) {
        button.disabled = false
    } else {
        button.disabled = true
    }
    if (body) {
        if (!body.hasAttribute("customButton")) {
            body.setAttribute("customButton", true)
            body.insertAdjacentElement("afterbegin", button)
        }
    }
}

setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    urlChange();
  }
}, 100);