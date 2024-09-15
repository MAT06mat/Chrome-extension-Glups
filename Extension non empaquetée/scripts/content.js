// Def Glups button
const button = document.createElement("button");
button.innerText = "Go";
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

// Add event when button clicked
button.addEventListener("click", () => {
  chrome.storage.local.get(
    ["increment", "userMail", "useGmail", "autoDownload", "companyName", "mailSubject"],
    (result) => {
      if (!result.companyName) {
        handleError(
          "Le nom de la société n'a pas été saisi dans les paramètres"
        );
        return;
      } else if (!result.userMail) {
        handleError("Le mail par defaut n'a pas été saisi dans les paramètres");
        return;
      }

      if (!result.mailSubject) {
        result.mailSubject = "[talentpool]"
      }

      // Get PDF button
      if (result.autoDownload) {
        var downloadPDF = document.querySelector(
          "div[aria-label='Enregistrer au format PDF']"
        );
      } else {
        downloadPDF = undefined;
      }

      var alertPDF = "";
      if (!downloadPDF && result.autoDownload) {
        handleError("Le PDF n'a pas pu être téléchargé");
        alertPDF = "/!\\  ATTENTION Le CV n'a pu être téléchargé";
      }
      // Get name label
      var name = document.querySelector(
        "div div div div div div div main section div div div div span a h1"
      );
      if (!name) {
        handleError("Noms pas trouvés");
        var names = ["ErreurPrenom", "ErreurNom"];
      } else {
        var names = name.textContent.split(" ", 2);
      }
      // Send message to background to open mailbox
      chrome.runtime.sendMessage({
        ...{
          type: "openMail",
          firstName: names[0],
          lastName: names[1],
          alertPDF: alertPDF,
        },
        ...result,
      });
      if (!alertPDF && result.autoDownload) {
        downloadPDF.click();
      }
      chrome.storage.local.set({ increment: result.increment + 1 });
    }
  );
});

let currentUrl = location.href;

urlChange();
// Call when url change
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

// Trigger when url change
setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    urlChange();
  }
}, 100);

// Send alert when there is an error
function handleError(error) {
  alert(`Erreur: ${error}`);
}
