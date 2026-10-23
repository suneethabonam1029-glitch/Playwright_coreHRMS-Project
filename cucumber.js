module.exports = {
    default: {
        paths: ["features/**/*.feature"],
        requireModule: ["tsx/cjs"],
        require: ["step-definitions/**/*.ts"],
        format: [
            "progress",
            "html:reports/cucumber-report.html",
            "allure-cucumber.js/reporter"
        ],

       formatOptions: {
       resultsDir :"allure-results" 
        }

    }

};