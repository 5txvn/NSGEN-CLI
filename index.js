//set up the nodejs prompt
const prompt = require('prompt-sync')();
//set up chalk for terminal coloring
const chalk = require('chalk');
//set the user score and streak
let score = 0;
let streak = 0;
const times = [];
let questions = 0;

function handleCommand() {
  let command = prompt(chalk.yellow.underline("Enter a command:") + " ");
  if (command == "help") {
    console.log(`
    ${chalk.red("help")} - get a list of commands
    ${chalk.blue("generate")} - prompts the user to enter a code to ${chalk.bold("start problem generation")}
    ${chalk.green("quit")} - exits the generation and brings you back to the command interface
    ${chalk.red("code")} - lists the codes for problem generation
    ${chalk.blue("time")} - get the average time it took to answer all the problems from the session
    `)
    handleCommand()
  } else if (command == "generate") {
    let code = prompt("Enter a code: ");
    let answer = prompt(`${generateProblem(code)[0]}`)
  } else if (command == "code") {
    console.log(`
    
    `)
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

function generateProblem(code) {
  let time = 0;
  const increaseTime = setInterval(function () {time++}, 1);
  let num;
  let problem
  switch(code) {
      
    //multiplying by 11
    case "x11":
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
