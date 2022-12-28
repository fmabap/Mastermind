import { countGoalColors, countRounds, goal } from "./game";
let curRound: number = 0;
let curPin: number = 0;
let curPins: number[] = [];
let curColor: number = 0;
/**
 * Set Goal pins in the ui
 * @param goal goal
 */
export function setGoal(goal: goal) {
    const goalPinsDiv = document.getElementById("goalPins");
    let goalPin = goalPinsDiv?.getElementsByClassName("pinSet");

    goal.colors.forEach((value, index) => {
        let cssClass = "pinColor" + JSON.stringify(value);
        goalPin?.item(index)?.classList.add(cssClass);
    })
}
/**
 * Add Click Event to Pins
 */
export function addClickEventToPins() {
    let pins = document.getElementsByClassName("pinSel");

    for (let counter: number = 0; counter < pins.length; counter++) {
        pins.item(counter)?.addEventListener("click", () => { clickSelectedPin(pins.item(counter)!); })
    }

    ;
}
export function addClickEventToUndo() {
    let undoDiv = document.getElementById("undo");
    undoDiv?.addEventListener("click", () => { undo(); });
}

export function addClickEventToCheck() {
    let checkDiv = document.getElementById("check");
    checkDiv?.addEventListener("click", async () => { await check(); });
}

/**
 * Show Game rounds 
 * @param rounds max. number of rounds
 */
export function showGameRounds(rounds: number) {
    const gameRound1Div = document.getElementById("gameRound1");
    const boardSection = document.getElementById("board");

    for (let round: number = 2; round <= rounds; round++) {
        let gameRoundCloneDiv = <HTMLElement>gameRound1Div?.cloneNode(true);
        gameRoundCloneDiv.id = "gameRound" + JSON.stringify(round);
        let roundDivs = gameRoundCloneDiv.getElementsByClassName("round");
        for (let counter: number = 0; counter < roundDivs.length; counter++) {
            roundDivs.item(counter)!.innerHTML = JSON.stringify(round);
        }
        boardSection?.appendChild(gameRoundCloneDiv);
    }

}


/**
 * Click Selected Pin
 * @param pin Pin Element
 */
export async function clickSelectedPin(pin: Element) {
    if (await arePinsActive() === true) {
        // alert(pin.className);
        await setNextPin(pin);
    }
}
/**
 *  Start next round 
*/
export async function startNextRound() {
    await setPinsActive();
    await setUndoInactive();
    await setCheckInactive();
    curRound++;
    curPin = 0;
    curPins = [];
    curColor = 0;
}


/**
 * Is element active
 * @returns boolean
 */
async function isElementActive(elementId: string): Promise<boolean> {
    const element = document.getElementById(elementId);
    if (element?.classList.contains("disabled") !== true) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Set element active
 * @param elementId 
 */
async function setElementActive(elementId: string) {
    let element = document.getElementById(elementId);
    element?.classList.remove("disabled");
}

/**
 * Set element inactive
 */
async function setElementInactive(elementId: string) {
    let element = document.getElementById(elementId);
    if (element?.classList.contains("disabled") !== true) {
        element?.classList.add("disabled");
    }
}

/**
 * Are pins active
 * @returns boolean
 */
async function arePinsActive(): Promise<boolean> {
    return await isElementActive("colorPins");
}

/**
 * Set pins active
 */
async function setPinsActive() {
    await setElementActive("colorPins");
}

/**
 * Set pins inactive
 */
async function setPinsInactive() {
    await setElementInactive("colorPins");
}


/**
 * Set undo active
 */
async function setUndoActive() {
    await setElementActive("undo");
}

/**
 * Set undo inactive
 */
async function setUndoInactive() {
    await setElementInactive("undo");
}

/**
 * Is undo active
 * @returns boolean
 */
async function isUndoActive(): Promise<boolean> {
    return await isElementActive("undo");
}
/**
 * Set check active
 */
async function setCheckActive() {
    await setElementActive("check");
}

/**
 * Set check inactive
 */
async function setCheckInactive() {
    await setElementInactive("check");
}

/**
 * Is check active
 * @returns boolean
 */
async function isCheckActive(): Promise<boolean> {
    return await isElementActive("check");
}

async function setNextPin(pin: Element) {
    curPin++;
    curColor = getColorOfPin(pin);
    curPins.push(curColor);
    showCurPin();
    setUndoActive();
    if (curPin === countGoalColors) {
        setPinsInactive();
        setCheckActive();
    }

}

async function undo() {
    if (await isUndoActive()) {
        await removeCurPin();
        curPin--;
        curPins.pop();
        if (curPins.length > 0) {
            curColor = curPins[curPins.length - 1]
        } else {
            curColor = 0;
        }
    }
    if (curPin === 0) {
        await setUndoInactive();
    }
    if (curPin === countGoalColors - 1) {
        // Undo last pin so set pins active again
        await setPinsActive();
        // and the check button inactive
        await setCheckInactive();
    }
}

function getColorOfPin(pin: Element): number {
    let pinColor: string = "";
    let colorStr: string;
    let color: number;
    pin.classList.forEach((className) => {
        if (className.startsWith("pinColor")) {
            pinColor = className;
        }
    });
    colorStr = pinColor.split("pinColor").pop()!;
    color = parseInt(colorStr);
    return color;
}

function showCurPin() {
    let elementId = "gameRound" + JSON.stringify(curRound);
    let element = document.getElementById(elementId);
    let pinS = element?.getElementsByClassName("pinSet");
    let colorClass = "pinColor" + JSON.stringify(curColor);
    pinS?.item(curPin - 1)?.classList.add(colorClass);
}

function removeCurPin() {
    let elementId = "gameRound" + JSON.stringify(curRound);
    let element = document.getElementById(elementId);
    let pinS = element?.getElementsByClassName("pinSet");
    let colorClass = "pinColor" + JSON.stringify(curColor);
    pinS?.item(curPin - 1)?.classList.remove(colorClass);
}

async function check() {
    if (await isCheckActive()) {
        if (curRound < countRounds) {
            await startNextRound();
        }
        else {
            alert("End");
            await setCheckInactive();
            await setUndoInactive();
            await setPinsInactive();
        }
    }
}