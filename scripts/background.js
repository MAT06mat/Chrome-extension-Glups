// Set default values to var saved in extension storage
setDefault("companyName", "");
setDefault("userMail", "");
setDefault("useGmail", false);
setDefault("autoDownload", true);
setDefault("disabled", false);
setDefault("increment", 0);

function setDefault(propName, propDefault) {
  chrome.storage.local.get([propName], (result) => {
    if (!result[propName]) {
      var prop = {};
      prop[propName] = propDefault;
      chrome.storage.local.set(prop);
    }
  });
}

// Open mailbox with auto-fill informations
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "openMail") {
    if (request.alertPDF) {
      var alertPDF = request.alertPDF;
    } else {
      if (request.autoDownload) {
        var alertPDF =
          "*** Pensez à ajouter la pièce jointe (dernier fichier téléchargé) ***";
      } else {
        var alertPDF =
          "*** Pensez télécharger et à ajouter la pièce jointe ***";
      }
    }
    const mail = encodeURIComponent(
      `send-in@${request.companyName}.softgarden.io`
    );
    const subject = encodeURIComponent("[talentpool]");
    const body = encodeURIComponent(
      `${request.firstName}\n${request.lastName}\n${request.userMail}\n\nfr\n\n${alertPDF}\nMail n°${request.increment}`
    );
    if (request.useGmail) {
      chrome.tabs.create({
        url: `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${subject}&body=${body}`,
      });
    } else {
      chrome.tabs.update({
        url: `mailto:${mail}?subject=${subject}&body=${body}`,
      });
    }
  }
});
