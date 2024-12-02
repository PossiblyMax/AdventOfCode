import * as fs from 'fs';

export async function main1() {
    const fileData = await fs.readFileSync('./1/1-sample.txt', 'utf-8');
    // const fileData = await fs.readFileSync('./1/1-input.txt', 'utf-8');

    const lData: number[] = [];
    const rData: number[] = [];
    fileData.split('\n').map(l => l.split('   ')).forEach(a => { 
        const lVal = parseInt(a[0]);
        if (!Number.isNaN(lVal))
            lData.push(lVal);

        const rVal = parseInt(a[1]);
        if (!Number.isNaN(rVal))
            rData.push(rVal);
    });

    lData.sort((a, b) => a - b);
    rData.sort((a, b) => a - b);

    const v1 = lData.reduce((acc, currL, index) => acc + Math.abs(currL - rData[index]), 0);
    const v2 = lData.reduce((acc, currL) => acc + (currL * rData.filter(r => r === currL).length), 0);

    console.log('1A', v1);
    console.log('1B', v2);
    console.log('--------')
}
