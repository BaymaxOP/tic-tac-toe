let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnX = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver === true) return;
        if (turnX === true) {
            box.textContent = "X";
            turnX = false;
        }
        else {
            box.textContent = "O";
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
}

const showWinner = (winner) => {
    msg.textContent = `Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    gameOver = true;
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    let isDraw = true;
    boxes.forEach((box) => {
        if (box.textContent === "") {
            isDraw = false;
            return;
        }
    });
    if (isDraw) {
        msg.textContent = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameOver = true;
        boxes.forEach((box) => box.disabled = true);
    }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);