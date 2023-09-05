const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Select an option to display the outputs for each challenge.",
    choices: [
      {
        value: 1,
        name: `1) Fees`
      },
      {
        value: 2,
        name: `2) Distributions`
      },
      {
        value: 3,
        name: `3) Exit`
      },
    ]
  },
];

const inqMenu = async () => {
  console.clear();
  console.log("==================================================");
  console.log(`\t GovOS Platform Challenge - MAIN MENU `);
  console.log("===================================================\n");

  const { option } = await inquirer.prompt(questions);
  return option;
}

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ENTER to continue. . .`
    }
  ];

  console.log("\n");
  await inquirer.prompt(question);
}

const readInput = async (msg) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return "Please, enter a value . . ."
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}


module.exports = {
  inqMenu,
  pause,
  readInput,
}