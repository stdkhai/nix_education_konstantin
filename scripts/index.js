function task1() {

    raitingArr = []
    function isBudegete(rate, school) {
        count = 0
        minArr = []
        raitingArr.forEach(element => {
            if (!element.isSelfPayment) {
                count++
            }
        });
        if (rate >= 800 && count < 5) {
            return false
        }
        if (rate >= 800 && count == 5) {
            raitingArr.forEach(element => {
                if (!element.isSelfPayment) {
                    minArr.push(element.ratingPoint)
                }
            });
            min = Math.min(...minArr);
            if (rate > min) {
                for (let i = 0; i < raitingArr.length; i++) {
                    if (raitingArr[i].ratingPoint == min) {
                        raitingArr[i].isSelfPayment = true
                        return false
                    }

                }
            }
            if (rate == min) {
                console.log(2);
                for (let i = 0; i < raitingArr.length; i++) {
                    if (raitingArr[i].schoolPoint < school) {
                        raitingArr[i].isSelfPayment = true
                        return false

                    }
                }

            }
        }
        return true
    }
    class Student {
        constructor(enrollee) {
            this.id = raitingArr.length + 1
            this.name = enrollee.name
            this.surname = enrollee.surname
            this.ratingPoint = enrollee.ratingPoint
            this.schoolPoint = enrollee.schoolPoint
            this.isSelfPayment = isBudegete(enrollee.ratingPoint, enrollee.schoolPoint)
            raitingArr.push(this)
        };


        static listOfStudents() {
            console.log(raitingArr);
        }

    }
    new Student(studentArr[0])
    new Student(studentArr[1])
    new Student(studentArr[2])
    new Student(studentArr[3])
    new Student(studentArr[4])
    new Student(studentArr[5])
    new Student(studentArr[6])
    Student.listOfStudents()

}

function task2() {
    class CustomString {
        reverse(str) {
            console.log(str.split('').reverse().join(''));
        }

        ucFirst(str) {
            let res = str.split('');
            let m = res[0].toUpperCase();
            res[0] = m
            console.log(res.join(''));
        }

        ucWords(str) {
            let s = str.split(" ")
            for (let i = 0; i < s.length; i++) {
                let res = s[i].split('');
                let m = res[0].toUpperCase();
                res[0] = m
                s[i] = res.join('')

            }
            console.log(s.join(" "));
        }
    }
    let myString = new CustomString();

    myString.reverse('qwerty'); //выведет 'ytrewq'
    myString.ucFirst('qwerty'); //выведет 'Qwerty'
    myString.ucWords('qwerty qwrerty qwerty'); //выведет 'Qwerty Qwerty Qwerty
}

function task3() {
    class Validator{
        checkIsEmail(str){
            var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
            console.log(re.test(str)); 
        }
        checkIsDomain(str){
            var re = /^[\w-\.]+\.[a-z]{2,4}$/i;
            console.log(re.test(str)); 
        }
        checkIsDate(str){
            var re = /^[\d]{2}\.[\d]{2}\.[\d]{4}$/i;
            console.log(re.test(str)); 
        }
        checkIsPhone(str){
            let numbers = str.match(/\d{1,}/g);
            console.log(numbers[0]=="38"); 
        }
    }
    var validator = new Validator();

validator.checkIsEmail('vasya.pupkin@gmail.com'); // true
validator.checkIsDomain('google.com'); // true
validator.checkIsDate('30.11.2019'); // true
validator.checkIsPhone('+38 (066) 937-99-92'); // если код страны Украинский, то возвращаем true иначе false
}


task1()
task2()
task3()