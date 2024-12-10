import { readFileForDay } from '../fileHelper.js';

export async function main9() {
    const fileData = (await readFileForDay(9));

    const diskValues = fileData.map(l => l.split('').map(v => parseInt(v))).flat();

    const disk = generateDisk(diskValues);
    const diskSum = calcChecksum(defragDisk(disk));

    const map = generateMap(diskValues);
    const mapSum = calcMapSum(defragMap(map));

    console.log('9A', diskSum);
    console.log('9B', mapSum);
    console.log('--------')
}

function generateMap(diskValues: number[]) {
    const disk: number[][] = [];
    let fileNumber = 0;
    for (let i = 0; i < diskValues.length; i++) {
        const diskData = (i % 2 === 0) ? fileNumber++ : -1;
        disk.push([diskData, diskValues[i]]);
    }

    return disk;
}

function defragMap(map: number[][]) {
    const defrag = [...map];
    let len = map.length;

    for (let i = len - 1; i >= 0; i--) {
        const current = defrag[i];
        if (current[0] === -1 || current[1] === 0) {
            continue;
        }

        for (let j = 0; j < i; j++) {
            if (defrag[j][0] === -1 && defrag[j][1] >= current[1]) {
                // There are enough free blocks to move the current file
                defrag[j][1] -= current[1];
                defrag.splice(j, 0, [current[0], current[1]]);
                len++;
                i++;

                current[0] = -1;
                // Collapse contiguous empty blocks
                for (let k = i; k < len - 1; k++) {
                    if (defrag[k][0] === -1 && defrag[k+1][0] === -1) {
                        defrag[k][1] += defrag[k+1][1];
                        defrag.splice(k+1, 1);
                        len--;
                        k--;

                        if (k < i) {
                            i--;
                        }
                    }
                }
                break;
            }
        }
    }

    return defrag.filter(d => d[1] !== 0);
}

function calcMapSum(map: number[][]) {
    let sum = 0;
    let block = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i][0] !== -1) {
            for (let j = 0; j < map[i][1]; j++, block++) {
                sum += (map[i][0] * block);
            }
        } else {
            block += map[i][1];
        }
    }

    return sum;
}

function generateDisk(diskValues: number[]) {
    const disk: number[][] = [];
    let fileNumber = 0;
    for (let i = 0; i < diskValues.length; i++) {
        const diskData = (i % 2 === 0) ? fileNumber++ : -1;
        disk.push(Array(diskValues[i]).fill(diskData));
    }

    return disk.flat();
}

function defragDisk(disk: number[]) {
    const defrag = [...disk];
    const len = disk.length;
    let nextLastIndex = len - 1;

    for (let i = 0; i < len; i++) {
        const current = defrag[i];
        if (current === -1) {
            defrag[i] = defrag[nextLastIndex];
            defrag[nextLastIndex] = -1;
            while (defrag[nextLastIndex] === -1 && nextLastIndex > i) {
                nextLastIndex--;
            }
        }

        if (i === nextLastIndex) {
            break;
        }
    }

    return defrag;
}

function calcChecksum(disk: number[]) {
    let sum = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] !== -1) {
            sum += (disk[i] * i);
        }
    }

    return sum;
}
