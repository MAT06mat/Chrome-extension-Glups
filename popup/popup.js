const textInput = document.getElementById("companyName");
const submit = document.getElementById("submit");
const email = document.getElementById("email");
const mailOpen = document.getElementById("mailOpen")
const state = document.getElementById("state")

textInput.oninput = (event) => {
  email.innerText = `Email : send-in@${textInput.value}.softgarden.io`;
  chrome.storage.local.set({ companyName: textInput.value });
}

mailOpen.addEventListener("click", () => {
  chrome.storage.local.set({ useGmail: mailOpen.checked });
})

state.addEventListener("click", () => {
  chrome.storage.local.set({ disabled: state.checked });
})

chrome.storage.local.get(["companyName"], (result) => {
  textInput.value = result.companyName
  email.innerText = `Email : send-in@${textInput.value}.softgarden.io`;
});
chrome.storage.local.get(["useGmail"], (result) => {
  mailOpen.checked = result.useGmail
});
chrome.storage.local.get(["disabled"], (result) => {
  state.checked = result.disabled
});