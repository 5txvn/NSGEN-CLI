 //import nodejs prompt lib
const prompt = require('prompt-sync')();
//import chalk for terminal coloring
const chalk = require('chalk');
//set the user score, streak, and array of times per question
let score = 0;
let streak = 0;
let times = [];
//welcome message
console.log(chalk.bold("Welcome to NSGENv1.0.0: Type help for a list of commands"))

//function to handle command inputs from users
function handleCommand() {
  let command = prompt("Enter a command: ");  
  //help command
  if (command == "help") {
    console.log(`
      ${chalk.red("help")} - get a list of commands
      ${chalk.blue("generate")} - prompts the user to enter a code to start problem generation
      ${chalk.green("quit")} - exits the generation and brings you back to the command interface
      ${chalk.red("codes")} - lists the codes for problem generation
      ${chalk.blue("time")} - get the average time it took to answer all the problems from the session
      ${chalk.green("cleartimes")} - clears all recorded times for problems
    `)
    handleCommand()
  } 
  //problem generation command
  else if (command == "generate") {
    //ask user for generation code and generate problem
    let code = prompt("Enter a code: ");
    generateProblem(code)
  } 
  //command to list all the codes for problem generation
  else if (command == "codes") {
    console.log(`
      ${chalk.bold("Multiplication Tricks")}
      ▪️ ${chalk.red("x11")} - Generate a multiplying by 11 trick
      ▪️ ${chalk.red("x12")} - Generate a multiplying by 12 trick
      ▪️ ${chalk.red("x15")} - Generate a multiplying by 15 trick
      ▪️ ${chalk.red("x25")} - Generate a multiplying by 25 trick
      ▪️ ${chalk.red("x37")} - Generate a multiplying by 37 trick
      ▪️ ${chalk.red("x50")} - Generate a multiplying by 50 trick
      ▪️ ${chalk.red("x75")} - Generate a multiplying by 75 trick
      
      ${chalk.bold("Remainder Tricks")}
      ▪️ ${chalk.green("r2")} - Generate a problem to find remainder dividing by 2
      ▪️ ${chalk.green("r3")} - Generate a problem to find remainder dividing by 3
      ▪️ ${chalk.green("r4")} - Generate a problem to find remainder dividing by 4
      ▪️ ${chalk.green("r5")} - Generate a problem to find remainder dividing by 5
      ▪️ ${chalk.green("r8")} - Generate a problem to find remainder dividing by 8
      ▪️ ${chalk.green("r9")} - Generate a problem to find remainder dividing by 9
      ▪️ ${chalk.green("r10")} - Generate a problem to find remainder dividing by 10
      ▪️ ${chalk.green("r11")} - Generate a problem to find remainder dividing by 11
    `)
    handleCommand()
  } else if (command == "time") {
    let totalTime = 0;
    //add each time to the sum of the times to find the average
    times.forEach(time => {
      totalTime += time
    });
    //if the times array is empty, print that there are no recorded times
    if (times.length == 0) {
      console.log("You have not completed any problems yet!")
    } 
    //print average time if the array is populated
    else {
      console.log(`Your average time per question is ${chalk.bold(Math.round(totalTime / times.length) / 1000)} seconds`)
    }
    handleCommand();
  } else if (command == "cleartimes") {
    //reset the times array to clear all the recorded times
    times = []
    console.log("Times cleared!");
    handleCommand();
  }
  else {
    //handler if the user enters a command that doesn't exist
    console.log("Invalid command, type help for list of valid commands");
    handleCommand()
  }
}

//call the command handler for the first time
handleCommand()

//generate a number that also includes a divisibility parameter if a generated number needs to be divisible by a certain number, such as with the multiplying by 37 trick
function generateNum(min, max, divisibility) {
  if (!divisibility || divisibility == 0) {
    return Math.floor(Math.random() * (max-min)) + min;
  } else {
    let num = generateNum(min, max, 0)
    while (num % divisibility != 0) {
      num = generateNum(min, max, 0)
    }
    return num
  }
}

//generate the actual raw problem based off parameters that describe the mix, max, and divisibility of the number that needs to be generated, the string outputted to the user in the console when running the program, and also the equation used to evaluate whether the answer the user inputted was correct or not
function generateRawProblem(numParams, string, equation) {
  //generate the number to be used
  let num = generateNum(numParams[0], numParams[1], numParams[2])
  //set time at the start of the problem
  let time = Date.now()
  //prompt the user with a problem
  problem = prompt(string.replace("num", num));
  //handler if the user got the problem correct
  if (problem == eval(equation.replace("num", num))) {
    //increment the score and streak
    score++
    streak++
    //send message to user
    console.log(`${chalk.green.bold("Correct!")} Your score is ${chalk.green.bold(score)}, and you streak is ${chalk.yellow.bold(streak)}`);
    //add the time it took to answer the problem to the times array by subtracting the current Date.now() time from the initial time
    times.push(Date.now() - time);
    //recursive function, acts as the loop to keep the function going until the user decides to quit
    generateRawProblem(numParams, string, equation)
  } 
  //handler if the user wants to exit the loop
  else if (problem == "quit") {
    handleCommand()
  } 
  //handler if the user gets the problem wrong
  else {
    //reset streak
    streak = 0;
    //output error message to user
    console.log(`${chalk.red.bold("Incorrect!")} The answer is ${eval(equation.replace("num", num))}, and your streak has been reset`);
    //add time it took the user to answer the problem to the times array
    times.push(Date.now() - time);
    //regenerate function
    generateRawProblem(numParams, string, equation)
  }
}

//function to generate the actual problem with a case statement to define the function parameters for the generateRawProblem function based off the code that the user inputted;
function generateProblem(code) {
  //case statement to handle the different codes that the user can input
  switch(code) {
    //problem generation for the multiplication problems
    case "x11":
      generateRawProblem([10, 10000, 0], "num x 11 = ", "num*11");
      break;
    case "x12":
      generateRawProblem([10, 1000, 0], "num x 12 = ", "num*12");
      break;
    case "x15":
      generateRawProblem([20, 100, 0], "num x 15 = ", "num*15");
      break;
    case "x25":
      generateRawProblem([10, 150, 0], "num x 25 = ", "num*25");
      break;
    case "x33-1/3":
      generateRawProblem([10, 200, 3], "num x 33 1/3 = ", "num/3*100");
      break;
    case "x37":
      generateRawProblem([10, 200, 3], "num x 37 = ", "num*37")
      break;
    case "x50":
      generateRawProblem([10, 150, 0], "num x 50 = ", "num*50");
      break;
    case "x75":
      generateRawProblem([10, 100, 0], "num x 75 = ", "num*75");
      break;
    //problem generation for the remainder problems
    case "r2":
      generateRawProblem([1000, 100000], "num / 2 remainder of... - ", "num%2");
      break;
    case "r3":
      generateRawProblem([1000, 100000], "num / 3 remainder of... - ", "num%3");
      break;
    case "r4":
      generateRawProblem([1000, 100000], "num / 4 remainder of... - ", "num%4");
      break;
    case "r5":
      generateRawProblem([1000, 100000], "num / 5 remainder of... - ", "num%5");
      break
    case "r8":
      generateRawProblem([1000, 100000], "num / 8 remainder of... - ", "num%8");
      break;
    case "r9":
      generateRawProblem([1000, 100000], "num / 9 remainder of... - ", "num%9");
      break;
    case "r10":
      generateRawProblem([1000, 100000], "num / 10 remainder of... - ", "num%10");
      break;
    case "r11":
      generateRawProblem([1000, 100000], "num / 11 remainder of... - ", "num%11");
      break;
    //if the code is not valid, print error message and prompt the user to re-enter a command
    default:
      console.log("Invalid code, try again")
      handleCommand()
  }
}
