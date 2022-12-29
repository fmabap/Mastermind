export interface goal {
    colors: number[];
}

export interface checkResult {
    rightColorAndPos: number,
    rightColorOnly: number,
    won: boolean
}

interface checkDone {
    color: number,
    checkDone: boolean
}

interface resultCheckDone {
    goal: checkDone[],
    set: checkDone[],
    result: checkResult
}
export const countColors: number = 6;
export const countGoalColors: number = 4;
export const countRounds: number = 12;
/**
 * Initialize Goal
 * @param countGoalColors Count of goal colors
 * @param countColors Count of possible colors
 * @returns goal 
 */
export function initGoal(countGoalColors: number, countColors: number): goal {
    let goal: goal = { colors: [] };
    for (let counterGoalColor = 0; counterGoalColor < countGoalColors; counterGoalColor++) {
        goal.colors.push(getRandomColor(countColors));
    }
    console.log(goal);
    return goal;
}

/**
 * Get a random color
 * @param countColors Count of possible colors
 * @returns colors (0 => countColors - 1)
 */
export function getRandomColor(countColors: number): number {
    const color = Math.floor(Math.random() * countColors);
    return color;
}

export function checkSet(goal: goal, colors: number[]): checkResult {
    let resultCheckDone = checkRightColorAndPos(goal, colors);
    if (resultCheckDone.result.won === false) {
        checkRightColorOnly(resultCheckDone);
    }
    return resultCheckDone.result;
}

function checkRightColorAndPos(goal: goal, colors: number[]): resultCheckDone {
    let resultCheckDone: resultCheckDone = { goal: [], set: [], result: { rightColorAndPos: 0, rightColorOnly: 0, won: false } };
    let goalCheckDone: checkDone = { color: 0, checkDone: false };
    let setCheckDone: checkDone = { color: 0, checkDone: false };
    goal.colors.forEach((color: number, index: number) => {
        goalCheckDone.color = color;
        setCheckDone.color = colors[index];
        if (goalCheckDone.color === setCheckDone.color) {
            goalCheckDone.checkDone = true;
            setCheckDone.checkDone = true;
            resultCheckDone.result.rightColorAndPos++;
        } else {
            goalCheckDone.checkDone = false;
            setCheckDone.checkDone = false;
        }
        resultCheckDone.goal.push({ color: goalCheckDone.color, checkDone: goalCheckDone.checkDone });
        resultCheckDone.set.push({ color: setCheckDone.color, checkDone: setCheckDone.checkDone });
    });
    if (resultCheckDone.result.rightColorAndPos === goal.colors.length) {
        resultCheckDone.result.won = true;
    }
    return resultCheckDone!;
}

function checkRightColorOnly(resultCheckDone: resultCheckDone) {
    let skipSet: boolean = false;
    resultCheckDone.goal.forEach((goalCheckDone) => {
        if (goalCheckDone.checkDone === false) {
            skipSet = false;
            resultCheckDone.set.forEach((setCheckDone) => {
                if (setCheckDone.checkDone === false && skipSet === false) {
                    if (goalCheckDone.color === setCheckDone.color) {
                        resultCheckDone.result.rightColorOnly++;
                        goalCheckDone.checkDone = true;
                        setCheckDone.checkDone = true;
                        skipSet = true;
                    }
                }
            })
        }
    });

    return resultCheckDone;
}