setDefault("companyName", "default");
setDefault("useGmail", false);
setDefault("disabled", false);

function setDefault(propName, propDefault) {
  chrome.storage.local.get([propName], (result) => {
    if (!result[propName]) {
      var prop = {}
      prop[propName] = propDefault
      chrome.storage.local.set(prop);
    }
  })
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "openMail") {
    chrome.storage.local.get(["companyName"], (result) => {
      if (result.companyName != undefined) {
        const mail = encodeURIComponent(
          `send-in@${result.companyName}.softgarden.io`
        );
        const subject = encodeURIComponent("[talentpool]");
        const body = encodeURIComponent(
          `${request.firstName}\n${request.lastName}\nm`
        );
        chrome.tabs.update({
          url: `mailto:${mail}?subject=${subject}&body=${body}`,
        });
      }
    });
  }
});
