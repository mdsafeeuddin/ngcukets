// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// import {features} from "../e2e/src/features/**/*.feature"

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../e2e/src/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    strict: true,
    require: ['../e2e/src/steps/**/*.steps.ts'],
    format: 'json:report.json'
  },

  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },

  onPrepare() {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  },

  afterLaunch: function() {
    var reporter = require('cucumber-html-reporter');
    var options = {
      theme: 'bootstrap',
      jsonFile: 'report.json',
      output: 'report.html',
      reportSuiteAsScenarios: true,
      launchReport: true
    };
    reporter.generate(options);
  }
};
