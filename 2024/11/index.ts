import { readFileForDay } from '../fileHelper.js';

type StoneMap = { [key: number]: number };
export async function main11() {
    const fileData = (await readFileForDay(11));

    const stones = fileData[0].split(' ').map(s => parseInt(s));

    console.time('11A processing time');
    const stonesLenA = processBlink(stones, 25);
    console.timeEnd('11A processing time');

    console.time('11B processing time');
    const stonesLenB = processBlink(stones, 75);
    console.timeEnd('11B processing time');

    console.log('11A', stonesLenA);
    console.log('11B', stonesLenB);
    console.log('--------')
}

function processBlink(stones: number[], blinks: number) {
    let nextMap: StoneMap = {};
    for (const stone of stones) {
        nextMap[stone] = (nextMap[stone] ?? 0) + 1;
    }

    for (; blinks > 0; blinks--) {
        nextMap = processStones(nextMap);
    }

    return Object.entries(nextMap)
        .reduce((acc, [_key, value]) => acc + value, 0);
}

function processStones(currentStones: StoneMap) {
    const newMap: StoneMap = {};
    for (const key of Object.keys(currentStones)) {
        const stone = parseInt(key);
        const count = currentStones[stone];

        const stoneStr = stone.toString();
        const newStones = stone === 0
            ? [1]
            : (stoneStr.length % 2) === 0
            ? [parseInt(stoneStr.slice(0, stoneStr.length / 2)), parseInt(stoneStr.slice(stoneStr.length / 2))]
            : [stone * 2024];

        for (const newStone of newStones) {
            newMap[newStone] = (newMap[newStone] ?? 0) + count;
        }
    }

    return newMap;
}
