function task1() {
    const employeeObj = new Emploee(emplyeeArr[1]);

function Emploee(e) {
    this.id=e.id;
    this.name=e.name;
    this.surname=e.surname;
    this.salary=e.salary;
    this.workExperience=e.workExperience;
    this.isPrivileges=e.isPrivileges;
    this.gender=e.gender;

}
}

function task2() {
    function Emploee(e) {
        this.id=e.id;
        this.name=e.name;
        this.surname=e.surname;
        this.salary=e.salary;
        this.workExperience=e.workExperience;
        this.isPrivileges=e.isPrivileges;
        this.gender=e.gender;
    }
    Emploee.prototype.getFullName=function() {
        return `${this.surname} ${this.name}`
    };
    const employeeObj = new Emploee(emplyeeArr[0]);
    console.log(employeeObj.getFullName());
}

function task3() {
    function Emploee(e) {
        this.id=e.id;
        this.name=e.name;
        this.surname=e.surname;
        this.salary=e.salary;
        this.workExperience=e.workExperience;
        this.isPrivileges=e.isPrivileges;
        this.gender=e.gender;
    }
    let createEmployesFromArr = (arr) => {
        let newArr=[];
        arr.forEach(element => {
           
            newArr.push(new Emploee(element));
        });
        return newArr;
    };
    const emplyeeConstructArr = createEmployesFromArr(emplyeeArr);
    console.log(emplyeeConstructArr[1]);
    task4(emplyeeConstructArr);
    task5(emplyeeConstructArr);
    task6(emplyeeConstructArr);
    
}

function task4(emplyeeConstructArr) {
    const getFullNamesFromArr = (arr) => {
        let newArr=[];
        arr.forEach(element => {
            newArr.push(element.name+' '+element.surname);
        });
        console.log(newArr);
 }
        
 getFullNamesFromArr(emplyeeConstructArr) /// ['Денис Хрущ', 'Сергей Войлов', ... ]
}

function task5(emplyeeConstructArr) {
    const getMiddleSalary = (arr) => {
        let sum=0;
        arr.forEach(element => {
            sum+=element.salary
        });
        console.log('Average='+(sum/arr.length));
 }
 
 getMiddleSalary(emplyeeConstructArr) /// 1560
}

function task6(emplyeeConstructArr) {
    const getRandomEmployee = (arr) => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          i=getRandomInt(arr.length)
          console.log(arr[i]);
        }
        
        getRandomEmployee(emplyeeConstructArr) 
}






task1();
task2();
task3();