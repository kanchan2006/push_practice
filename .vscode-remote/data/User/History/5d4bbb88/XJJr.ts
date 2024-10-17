export function avg(a: number, b: number): number {
    return (a + b) / 2;
}

const salesOnDay1 = 10;
const salesOnDay2 = 13;
const averageFor1And2 = avg(salesOnDay1, salesOnDay2);

const salesOnDay3 = 21;
const salesOnDay4 = 15;
const averageFor3And4 = avg(salesOnDay3, salesOnDay4);

const salesOnDay5 = 35;
const salesOnDay6 = 50;
const averageFor5And6 = avg(salesOnDay5, salesOnDay6);
