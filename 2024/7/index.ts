import { readFileForDay } from '../fileHelper.js';

export async function main7() {
    const fileData = (await readFileForDay(7));

    const testData = fileData.map(l => l.split(':').map(v => v.trim().split(' ')).flat().map(v => parseInt(v)));
    const solvedValues = testData.map(td => solveTest(td));
    const solvedValuesWithConcat = testData.map(td => solveTest(td, true));

    const sumSolved = solvedValues.reduce((acc, curr) => acc + curr, 0);
    const sumSolvedWithConcat = solvedValuesWithConcat.reduce((acc, curr) => acc + curr, 0);

    console.log('7A', sumSolved);
    console.log('7B', sumSolvedWithConcat);
    console.log('--------')
}

function solveTest(testData: number[], concat = false) {
    let potentialSolves: (number | string)[][] = [testData.slice()];

    for (let it = testData.length - 1; it > 0; it--) {
        const newSolves = reduceSolves(potentialSolves, it, concat);
        if (newSolves.length === 0) {
            return 0;
        }

        potentialSolves = newSolves;
    }

    if (potentialSolves.some(s => s[0] === 0)) {
        return testData[0];
    }

    return 0;
}

function reduceSolves(potentialSolves: (number | string)[][], it: number, concat = false) {
    const newSolves: (number | string)[][] = [];
    for (let i = 0; i < potentialSolves.length; i++) {
        const currentSolve = potentialSolves[i];
        const answer = currentSolve[0] as number;

        const value = currentSolve[it] as number;
        if (answer % value === 0) {
            const newLen = newSolves.push([answer / value, ...currentSolve.slice(1)]);
            newSolves[newLen - 1][it] = '*';
        }

        if (answer - value >= 0) {
            const newLen = newSolves.push([answer - value, ...currentSolve.slice(1)]);
            newSolves[newLen - 1][it] = '+';
        }

        if (concat && it > 1) {
            const anstr = answer.toString();
            const valStr = value.toString();
            if (anstr.endsWith(valStr)) {
                const newLen = newSolves.push([parseInt(`0${anstr.slice(0, anstr.length - valStr.length)}`), ...currentSolve.slice(1)]);
                newSolves[newLen - 1][it] = '||';
            }
        }
    }

    return newSolves;
}
