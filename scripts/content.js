const button = document.createElement("button");
button.innerText = "Glups";
button.classList.add("customButton");

button.addEventListener("mousedown", () => {
  button.classList.add("click");
});
button.addEventListener("mouseup", () => {
  button.classList.remove("click");
});
button.addEventListener("mouseleave", () => {
  button.classList.remove("click");
});

button.addEventListener("click", () => {
  var downloadPDF = document.querySelector(
    "div[aria-label='Enregistrer au format PDF']"
  );
  if (!downloadPDF) {
    handleError("Download PDF button unfind");
    return;
  }
  var name = document.querySelector(
    "div div div div div div div main section div div div div span a h1"
  );
  if (!name) {
    handleError("Profile name unfind");
    return;
  }
  var names = name.textContent.split(" ", 2);
  chrome.runtime.sendMessage({
    type: "openMail",
    firstName: names[0],
    lastName: names[1],
  });
  downloadPDF.click();
});

let currentUrl = location.href;

urlChange();
function urlChange() {
  if (currentUrl.includes("linkedin.com/in/")) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }

  chrome.storage.local.get(["disabled"], (result) => {
    if (result.disabled) {
      button.style.display = "none";
    } else {
      button.style.display = "initial";
    }

    var body = document.querySelector(".authentication-outlet");
    if (body) {
      if (!body.hasAttribute("customButton")) {
        body.setAttribute("customButton", true);
        body.insertAdjacentElement("afterbegin", button);
      }
    }
  });
}

setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    urlChange();
  }
}, 100);

function handleError(error) {
  alert(`Error: ${error}`);
}
