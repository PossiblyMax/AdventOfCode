import * as fs from 'fs';

export async function readFileForDay(day: number) {
    const inputFilename = `./${day}/input.txt`;
    const sampleFilename = `./${day}/sample.txt`;

    const filename = fs.existsSync(inputFilename) ? inputFilename : sampleFilename;
    const fileData = await fs.readFileSync(filename, 'utf-8');

    return fileData.split('\n')
        .filter(l => l.trim().length > 0);
}
