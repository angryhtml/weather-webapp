const button1 = document.getElementById("en");
const button2 = document.getElementById("ru");

function toggleActive(selectedButton) {
    button1.classList.remove("active");
    button2.classList.remove("active");

    selectedButton.classList.add("active");
}

button1.addEventListener("click", () => toggleActive(button1));
button2.addEventListener("click", () => toggleActive(button2));
