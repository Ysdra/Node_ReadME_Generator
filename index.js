//Node.js Modules

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//Inquirer Array For User Inputs

const userData = () =>
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'github',
            message: "What is  your Github username?",
            //This is a placeholder response if a user does not have a Github account 
            default: "I don't have a Github account."
        },
        {
            type: 'input',
            name: 'githubProfile',
            message: "What is your Github profile URL?",
            // This is a placeholder response if a user does not have a Github profile they can link 
            default: "I don't have a Github profile."
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your email address?"
        },
        {
            type: 'input',
            name: 'title',
            message: "What is the name of the project you are creating?",
            validate: function (answer) {
                if (answer.length < 5) {
                    return console.log("That answer is too short, please input a minimum of 5 chracters for your project's name.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: "Please provide a brief description of the project you are working on.",
            validate: function (answer) {
                if (answer.length < 5) {
                    return console.log("That answer is too short, please input a minimum of 5 characters for your project's description.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'installationGuide',
            message: "Please input a guide to install your project.",
            validate: function (answer) {
                if (answer.length < 5) {
                    return console.log("That answer is too short, please input a minimum of 5 characters for your installation guide.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'userInstructions',
            message: "This provides users a guide on how to properly use your application."
        },
        {
            type: "list",
            name: "licenseTypes",
            message: "Please choose a license type for your project.",
            choices: [
                "Apache license",
                "GPL license",
                "GNU license",
                "MIT license",
                "N/A"
            ]
        },
        {
            type: 'input',
            name: 'collaborators',
            message: "Please list any collaborators that aided in the design, production, testing, etc. of this project.",
            default: "You are the sole creator of this given project (go out and treat yourself to something nice)."
        },
        {
            type: 'input',
            name: 'comments',
            message: "Please input any comments that you would like your users to know about in terms of useability.",
            default: "No comments were added. It is highly encouraged you add some anyways."
        },
        {
            type: 'input',
            name: 'tests',
            message: "List any tests that were conducted during the project's development or afterwards during QA testing.",
            default: "This project has not been tested! What a mad lad/lass you are!"
        }
    ]);

const readme = (answers) => {
    
    
    return `

# Title

${answers.title}

## Table of Contents 
* [Installation](#installation)
​
* [User's Guide](#user's Guide)
​
* [Licenses](#licenses)
​
* [Collaborators](#collaborators)
​
* [Comments](#comments)
​
* [Tests](#tests)

## Description

${answers.description}

## Installation

${answers.installationGuide}

## User's Guide

${answers.userInstructions}

## Licenses 

${answers.licenseTypes}

## Collaborators

${answers.collaborators}

## Comments

${answers.comments}

## Tests 

${answers.tests}

## Contact The Creator 

1. Github: ${answers.github}
1. Github Profile URL: ${answers.githubProfile}
1. Email: ${answers.email}`

}

// Starts the README Program 

userData()
    .then((answers) => writeFileAsync("README.md", readme(answers)))
    .catch((err) => console.error(err));

