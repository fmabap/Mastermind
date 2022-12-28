import { countGoalColors, countColors, initGoal, goal, countRounds } from "./game";
import { addClickEventToPins, addClickEventToUndo, addClickEventToCheck, setGoal, showGameRounds, startNextRound } from "./ui";
let goal: goal;
window.addEventListener("load", () => { init() });
/**
 * Init Mastermind
 */
function init() {
    addClickEventToPins();
    addClickEventToUndo();
    addClickEventToCheck();
    showGameRounds(countRounds);
    goal = initGoal(countGoalColors, countColors);
    setGoal(goal);
    startNextRound();
}





