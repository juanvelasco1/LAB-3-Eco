const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = {
    players: [],
};

function determineWinner(player1, player2) {
    const outcomes = {
        rock: { rock: "draw", paper: "lose", scissors: "win" },
        paper: { rock: "win", paper: "draw", scissors: "lose" },
        scissors: { rock: "lose", paper: "win", scissors: "draw" },
    };

    const result = outcomes[player1.move][player2.move];
    return result;
}

app.post("/user", (request, response) => {
    const { body } = request;
    db.players.push(body);

    if (db.players.length === 2) {
        const result = determineWinner(db.players[0], db.players[1]);
        db.result = {
            player1: db.players[0],
            player2: db.players[1],
            result,
        };
        db.players = [];
    }

    response.status(201).send(body);
});

app.get("/users", (request, response) => {
    response.send(db.result ? [db.result] : []);
});

app.listen(5050, () => {
    console.log(`Server is running on http://localhost:5050`);
});
