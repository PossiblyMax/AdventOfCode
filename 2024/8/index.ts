import { readFileForDay } from '../fileHelper.js';

export async function main8() {
    const fileData = (await readFileForDay(8));

    const rows = fileData.length;
    const cols = fileData[0].length;

    const locations = generateLocations(fileData, rows, cols);
    const antinodes = generateAntinodes(locations, rows, cols);

    const numAntinodes = Object.keys(antinodes)
        .map(k => antinodes[k])
        .filter(n => n.includes(1)).length;
    const numAllAntinodes = Object.keys(antinodes).length;

    console.log('8A', numAntinodes);
    console.log('8B', numAllAntinodes);
    console.log('--------')
}

function generateLocations(fileData: string[], rows: number, cols: number) {
    const locations: { [key: string]: [x: number, y: number][]} = {};
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const currentChar = fileData[i][j];
            if (currentChar === '.') {
                continue;
            }

            locations[currentChar] = locations[currentChar] || [];
            locations[currentChar].push([j, i]);
        }
    }

    return locations;
}

function generateAntinodes(locations: { [key: string]: [x: number, y: number][]}, rows: number, cols: number) {
    const antinodes: { [key: string]: number[] } = {};

    for (const key in locations) {
        const locs = locations[key];
        for (let i = 0; i < locs.length; i++) {
            const x1 = locs[i][0];
            const y1 = locs[i][1];

            for (let j = i + 1; j < locs.length; j++) {
                const x2 = locs[j][0];
                const y2 = locs[j][1];

                if (!antinodes[`${x1},${y1}`]) {
                    antinodes[`${x1},${y1}`] = [];
                }
                antinodes[`${x1},${y1}`].push(0);
                if (!antinodes[`${x2},${y2}`]) {
                    antinodes[`${x2},${y2}`] = [];
                }
                antinodes[`${x2},${y2}`].push(0);

                const xDiff = x2 - x1;
                const yDiff = y2 - y1;

                for (let k = 1;; k++) {
                    const xAnti1 = x2 + (xDiff * k);
                    const yAnti1 = y2 + (yDiff * k);
                    const xAnti2 = x1 - (xDiff * k);
                    const yAnti2 = y1 - (yDiff * k);

                    if (xAnti1 >= 0 && xAnti1 < cols && yAnti1 >= 0 && yAnti1 < rows) {
                        if (!antinodes[`${xAnti1},${yAnti1}`]) {
                            antinodes[`${xAnti1},${yAnti1}`] = [];
                        }
                        antinodes[`${xAnti1},${yAnti1}`].push(k);
                    }

                    if (xAnti2 >= 0 && xAnti2 < cols && yAnti2 >= 0 && yAnti2 < rows) {
                        if (!antinodes[`${xAnti2},${yAnti2}`]) {
                            antinodes[`${xAnti2},${yAnti2}`] = [];
                        }
                        antinodes[`${xAnti2},${yAnti2}`].push(k);
                    }

                    if ((xAnti1 < 0 || xAnti1 >= cols) && (yAnti1 < 0 || yAnti1 >= rows)
                        && (xAnti2 < 0 || xAnti2 >= cols) && (yAnti2 < 0 || yAnti2 >= rows)) {
                        break;
                    }
                }
            }
        }
    }

    return antinodes;
}
