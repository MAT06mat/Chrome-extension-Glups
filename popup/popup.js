// Def settings buttons and inputs
const textInput = document.getElementById("companyName");
const submit = document.getElementById("submit");
const email = document.getElementById("email");
const mailOpen = document.getElementById("mailOpen");
const state = document.getElementById("state");

// Add event listener for save settings
textInput.addEventListener("input", (event) => {
  email.innerText = `Email : send-in@${textInput.value}.softgarden.io`;
  chrome.storage.local.set({ companyName: textInput.value });
});

mailOpen.addEventListener("click", () => {
  chrome.storage.local.set({ useGmail: mailOpen.checked });
});

state.addEventListener("click", () => {
  chrome.storage.local.set({ disabled: state.checked });
});

// Change default value to thoses saved
chrome.storage.local.get(["companyName"], (result) => {
  textInput.value = result.companyName;
  email.innerText = `Email : send-in@${textInput.value}.softgarden.io`;
});
chrome.storage.local.get(["useGmail"], (result) => {
  mailOpen.checked = result.useGmail;
});
chrome.storage.local.get(["disabled"], (result) => {
  state.checked = result.disabled;
});
