/* task1 */
const calculate = () => {
    let sum = 0;

    return function (arg) {
        sum += arg;
        console.log(sum);
    }
}

let counter = calculate();

counter(3) // 3
counter(5) // 8
counter(228) // 236


/* task2 */

const add = () => {
    let arr = [];

    return function (arg) {
        if (arg != null) {
            arr.push(arg);
        } else {
            arr = [];
        }
        console.log(arr);
    }
}

let getUpdatedArr = add();

getUpdatedArr(3) // [3]
getUpdatedArr(5) // [3, 5]
getUpdatedArr({ name: 'Vasya' }) // [3, 5, {name: 'Vasya'}]
getUpdatedArr() // []
getUpdatedArr(4) // [4]

/* task3 */
const getSeconds = () => {
    let currentDate = 0;

    return function (ms) {
        if (currentDate == 0) {
            console.log('Enabled');

        } else {
            console.log((ms - currentDate) / 1000 + "sec");
        }
        currentDate = ms
    }
}

let getTime = getSeconds();

/* task 4 */
function padNum(num) {
    return num.toString().padStart(2, 0);
}
let timer = timeEnd => {
    if (timeEnd != null) {
        time = timeEnd
    }
    seconds = time % 60
    minutes = time / 60 % 60
    if (time <= 0) {
        clearInterval(timer);
        console.log("Timer End!");
        clearInterval(intervalId)
    } else {
        let strTimer = `${padNum(Math.trunc(minutes))}:${padNum(seconds)}`;
        console.log(strTimer);
    }
    --time;
}

let intervalId = setInterval(timer, 1000);
timer(55)

