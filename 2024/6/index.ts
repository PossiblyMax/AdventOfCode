import { readFileForDay } from '../fileHelper.js';

export async function main6() {
    const fileData = (await readFileForDay(6));

    const map = fileData.map(l => l.split(''));
    const startY = fileData.map((l, i) => [i, l.indexOf('^')]).filter(il => il[1] !== -1)[0][0];
    const startX = fileData[startY].indexOf('^');

    const visited = getVisited(map, startX, startY);
    const numberVisited = visited.flat().length;
    const numberLoopLocations = countLoops(map, startX, startY, visited);

    console.log('6A', numberVisited);
    console.log('6B', numberLoopLocations);
    console.log('--------')
}

function countLoops(map: string[][], startX: number, startY: number, visited: number[][][]) {
    let loops = 0;

    visited.forEach((row, y) => 
        row.forEach((_, x) => {
            if (map[y][x] === '.') {
                try {
                    const testMap = map.map(l => l.map(v => v));
                    testMap[y][x] = '#';
                    getVisited(testMap, startX, startY);
                } catch (e) {
                    if (e.message === 'Loop detected') {
                        loops++;
                    }
                }
            }
        }));

    return loops;
}

function getVisited(map: string[][], startX: number, startY: number) {
    const cols = map[0].length;
    const rows = map.length;

    let dir = 0; // 0 = up, 1 = right, 2 = down, 3 = left
    let nextDir = 1;
    let x = startX;
    let y = startY;
    const visited: number[][][] = [];

    while (true) {
        visited[y] = visited[y] || [];
        visited[y][x] = visited[y][x] || [];

        if (visited[y][x].includes(dir)) {
            throw new Error('Loop detected');
        }
        visited[y][x].push(dir);

        const probeX = x + (dir === 1 ? 1 : dir === 3 ? -1 : 0);
        const probeY = y + (dir === 0 ? -1 : dir === 2 ? 1 : 0);

        if (probeX < 0 || probeX >= cols || probeY < 0 || probeY >= rows) {
            break;
        }

        const nextPos = map[probeY][probeX];
        switch (nextPos) {
            case '#':
                dir = nextDir;
                nextDir = (dir + 1) % 4;

                break;

            default:
                x = probeX;
                y = probeY;

                break;
        }
    }

    return visited;
}
