const textInput = document.getElementById("companyName");
const submit = document.getElementById("submit");
const email = document.getElementById("email");

changeMail();

submit.addEventListener("click", save);
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    save();
  }
});

function save() {
  chrome.storage.local.set({ companyName: textInput.value });
  changeMail();
}

function changeMail() {
  chrome.storage.local.get(["companyName"], (result) => {
    if (result.companyName != undefined) {
      email.innerText = `Email is send-in@${result.companyName}.softgarden.io`;
    } else {
      email.innerText = ''
    }
    });
}