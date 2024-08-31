const textInput = document.getElementById("companyName");
const submit = document.getElementById("submit");
const email = document.getElementById("email");
const mailOpen = document.getElementById("mailOpen")
const state = document.getElementById("state")

submit.addEventListener("click", save);
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    save();
  }
});

function save() {
  chrome.storage.local.set({ companyName: textInput.value });
  reload();
}

mailOpen.addEventListener("click", () => {
  chrome.storage.local.set({ useGmail: mailOpen.checked });
})

state.addEventListener("click", () => {
  chrome.storage.local.set({ disabled: state.checked });
})

reload();

function reload() {
  chrome.storage.local.get(["companyName"], (result) => {
    textInput.value = result.companyName
    email.innerText = `Email : send-in@${result.companyName}.softgarden.io`;
  });
  chrome.storage.local.get(["useGmail"], (result) => {
    mailOpen.checked = result.useGmail
  });
  chrome.storage.local.get(["disabled"], (result) => {
    state.checked = result.disabled
  });
}