// FACTORY FUNCN TO CREATE FUNN. NOT THAT EFFIECIENT COZ IT SENDS COPY OF THE OBJ WHICH MEANS ALWAYS TALK FUNCN IS STORED IN DIFFERENT MEMORY FOR DIFFERENT ONJECTS
// TO OVERCOME THIS WE SUE NEW OPERATOR 
// function PersonMaker(name,age){
//     const person={
//         name:name,
//         age:age,
//         talk(){
//             console.log(`telling my name is ${this.name}`);      
//         }
//     }
//     return person;
// }
// let p1= PersonMaker("adam,12");
// let p2=PersonMaker("stece",23);

// New operaotr using constructor- doesn;t retuen anything and start with capital letter for convenience
// function Person(name,age){
//     this.name=name;
//     this.age=age;
// }

//     Person.prototype.talk = function(){
//         console.log(`hi, this side ${this.name} `);
        
//     }
// let p1=new Person("adam,12");
// let p2= new Person("stece",23);

// classes are a template for creating object, similar to new operator using constructor but syntax is simple.
// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
//     talk(){
//         console.log(`hi, this is ${this.name}`);
        
//     }
// }
// let p1= new Person("adam",67);
// let p2=new Person("eve",45);

// INHERITANCE: mechanism that allows us to create new classes on the basis of already existing class i.e. child classes use properties of parent class using keyword extends with parent class 
// parent class:parent child class: Student and Teacher
class Person{
    constructor(name,age){
        this.name=name;
        this.age= age;
    }
 talk(){
        console.log(`Hi, my name is: ${this.name}`);   
    }
}
class Student extends Person{
    constructor(name, age,marks){
 // calling parent constructor Person for student class using super keyword
        super(name,age);
        this.marks=marks;
    }
}
    let s1= new Student("Ram",19,78);

class Teacher extends Person{
    constructor(name, age,subject){
// calling parent constructor Person for student class using super keyword
        super(name,age);
        this.subject=subject;
    } 
}
    let t1= new Teacher("Madhuri",25,"English");
