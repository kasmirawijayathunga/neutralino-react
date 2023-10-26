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

console.log("Congratulations, your neutralino app is ready\n");

console.log(`
  _____                     _      _   _               _                _  _               
 |  __ \\                   | |    | \\ | |             | |              | |(_)              
 | |__) | ___   __ _   ___ | |_   |  \\| |  ___  _   _ | |_  _ __  __ _ | | _  _ __    ___  
 |  _  / / _ \\ / _\` | / __|| __|  | . \` | / _ \\| | | || __|| '__|/ _\` || || || '_ \\  / _ \\ 
 | | \\ \\|  __/| (_| || (__ | |_   | |\\  ||  __/| |_| || |_ | |  | (_| || || || | | || (_) |
 |_|  \\_\\___| \\__,_| \\___| \\__|  |_| \\_| \\___| \\__,_| \\__||_|   \\__,_||_||_||_| |_| \\___/ 
                                                 
 \n\n`);

console.log(`Happy coding! 🚀\n`)

console.log(`cd ${repoName} && npm run dev`);