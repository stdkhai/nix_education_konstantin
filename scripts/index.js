function task1() {
    const citiesAndCountries = {
        'Киев': 'Украина',
        'Нью-Йорк': 'США',
        'Амстердам': 'Нидерланды',
        'Берлин': 'Германия',
        'Париж': 'Франция',
        'Лиссабон': 'Португалия',
        'Вена': 'Австрия',
    };

    const result = [];
    for (key in citiesAndCountries) {
        result.push(key + " - это " + citiesAndCountries[key]);
    }
    console.log(result);
}

function task2() {
    function getArray() {
        const arr = [];
        const amount = 12;
        let q = 1;
        for (let i = 0; i < amount / 3; i++) {
            const arr2 = [];
            for (let j = 0; j < 3; j++) {
                arr2.push(q);
                q++;
            }
            arr.push(arr2);
        }
        console.log(arr);
    }

    getArray()
}

function task3() {
    const namesOfDays = {
        ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }
    function getNameOfDay(lang,day){
        
        console.log(namesOfDays[lang][day-1]);
        
    }
    getNameOfDay('en',7)
}
function task4(arr) {
    arr.sort(function(a, b) {
        return a - b;
      });
    console.log(arr[0]+arr[1]);
}

function task5(arr) {
    sum=0;
    for (let i = 0; i <arr.length; i++) {
        sum+=arr[i]*Math.pow(2,arr.length-1-i);
    }
    console.log(sum);
}


task1();
task2();
task3();
task4([12, 898, 899, 900]);
task5([1, 0, 1, 0, 1]);