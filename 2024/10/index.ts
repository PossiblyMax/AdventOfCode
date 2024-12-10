import { readFileForDay } from '../fileHelper.js';

export async function main10() {
    const fileData = (await readFileForDay(10));

    const map = fileData.map(l => l.split('').map(v => parseInt(v)));
    const trails = getTrails(map);

    let countDistinct = 0;
    let countRatings = 0;
    for (let key in trails) {
        const trail = trails[key];
        // Part A: Count distinct trails
        countDistinct += trail.filter((v, i) => trail.findIndex(v2 => v[0] === v2[0] && v[1] === v2[1]) === i).length;

        // Part B: Any way we can reach any end increases the rating
        countRatings += trail.length;
    }

    console.log('10A', countDistinct);
    console.log('10B', countRatings);
    console.log('--------')
}

function getTrails(map: number[][]) {
    let trails: { [key: string]: number[][] } = {};
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                const trail = getTrail(map, i, j);
                if (trail.length > 0) {
                    trails[`${i},${j}`] = trail;
                }

            }
        }
    }

    return trails;
}

function getTrail(map: number[][], i: number, j: number) {
    const current = map[i][j];

    if (current === 9) {
        return [[i, j]];
    }

    const next = current + 1;
    const trail: number[][] = [];
    for (let k = 0; k < 4; k++) {
        const [x, y] = [[-1, 0], [1, 0], [0, -1], [0, 1]][k];
        if (i + x >= 0 && i + x < map.length && map[i + x][j + y] === next) {
            trail.push(...getTrail(map, i + x, j + y));
        }
    }

    return trail;
}
