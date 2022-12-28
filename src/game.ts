export interface goal {
    colors: number[];
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
