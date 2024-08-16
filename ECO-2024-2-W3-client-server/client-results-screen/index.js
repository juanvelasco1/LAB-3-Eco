document.getElementById("fetch-button").addEventListener("click", fetchData);

async function fetchData() {
    renderLoadingState();
    try {
        const response = await fetch("http://localhost:5050/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error(error);
        renderErrorState();
    }
}

function renderErrorState() {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous data
    container.innerHTML = "<p>Failed to load data</p>";
    console.log("Failed to load data");
}

function renderLoadingState() {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous data
    container.innerHTML = "<p>Loading...</p>";
    console.log("Loading...");
}

function renderData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous data

    if (data.length > 0) {
        data.forEach((result) => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <p>Player 1: ${result.player1.name} chose ${result.player1.move}</p>
                <p>Player 2: ${result.player2.name} chose ${result.player2.move}</p>
                <p>Result: Player 1 ${result.result}</p>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = "<p>No moves yet</p>";
    }
}
