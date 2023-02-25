import { countGoalColors, countColors, initGoal, goal, countRounds } from "./game";
import { addClickEventToPins, addClickEventToUndo, addClickEventToCheck, setGoal, showGameRounds, startNextRound, addClickEventToNewGame, addClickEventToHeader, handleKeyboard } from "./ui";
let goal: goal;
window.addEventListener("load", () => { init() });
/**
 * Init Mastermind
 */
function init() {
    addClickEventToPins();
    addClickEventToUndo();
    addClickEventToCheck();
    addClickEventToNewGame();
    addClickEventToHeader();
    handleKeyboard();
    showGameRounds(countRounds);
    goal = initGoal(countGoalColors, countColors);
    setGoal(goal);
    startNextRound();
    setText();
}

function setText() {
    const divUndo = <HTMLDivElement>document.getElementById("undo");
    const divCheck = <HTMLDivElement>document.getElementById("check");
    const divNewGame = <HTMLDivElement>document.getElementById("newGame");
    const divWon = <HTMLDivElement>document.getElementById("won");
    const divLost = <HTMLDivElement>document.getElementById("lost");
    // Check Browser Language
    if (navigator.language.indexOf("de") > -1) {
        if (window.innerWidth >= 640) {
            divUndo.innerText = "Rückgängig";
        }
        else {
            divUndo.innerText = "Rück-gängig";
        }

        divCheck.innerText = "Prüfen";
        divNewGame.innerText = "Neues Spiel";
        divWon.innerText = "Du hast gewonnen";
        divLost.innerText = "Du hast verloren";
    }
    else {
        divUndo.innerText = "Undo";
        divCheck.innerText = "Check";
        divNewGame.innerText = "New Game";
        divWon.innerText = "You won";
        divLost.innerText = "You lost";
    }

}

export function getGoal(): goal {
    return goal;
}




