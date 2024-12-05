import { readFileForDay } from '../fileHelper.js';

export async function main5() {
    const fileData = (await readFileForDay(5));

    const pageRulesInitial: number[][] = fileData.filter(l => l.includes('|'))
        .map(l => l.split('|').map(v => parseInt(v)));
    const updates = fileData.filter(l => l.includes(','))
        .map(l => l.split(',').map(v => parseInt(v)));

    const beforeRules: { [key: number]: number[] } = {};
    pageRulesInitial.forEach(r => {
        if (!beforeRules[r[0]]) {
            beforeRules[r[0]] = [];
        }
        beforeRules[r[0]].push(r[1]);
    });

    const incorrectUpdates: number[][] = [];
    let numberAdded = 0;
    updates.forEach(u => {
        if (isCorrect(beforeRules, u)) {
            numberAdded += u[Math.floor(u.length / 2)];
        } else {
            incorrectUpdates.push(u);
        }
    });

    let numberFixed = 0;
    incorrectUpdates.forEach(u => {
        let fixed = [...u];
        for (let i = 0; i < fixed.length; i++) {
            for (let j = i; j < fixed.length; j++) {
                const checkPage = fixed[j];
                const sl = fixed.slice(j + 1);
                if (sl.every(otherPage => beforeRules[checkPage]?.includes(otherPage))) {
                    fixed[j] = fixed[i];
                    fixed[i] = checkPage;
                    break;
                }
            }
        }

        numberFixed += fixed[Math.floor(fixed.length / 2)];
    });

    console.log('5A', numberAdded);
    console.log('5B', numberFixed);
    console.log('--------')
}


function isCorrect(beforeRules: { [key: number]: number[] }, updates: number[]) {
    for (let i = 0; i < updates.length; i++) {
        const page = updates[i];
        for (let j = i + 1; j < updates.length; j++) {
            const otherPage = updates[j];
            if (beforeRules[otherPage]?.includes(page)) {
                return false;
            }
        }
    }

    return true;
}
