//set up the nodejs prompt
const prompt = require('prompt-sync')();
//set up chalk for terminal coloring
const chalk = require('chalk');
//set the user score and streak
let score = 0;
let streak = 0;
let times = [];
console.log(chalk.bold("Welcome to NSGENv1.0.0: Type help for a list of commands"))

function handleCommand() {
  let command = prompt("Enter a command: ");  
  //help command
  if (command == "help") {
    console.log(`
      ${chalk.red("help")} - get a list of commands
      ${chalk.blue("generate")} - prompts the user to enter a code to ${chalk.bold("start problem generation")}
      ${chalk.green("quit")} - exits the generation and brings you back to the command interface
      ${chalk.red("codes")} - lists the codes for problem generation
      ${chalk.blue("time")} - get the average time it took to answer all the problems from the session
      ${chalk.green("cleartimes")} - clears all recorded times for problems
    `)
    handleCommand()
  } 
  //generation command
  else if (command == "generate") {
    let code = prompt("Enter a code: ");
    let answer = prompt(`${generateProblem(code)[0]}`)
  } 
  //list codes command
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
    times.forEach(time => {
      totalTime += time
    });
    if (times.length == 0) {
      console.log("You have not completed any problems yet!")
    } else {
      console.log(`Your average time per question is ${chalk.bold(Math.round(totalTime / times.length) / 1000)} seconds`)
    }
    handleCommand();
  } else if (command == "cleartimes") {
    times = []
    console.log("Times cleared!");
    handleCommand();
  }
  
  else {
    console.log("Invalid command, type help for list of valid commands");
    handleCommand()
  }
}

//call the command handler for the first time
handleCommand()

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

function generateRawProblem(numParams, string, equation) {
  let num = generateNum(numParams[0], numParams[1], numParams[2])
  let time = Date.now()
  problem = prompt(string.replace("num", num));
  if (problem == eval(equation.replace("num", num))) {
    score++
    streak++
    console.log(`${chalk.green.bold("Correct!")} Your score is ${chalk.green.bold(score)}, and you streak is ${chalk.yellow.bold(streak)}`);
    times.push(Date.now() - time);
    generateRawProblem(numParams, string, equation)
  } else if (problem == "quit") {
    handleCommand()
  } else {
    streak = 0;
    console.log(`${chalk.red.bold("Incorrect!")} The answer is ${eval(equation.replace("num", num))}, and your streak has been reset`);
    times.push(Date.now() - time);
    generateRawProblem(numParams, string, equation)
  }
}

function generateProblem(code) {
  let num;
  let problem
  switch(code) {
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
    //remainder problem generation
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
      
    default:
      console.log("Invalid code, try again")
      handleCommand()
  }
}
