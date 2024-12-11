import { readFileForDay } from '../fileHelper.js';

type StoneMap = { [key: number]: number };
export async function main11() {
    const fileData = (await readFileForDay(11));

    const stones = fileData[0].split(' ').map(s => parseInt(s));

    const stonesLenA = processBlink(stones, 25);
    const stonesLenB = processBlink(stones, 75);

    console.log('11A', stonesLenA);
    console.log('11B', stonesLenB);
    console.log('--------')
}

function processBlink(stones: number[], blinks: number) {
    let nextMap: StoneMap = {};
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        nextMap[stone] = nextMap[stone] || 0;
        nextMap[stone]++;
    }

    for (let b = 0; b < blinks; b++) {
        nextMap = processStones(nextMap);
    }

    let numStones = 0;
    for (const key in nextMap) {
        const numTimes = nextMap[key];
        numStones += numTimes;
    }

    return numStones;
}

function processStones(toCalc: StoneMap) {
    const newMap: StoneMap = {};
    for (let key in toCalc) {
        const stone = parseInt(key);
        const count = toCalc[key];

        const stoneStr = stone.toString();
        const newStones = [];
        switch (true) {
            case stone === 0:
                newStones.push(1);
                break;
            case (stoneStr.length % 2) === 0:
                const left = stoneStr.slice(0, stoneStr.length / 2);
                const right = stoneStr.slice(stoneStr.length / 2);

                newStones.push(parseInt(left));
                newStones.push(parseInt(right));
                break;
            default:
                newStones.push(stone * 2024);
                break;
        }

        for (const newStone of newStones) {
            newMap[newStone] = newMap[newStone] || 0;
            newMap[newStone] += count; 
        }
    }

    return newMap;
}
