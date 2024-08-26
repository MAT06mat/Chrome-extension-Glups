const body = document.querySelector(".authentication-outlet")

var b = document.createElement("button")
var s = document.createElement("span")

s.classList.add("artdeco-button__text")
s.innerText = "LGUD"

b.appendChild(s)
b.style.margin = "20px"
b.style.height = "20px"
b.style.width = "155px"
b.style.padding = "10px"
b.style.position = "fixed"
b.style.boxShadow = "5px 5px 10px 2px #00000050"
b.style.zIndex = "999"
b.classList.add("artdeco-button")
b.classList.add("artdeco-button--3")
b.classList.add("artdeco-button--primary")
b.classList.add("customButton")

body.insertAdjacentElement("afterbegin", b)


chrome.storage.local.get(["companyName"], (result) => {
    if (result.companyName != undefined) {
        //button.innerText = `Email is send-in@${result.companyName}.softgarden.io`;
    } else {
        //button.innerText = 'nothing find...'
    }
});


let currentUrl = location.href;

urlChange()
function urlChange() {
    if (currentUrl.includes('linkedin.com/in/')) {
        b.disabled = false
    } else {
        b.disabled = true
    }
}

setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    urlChange();
  }
}, 100);