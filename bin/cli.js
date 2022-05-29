#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {stdio: 'inherit'})
    } catch (err) {
        console.error(`Failed to execute ${command}`,err);
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/kasmirawijayathunga/neutralino-react.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log("Cloning into repository");
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log("Congratulations, your neutralino app is ready");
console.log(`cd ${repoName}`);
console.log(`npm run dev`);