import { readFileForDay } from '../fileHelper.js';

export async function main3() {
    const fileData = (await readFileForDay(3))
        .join('');

    const sumMul = calculateMuls(fileData);
    const sumEnabledMul = calculateEnabledMuls(fileData);

    console.log('3A', sumMul);
    console.log('3B', sumEnabledMul);
    console.log('--------')
}

function calculateMuls(input: string) {
    return input.matchAll(/mul\((\d+),(\d+)\)/g)
        .flatMap(m => m ? [parseInt(m[1]) * parseInt(m[2])] : [])
        .reduce((acc, curr) => acc + curr, 0);
}

function calculateEnabledMuls(input: string) {
    const enabledSections = input.matchAll(/(?:^|(?:do\(\)))(?!don't\(\))(.+?)(?:(?:don't\(\))|$)/g)
        .map(m => m[1])
        .toArray();

    return calculateMuls(enabledSections.join('-X-'));
}
