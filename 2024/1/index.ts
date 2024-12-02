import { readFileForDay } from '../fileHelper.js';

export async function main1() {
    const fileData = await readFileForDay(1);

    const lData: number[] = [];
    const rData: number[] = [];
    fileData.map(l => l.split('   '))
        .forEach(a => { 
            lData.push(parseInt(a[0]));
            rData.push(parseInt(a[1]));
        });

    lData.sort((a, b) => a - b);
    rData.sort((a, b) => a - b);

    const v1 = lData.reduce((acc, currL, index) => acc + Math.abs(currL - rData[index]), 0);
    const v2 = lData.reduce((acc, currL) => acc + (currL * rData.filter(r => r === currL).length), 0);

    console.log('1A', v1);
    console.log('1B', v2);
    console.log('--------')
}
