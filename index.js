module.exports = {
    command: 'commandname <action>',
    register: (command, modules) => {
        command.option('--option1 --option2')
            .action((action, command) => {
                //your logic goes here..
            });
    }
}