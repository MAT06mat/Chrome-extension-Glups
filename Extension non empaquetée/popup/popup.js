// Def settings buttons and inputs
const companyNameInput = document.getElementById("companyName");
const userMailInput = document.getElementById("userMail");
const mailSubject = document.getElementById("mailSubject");
const email = document.getElementById("email");
const mailOpen = document.getElementById("mailOpen");
const autoDownload = document.getElementById("autoDownload");
const state = document.getElementById("state");
const reset = document.getElementById("reset");

// Add event listener for save settings
companyNameInput.addEventListener("input", (event) => {
  email.innerText = `Email : send-in@${companyNameInput.value}.softgarden.io`;
  chrome.storage.local.set({ companyName: companyNameInput.value });
});
userMailInput.addEventListener("input", (event) => {
  chrome.storage.local.set({ userMail: userMailInput.value });
});
mailSubject.addEventListener("input", (event) => {
  chrome.storage.local.set({ mailSubject: mailSubject.value });
});
mailOpen.addEventListener("click", () => {
  chrome.storage.local.set({ useGmail: mailOpen.checked });
});
autoDownload.addEventListener("click", () => {
  chrome.storage.local.set({ autoDownload: autoDownload.checked });
});
state.addEventListener("click", () => {
  chrome.storage.local.set({ disabled: !state.checked });
});
reset.addEventListener("click", () => {
  mailSubject.value = "[talentpool]"
  chrome.storage.local.set({ mailSubject: "[talentpool]" });
});

// Change default value to thoses saved
chrome.storage.local.get(["companyName"], (result) => {
  companyNameInput.value = result.companyName;
  email.innerText = `Email : send-in@${companyNameInput.value}.softgarden.io`;
});
chrome.storage.local.get(["userMail"], (result) => {
  userMailInput.value = result.userMail;
});
chrome.storage.local.get(["mailSubject"], (result) => {
  mailSubject.value = result.mailSubject;
});
chrome.storage.local.get(["useGmail"], (result) => {
  mailOpen.checked = result.useGmail;
});
chrome.storage.local.get(["autoDownload"], (result) => {
  autoDownload.checked = result.autoDownload;
});
chrome.storage.local.get(["disabled"], (result) => {
  state.checked = !result.disabled;
});
