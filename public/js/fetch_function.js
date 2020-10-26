
const callAPI = (location, messageOne, messageTwo, messageThree, messageFour, messageFive) => {
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.style.color = "red";
                messageOne.textContent = data.error;
            }
            else {
                messageOne.style.color = "green";
                messageTwo.style.color = "green";
                messageThree.style.color = "green";
                messageFour.style.color = "green";
                messageFive.style.color = "green";
                messageOne.textContent = data.location;
                messageTwo.textContent = data.summary;
                messageThree.textContent = data.temperature;
                messageFour.textContent = data.humidity;
                messageFive.textContent = data.precipitation;
            }

        })
    })
}

const weatherForm = document.querySelector("form")
const address = document.getElementById("address");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");
const messageThree = document.querySelector("#message3");
const messageFour = document.querySelector("#message4");
const messageFive = document.querySelector("#message5");


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messageOne.textContent = "Loading..."
    messageTwo.textContent = "";
    messageThree.textContent = "";
    messageFour.textContent = "";
    messageFive.textContent = "";

    const location = address.value
    if (location.length == 0) {
        messageOne.style.color = "red";
        messageOne.textContent = "You must enter an Address";
        return
    }
    callAPI(location, messageOne, messageTwo, messageThree, messageFour, messageFive)
})

