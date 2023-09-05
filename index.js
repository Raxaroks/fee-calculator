const { inqMenu, pause, readInput } = require("./src/helpers/inquirer");
const { printChallengeOneOutputs } = require("./src/helpers/challenge-one");
const { printChallengeTwoOutputs } = require("./src/helpers/challenge-two");

const main = async () => {
  let opt;

  do {
    opt = await inqMenu();
    switch(opt) {
      case 1:
        printChallengeOneOutputs();
        break;
      case 2:
        printChallengeTwoOutputs();
        break;
    }

    await pause();
  } while (opt !== 3);

  console.clear();
};

main();