document.getElementById("player-form").addEventListener("submit", submitMove);
const timer = setInterval(function() {
  count--;
  timerElement.textContent = count;
  if (count === 0) {
      clearInterval(timer);
      timerElement.textContent = "¡Tiempo agotado!";
      document.getElementById("player-form").querySelector("button").disabled = true;
  }
}, 1000);
async function submitMove(event) {
    event.preventDefault();
    const name = document.getElementById("player-name").value;
    const move = document.getElementById("player-move").value;

    try {
        const response = await fetch("http://localhost:5050/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, move }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        alert(`Move submitted for ${data.name} with move ${data.move}`);
    } catch (error) {
        console.error(error);
    }
    let count = 60;
const timerElement = document.getElementById("timer");

}
