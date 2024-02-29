//set up the nodejs prompt
const prompt = require('prompt-sync')();
//set up chalk for terminal coloring
const chalk = require('chalk');
//set the user score and streak
let score = 0;
let streak = 0;
const times = [];
let questions = 0;
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
      
      ${chalk.bold("Memorization Tricks")}
      ▪️ ${chalk.blue("squares")} - Generate some squares 1-40 to answer
      ▪️ ${chalk.blue("cubes")} - Generate some cubes 1-20 to answer
      ▪️ ${chalk.blue("fractions")} - Generate some fractions 1/2 - 1/12 to convert to decimals
      
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
    console.log(totalTime / questions);
    handleCommand();
  } else {
    console.log("Invalid command");
    handleCommand()
  }
}

//call the command handler for the first time
handleCommand()

function generateNum(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function generateRawProblem(num, string, equation) {
  problem = prompt(string);
  if (problem == equation) {
    score++
    streak++
    console.log(`Correct, your score is ${score}, and you streak is ${streak}`);
    times.push(time);
    clearInterval(increaseTime);
    questions++;
    generateProblem(code)
  } else if (problem == "quit") {
    handleCommand()
  } else {
    streak = 0;
    console.log(`Incorrect! The answer is ${num*11}, and your streak has been reset`);
    times.push(time);
    clearInterval(increaseTime);
    questions++;
    generateProblem(code)
  }
}

function generateProblem(code) {
  let time = 0;
  const increaseTime = setInterval(function () {time++}, 1);
  let num;
  let problem
  switch(code) {
      
    //multiplying by 11
    case "x11":
      /*
      num = generateNum(10, 10000);
      problem = prompt(`${num} x 11 = `);
      if (problem == num*11) {
        score++
        streak++
        console.log(`Correct, your score is ${score}, and you streak is ${streak}`);
        times.push(time);
        clearInterval(increaseTime);
        questions++;
        generateProblem(code)
      } else if (problem == "quit") {
        handleCommand()
      } else {
        streak = 0;
        console.log(`Incorrect! The answer is ${num*11}, and your streak has been reset`);
        times.push(time);
        clearInterval(increaseTime);
        questions++;
        generateProblem(code)
      }
      */
      num = generateNum(10, 10000);
      generateRawProblem(num, `${num} x 11 = `, num*11);
      break;
      
    //multiplying by 12
    case "x12":
      num = generateNum(10, 1000);
      problem = prompt(`${num} x 12 = `);
      if (problem == num*12) {
        score++
        streak++
        console.log(`Correct, your score is ${score}, and you streak is ${streak}`);
      } else {
        streak = 0;
        console.log(`Incorrect! The answer is ${num*12}, and your streak has been reset`);
      }
      generateProblem(code)
      break;
      
    default:
      console.log("Invalid code, try again")
      handleCommand()
  }
}
