function task1() {
    for (let i = 1; i <= 10; i++) {
        switch (i % 2) {
            case 0:
                console.log("Fiz");
                break;
            case 1:
                if (i % 3 == 0) {
                    console.log("FizBuz");
                } else {
                    console.log("Buz");
                }

                break;
            default:

                break;
        }
    }
}
function task2() {
    console.log("Логика нахождения факториала числа 10:");
    res = "10=";
    fact = 1;
    for (let index = 10; index != 0; index--) {
        res += index + "*";
        fact *= index;
    }
    console.log(res + "=" + fact);
}

function task3() {
    const sheetsInReamPaper = 500;
    const consumptionPerWeek = 1200;
    const weeksAmount = 8;
    a = consumptionPerWeek * weeksAmount;

    res = delNoOst(a, sheetsInReamPaper);
    if (a % sheetsInReamPaper != 0) {
        res++;
    }
    console.log(res + " пачек");

}

function delNoOst(x, y) {
    return ((x - x % y) / y);
}

function task4(roomNumber) {
    const roomsOnFloor = 3;
    const floors = 9;
    pod = delNoOst(roomNumber, roomsOnFloor * floors);
    floor = delNoOst(roomNumber % (roomsOnFloor * floors), roomsOnFloor)
    console.log(pod + 1 + " podyezd");
    console.log(floor + 1 + " floor");

}
function task5(count) {
    for (let i = 0; i < count; i++) {
        space = "";
        piramid = "";
        for (j = 0; j < count - i; j++) space += " ";
        for (j = 0; j < 2 * i + 1; j++) piramid += "#";
        console.log(space + piramid);

    }
}
task1();
task2();
task3();
task4(277);
task5(10);