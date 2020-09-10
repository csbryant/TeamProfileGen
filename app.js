const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const employees = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is your role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(function(job) {
        if (job.role === "Manager") {
            inquirer.prompt([
                {
                    message: "What is your name?",
                    name: "name"
                },
                {
                    message: "What is your ID?",
                    name: "id"
                },
                {
                    message: "What is your email?",
                    name: "email"
                },
                {
                message: "What is your office number?",
                name: "office"
                }
            ]).then(function (addMan) {
                var newManager = new Manager(addMan.name, addMan.id, addMan.email, addMan.office);
                console.log(newManager);
                employees.push(newManager);
                complete();
            });
        } else if (job.role === "Engineer") {
            inquirer.prompt([
                {
                    message: "What is your name?",
                    name: "name"
                },
                {
                    message: "What is your ID?",
                    name: "id"
                },
                {
                    message: "What is your email?",
                    name: "email"
                },
                {
                message: "What is your github username?",
                name: "github"
                }
            ]).then(function (addEng) {
                var newEngineer = new Engineer(addEng.name, addEng.id, addEng.email, addEng.github);
                console.log(newEngineer);
                employees.push(newEngineer);
                complete();
            });
        } else if (job.role === "Intern") {
            inquirer.prompt([
                {
                    message: "What is your name?",
                    name: "name"
                },
                {
                    message: "What is your ID?",
                    name: "id"
                },
                {
                    message: "What is your email?",
                    name: "email"
                },
                {
                message: "Where did you graduate school?",
                name: "school"
                }
            ]).then(function (addInt) {
                var newIntern = new Intern(addInt.name, addInt.id, addInt.email, addInt.school);
                console.log(newIntern);
                employees.push(newIntern);
                complete();
            });
        }
    })
}

function generateHTML() {
    console.log(employees)
}

function complete() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to add another Team Member?",
            name: "addanother"
        }
    ]).then(function(add) {
        if (add.addanother) {
            addEmployee()
        } else {
            console.log(employees);
            var employeeHtml = render(employees);
            fs.writeFile(outputPath, employeeHtml, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success!");
            });
        }
    });
}









// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



addEmployee();