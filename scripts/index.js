/* task 1 */
function removeUser(arr, i) {
    arr.splice(i, 1)
}
const arr = ['Vasya', 'Petya', 'Alexey']
removeUser(arr, 1)
console.log(arr) /// ['Vasya', 'Alexey']

/* task 2 */
function getAllKeys(obj) {
    console.log(Object.keys(obj));
}
const obj = { name: 'Vasya', age: 1 }
getAllKeys(obj) /// ["name", "age"]

/* task 3 */
function getAllValues(obj) {
    console.log(Object.values(obj));
}
getAllValues(obj)

/* task 4 */
function task4() {
    function insertIntoarr(obj, i) {
        condidateArr.splice(i, 0, obj)
    }
    const obj = {
        id: 3,
        name: 'Vasya'
    }

    const secondObj = {
        id: 4,
        name: 'Katya'
    }
    insertIntoarr(obj, 2)
    console.log(condidateArr)
    /// [ {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

    insertIntoarr(secondObj, 1)
    console.log(condidateArr)
    /// [ {id: 4,name: 'Katya'}, {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

}

function task5() {
    class Condidate {
        constructor(obj) {
            this.obj = obj;
        }
        get state() {
            return console.log(this.obj["address"].split(", ")[2]);
        }
    }
    const condidate = new Condidate(condidateArr[0])
    condidate.state /// Colorado
}

function task6() {
    function getCompanyNames() {
        let result = [];

        condidateArr.forEach(element => {
            if (!result.includes(element.company) && element.company != null) {
                result.push(element.company);
            }
        });
        console.log(result);
    }
    getCompanyNames();
}

function task7() {
    function getUsersByYear(year) {
        let result = [];
        condidateArr.forEach(element => {
            if (parseInt(element.registered.split("-")[0]) == year) {
                result.push(element._id);
            }
        });
        console.log(result);
    }
    getUsersByYear(2017);
}

function task8() {
    function getCondidatesByUnreadMsg(msg) {
        let result = [];
        condidateArr.forEach(element => {
            element.greeting.split(" ").forEach(e => {
                if (parseInt(e) != null && parseInt(e) == msg) {
                    result.push(element)
                }
            });
        });
        console.log(result);
    }
    getCondidatesByUnreadMsg(8)
}

function task9() {
    function getCondidatesByGender(gender) {
        let result = [];
        condidateArr.forEach(element => {
            if (element.gender==gender) {
                result.push(element);
            }
        });
        console.log(result);
    }
    getCondidatesByGender('male') /// [Condidate, Condidate ...]
}

function task10() {
    Array.prototype.join1 = function (separator) {
        let resString = ""
        for (let i = 0; i < this.length; i++) {
            resString+=this[i];
            if (i!=this.length-1) {
                resString+=separator;
            }
        }
        return resString
    }

    Array.prototype.reduce1 = function(func, init) {
        let acc = init;
        for (const item of this) {
          acc = func(acc, item);
        }
        return acc;
    }

    const arr = [2,1,6,5]
    console.log(arr.join1(""));
   console.log(arr.reduce1(function (sum,el) {
        return sum+el;
    },0) ); 
    
}

//task4();
task5();
task6();
task7();
task8();
task9();
task10();