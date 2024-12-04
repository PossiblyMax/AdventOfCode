import { readFileForDay } from '../fileHelper.js';

export async function main4() {
    const fileData = (await readFileForDay(4));

    const cols = fileData[0].length;
    const rows = fileData.length;

    const numTotal = countMatches(fileData, cols, rows, xmasMatches);
    const numXMAS = countMatches(fileData, cols, rows, xMASMatches);

    console.log('4A', numTotal);
    console.log('4B', numXMAS);
    console.log('--------')
}

function countMatches(fileData: string[], cols: number, rows: number, matches: string[][]) {
    let count = 0;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            for (const match of matches) {
                if (isMatch(fileData, cols, rows, i, j, match)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function isMatch(fileData: string[], cols: number, rows: number, c: number, r: number, match: string[]) {
    if (match.length + r > rows || match[0].length + c > cols) {
        return false;
    }

    for (let i = 0; i < match.length; i++) {
        for (let j = 0; j < match[i].length; j++) {
            if (match[i][j] !== fileData[r + i][c + j] && match[i][j] !== '.') {
                return false;
            }
        }
    }

    return true;
}


// I would have collapsed these to save lines, but it's nice and clear like this
const xmasMatches = [
    [
        "XMAS",
    ],
    [
        "SAMX",
    ],
    [
        "X",
        "M",
        "A",
        "S",
    ],
    [
        "S",
        "A",
        "M",
        "X",
    ],
    [
        "X...",
        ".M..",
        "..A.",
        "...S",
    ],
    [
        "...X",
        "..M.",
        ".A..",
        "S...",
    ],
    [
        "...S",
        "..A.",
        ".M..",
        "X...",
    ],
    [
        "S...",
        ".A..",
        "..M.",
        "...X",
    ],
];

const xMASMatches = [
    [
        "M.M",
        ".A.",
        "S.S"
    ],
    [
        "S.S",
        ".A.",
        "M.M"
    ],
    [
        "M.S",
        ".A.",
        "M.S"
    ],
    [
        "S.M",
        ".A.",
        "S.M"
    ],
]
