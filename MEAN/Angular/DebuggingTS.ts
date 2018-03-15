var myString: string;
var myNum: number; // <---added a new number variable
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
myNum = 9; // <---used it instead



function sayHello(name: string){
   return `Hello, ${name}!`;
}
// This is working great:
console.log(sayHello("Kermit"));
// Why isn't this working? I want it to return "Hello, 9!"
console.log(sayHello("9")); //<---made 9 a string by placing in ""



function fullName(firstName: string, lastName: string, middleName: string = ""){ //<---added a default
    if (middleName) { //<---test and return accordingly, no fullName needed
        return `${firstName} ${middleName} ${lastName}`;
    } else {
        return `${firstName} ${lastName}`;
    }
}
// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
// What do I do if someone doesn't have a middle name?
console.log(fullName("Jimbo", "Jones"));




interface Student {
   firstName: string;
   lastName: string;
   belts: number;
}
function graduate(ninja: Student){
   return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
   firstName: "Christine",
   lastName: "Yang",
   belts: 2
}
const jay = {
   firstName: "Jay",
   lastName: "Patel",
   belts: 4 //<---added 's' to match key name
}
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));



class Ninja {
   fullName: string;
   constructor(
      public firstName: string,
      public lastName: string){
         this.fullName = `${firstName} ${lastName}`;
      }
   debug(){
      console.log("Console.log() is my friend.")
   }
}
// This is not making an instance of Ninja, for some reason:
const shane = new Ninja("Shane", "McCurdy"); //<---needs "new" to construct a Ninja-- also needs 2 strings
// Since I'm having trouble making an instance of Ninja, I decided to do this:
const turing = new Ninja ("Alan", "Turing") //<---switched to Ninja constructor
// Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: Ninja){
   return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}
// Now this has problems:
console.log(study(shane)); //<---also called study-shane
console.log(study(turing));




var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => x * x;
// This is not showing me what I want:
console.log(square(4));
// This is not working:
var multiply = (x,y) => x * y;
// Nor is this working:
var math = (x, y) => [(x * y), (x * y), (Math.abs(x - y))]; //<---Changed it all really




class Elephant {
    constructor(public age: number) { }
    birthday = () => { this.age++ } //<---switched to this format
}
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000)
setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 2000)
// Why didn't babar's age change?
// Fix this by using an arrow function in the Elephant class.
