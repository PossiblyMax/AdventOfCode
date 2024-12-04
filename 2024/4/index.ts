import { readFileForDay } from '../fileHelper.js';

export async function main4() {
    const fileData = (await readFileForDay(4));

    const cols = fileData[0].length;
    const rows = fileData.length;

    const numHorizontal = countHorizontal(fileData, cols);
    const numVertical = countVertical(fileData, cols, rows);
    const numDiagonal = countDiagonal(fileData, cols, rows);

    const numTotal = numHorizontal + numVertical + numDiagonal;
    const numXMAS = countXMAS(fileData, cols, rows);

    console.log('4A', numTotal);
    console.log('4B', numXMAS);
    console.log('--------')
}

function countHorizontal(fileData: string[], cols: number) {
    let count = 0;
    fileData.forEach(row => {
        for (let i = 0; i < cols - 3; i++) {
            if (row[i] === 'X' && row[i + 1] === 'M' && row[i + 2] === 'A' && row[i + 3] === 'S') {
                count++;
            }
        }

        for (let i = 3; i < cols; i++) {
            if (row[i] === 'X' && row[i - 1] === 'M' && row[i - 2] === 'A' && row[i - 3] === 'S') {
                count++;
            }
        }
    });

    return count;
}

function countVertical(fileData: string[], cols: number, rows: number) {
    let count = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 3; j++) {
            if (fileData[j][i] === 'X' && fileData[j + 1][i] === 'M' && fileData[j + 2][i] === 'A' && fileData[j + 3][i] === 'S') {
                count++;
            }
        }

        for (let j = 3; j < rows; j++) {
            if (fileData[j][i] === 'X' && fileData[j - 1][i] === 'M' && fileData[j - 2][i] === 'A' && fileData[j - 3][i] === 'S') {
                count++;
            }
        }
    }

    return count;
}


/*
Diagonals:
  0     3     6     9
0 X 0 0 X 0 0 X 0 0 X 
  0 M M 0 0 0 0 M M 0 
  0 A A 0 0 0 0 A A 0 
3 X 0 0 S 0 0 S 0 0 S
  0 0 0 0 0 0 0 0 0 0 
  0 0 0 0 0 0 0 0 0 0 
6 X 0 0 S 0 0 S 0 0 S 
  0 M A 0 0 0 0 A A 0
  0 M A 0 0 0 0 M M 0 
9 X 0 0 S 0 0 X 0 0 X
*/
function countDiagonal(fileData: string[], cols: number, rows: number) {
    let count = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Check for going down and right
            if (i < cols - 3 && j < rows - 3) {
                if (fileData[j][i] === 'X' && fileData[j + 1][i + 1] === 'M' && fileData[j + 2][i + 2] === 'A' && fileData[j + 3][i + 3] === 'S') {
                    count++;
                }
            }

            // Check for going down and left
            if (i >= 3 && j < rows - 3) {
                if (fileData[j][i] === 'X' && fileData[j + 1][i - 1] === 'M' && fileData[j + 2][i - 2] === 'A' && fileData[j + 3][i - 3] === 'S') {
                    count++;
                }
            }

            // Check for going up and right
            if (i < cols - 3 && j >= 3) {
                if (fileData[j][i] === 'X' && fileData[j - 1][i + 1] === 'M' && fileData[j - 2][i + 2] === 'A' && fileData[j - 3][i + 3] === 'S') {
                    count++;
                }
            }

            // Check for going up and left
            if (i >= 3 && j >= 3) {
                if (fileData[j][i] === 'X' && fileData[j - 1][i - 1] === 'M' && fileData[j - 2][i - 2] === 'A' && fileData[j - 3][i - 3] === 'S') {
                    count++;
                }
            }
        }
    }

    return count;
}

// I would have collapsed these to save lines, but it's nice and clear like this
const matches = [
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
function countXMAS(fileData: string[], cols: number, rows: number) {
    let count = 0;
    for (let i = 0; i < cols - 2; i++) {
        for (let j = 0; j < rows - 2; j++) {
            for (const match of matches) {
                if (isMatch(fileData, i, j, match)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function isMatch(fileData: string[], c: number, r: number, match: string[]) {
    return fileData[r][c] === match[0][0] && fileData[r][c+2] === match[0][2]
                    && fileData[r+1][c+1] === match[1][1]
        && fileData[r+2][c] === match[2][0] && fileData[r+2][c+2] === match[2][2]
}
