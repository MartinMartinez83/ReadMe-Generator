const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

const questions = [
    {
        type: "input",
        name: "title",
        message: "What's the project title?"
    },
    {
        type: "input",
        name: "description",
        message: "Provide project's description",
    },
    {
        type: "input",
        name: "installation",
        message: "Provide the installation instructions",
    },
    {
        type: "input",
        name: "Usage",
        message: "Provide project usage", 
    },
    {
        type: "input",
        name: "badge",
        message: "Provide the badge link"
    },
    {
        type: "input",
        name: "License",
        message: "Provide project license", 
    },
    {
        type: "input",
        name: "Contributing",
        message: "Who is contributing", 
    },
    {
        type: "input",
        name: "Test",
        message: "Provide project test", 
    },
    {
        type: "input",
        name: "UserName",
        message: "Provide github username", 
    },
    {
        type: "input",
        name: "repo",
        message: "Provide repo link", 
    },

];

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("New README file created with success!");
          });
        });

});

function init() {

}

init();