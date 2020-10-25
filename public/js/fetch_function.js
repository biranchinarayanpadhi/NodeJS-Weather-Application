
const callAPI = (location,messageOne,messageTwo) => {
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.style.color="red";
                messageOne.textContent=data.error;
            }
            else {
                messageOne.style.color="green";
                messageTwo.style.color="green";
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast;
            }

        })
    })
}

const weatherForm = document.querySelector("form")
const address = document.getElementById("address");
const messageOne=document.querySelector("#message1");
const messageTwo=document.querySelector("#message2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messageOne.textContent="Loading..."
    messageTwo.textContent="";
    const location = address.value
    if (location.length == 0){
        messageOne.style.color="red";
        messageOne.textContent="You must enter an Address";   
        return
    }
    callAPI(location,messageOne,messageTwo)
})

