#!/usr/bin/env node
const prompts = require('prompts');
const {execSync} = require('child_process');
const { red, blue, cyan, yellow, green } = require('picocolors');
const os = require('os')
const fs = require('fs/promises')
const path = require('path')

const runCommand = (command) => {
    try {
        execSync(`${command}`, {stdio: 'inherit'})
    } catch (err) {
        console.error(`Failed to execute ${command}`,err);
        return false;
    }
    return true;
}

const Initialize = async (repoName) => {
    if(!repoName){
        const { reponame } = await prompts(
            {
                type: 'text',
                name: 'reponame',
                message: `What is your project named?`,
                initial: 'my-app',
                active: 'Yes',
                inactive: 'No',
            },
            {
                onCancel: () => {
                    console.error('Exiting.');
                    process.exit(1);
                },
            }
        )
        repoName = reponame.trim();
    }

    if(!repoName){
        console.error(red('Please specify the project name'));
        process.exit(-1);
    } else {

        const root = path.resolve(repoName)

        const { typescript } = await prompts(
            {
                type: 'toggle',
                name: 'typescript',
                message: `Would you like to use ${blue('typescript')}?`,
                initial: false,
                active: 'Yes',
                inactive: 'No',
            },
            {
                onCancel: () => {
                    console.error('Exiting.');
                    process.exit(1);
                },
            }
        )
    
        const packageJson = {
            name: repoName,
            version: "0.1.0",
            "description": "Neutralinojs app with reactjs",
            "author": "",
            "license": "MIT",
            scripts: {
                "dev": "concurrently --kill-others \"cross-env BROWSER=none npm run dev-react\" \"npm run dev-neu\"",
                "dev-react": "react-scripts start",
                "dev-neu": "wait-on http://localhost:3000 && neu run --frontend-lib-dev -- --window-enable-inspector",
                "prestart": "react-scripts build",
                "start": "neu run",
                "prebuild": "react-scripts build",
                "build": "neu build"
            },
            dependencies: {
                "@neutralinojs/lib": "^5.2.0",
                "@testing-library/jest-dom": "^6.4.6",
                "@testing-library/react": "^16.0.0",
                "@testing-library/user-event": "^14.5.2",
                "react": "^18.3.1",
                "react-dom": "^18.3.1",
                "react-scripts": "^5.0.1",
                "web-vitals": "^4.2.0"
            },
            devDependencies: {
                "concurrently": "^8.2.1",
                "cross-env": "^7.0.3",
                "wait-on": "^7.0.1"
            },
            "eslintConfig": {
                "extends": [
                  "react-app",
                  "react-app/jest"
                ]
            },
            "browserslist": {
                "production": [
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ],
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ]
            },
            "repository": {
                "type": "",
                "url": ""
            }
        };

        if (typescript) {
            packageJson.devDependencies = {
                ...packageJson.devDependencies,
                "typescript": "^4.4.2",
                "@types/jest": "^27.0.1",
                "@types/node": "^16.7.13",
                "@types/react": "^18.0.0",
                "@types/react-dom": "^18.0.0",
            };
        }

        let gitCheckoutCommand = `git clone https://github.com/kasmirawijayathunga/neutralino-react-js.git ${repoName}`;
        if(typescript){ gitCheckoutCommand = `git clone https://github.com/kasmirawijayathunga/neutralino-react-typescript.git ${repoName}`; }
        const checkedOut = runCommand(gitCheckoutCommand);
        if(!checkedOut) process.exit(-1);

        await fs.writeFile(
            path.join(root, 'package.json'),
            JSON.stringify(packageJson, null, 2) + os.EOL
        )

        const installDepsCommand = `cd ${repoName} && npm install`;
        console.log(`Installing dependencies`);
        const installedDeps = runCommand(installDepsCommand);
        if(!installedDeps) process.exit(-1);

        console.clear();
        
        console.log(green("Congratulations, your neutralino app is ready\n"));

console.log(yellow(`
  _   _               _____                     _   
 | \\ | |             |  __ \\                   | |  
 |  \\| |  ___  _   _ | |__) | ___   __ _   ___ | |_ 
 | . \` | / _ \\| | | ||  _  / / _ \\ / _\` | / __|| __|
 | |\\  ||  __/| |_| || | \\ \\|  __/| (_| || (__ | |_ 
 |_| \\_| \\___| \\__,_||_|  \\_\\\\___| \\__,_| \\___| \\__|
`));

        console.log(`We suggest that you begin by typing:\n`);
        console.log(`${cyan('cd')} ${repoName}`);
        console.log(`${cyan('npm')} run dev\n`);
        console.log(`Happy coding! 🚀\n\n`)


    }
}

Initialize(process.argv[2]);