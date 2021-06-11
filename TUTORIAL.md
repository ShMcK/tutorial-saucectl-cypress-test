# What You'll Learn

This is an introduction to your tutorial. It will show up on the first page when your tutorial is started.

* Learn basic JavaScript to write page objects for a Cypress test suite

* Learn to create Cypress test code  

* Learn about the components of saucectl with the Sauce Labs platform

* Set up the necessary components to run Cypress and saucectl with the Sauce Labs platform on your computer

* Understand the configuration files for Cypress on saucectl with the Sauce Labs platform and how to modify them

* Run a saucectl Cypress test with the Sauce Labs platform & Cypress test suite


## 1. Cypress Project Introduction

> This tutorial walks you through creating a very simple test against the 'Swag Labs' app at https://saucedemo.com

This course is created for the purpose of helping users understand the project structure for a Cypress test, and using this to run a test on the Sauce Labs platform using the saucectl tool. It is not intended to demonstarte best practices for writing Cypress tests. More instructions about how to write Cypress tests can be found at cypress.io. 


**Test Directories**
> Get a preview of the starting project so you understand the files and structure of your project, so you can be ready to create a very simple test against the 'Swag Labs' app.

Take a look at the project structure on the right. Open the `/cypress` directory inside you will notice:

* `/pageobjects` – This directory contains code that will help you interact with the login and shopping page on saucedemo.com

* `/integration` – This is a default directory that is used for Cypress tests. You will create a login test here with some checks to make sure the login functionality on saucedemo.com is working. 

* `support` –  This file is created with your Cypress test by default. This is the directory where actions that occur before test files runs are kept. In this example we will be using it to store Sauce Labs credentials.

* `plugins` – This file is created with your Cypress test by default, and is used if you want to manage the Node process to modify your Cypress environment.


## 2. Test File Overview
If you look in your project file, you should also notice a `cypress.json` file alongside the `/cypress` directory. This is a configuration file for your cypress test code project.

This file is used to set [all kinds of options for your Cypress test](https://docs.cypress.io/guides/references/configuration.html).

We will set the baseUrl, which is the url of the web app you are testing against.

**The Integration Directory**
Open up the `integration` directory. This is the place where the atual tests against an application are stored in a Cypress test project.

It's important to keep the tests in this directory as you will need tests to be here when you use saucectl to run tests on Sauce Labs later on.

Notice there is just one test object in this directory, called `login.spec.js`. This will contain the code that runs the `it()` statements that will test the functionality of the [login flow](https://www.saucedemo.com/).

**The Pageobjects Directory**
Open up the pageobjects directory and notice there are two files:
* `LoginPage.js` – Code for interacting with the [Swag Labs login page]()
* `SwagOverviewPage.js` – Code for interacting with the [next page, where you can choose swag]()

In the next lessons, we will add setup the page objects, with code to interact with both of these pages.



## 3. Create Page Objects

> Create two page object files, as well as a file to store different sets of credentials to login to Swag Labs

**Cypress.json**

Inside your project file that you created, you will notice the cypress.json file. This file is used to set [all kinds of options for your Cypress test](https://docs.cypress.io/guides/references/configuration.html). If you don’t set any options, Cypress will use a set of default values. You can pull in data from this file into your tests, to make it easier to preload data in your test.

### 3.1 Add a baseUrl to cypress.json

First, you will need to add information for your tests about the URL of the app you are testing against. Add the following line to `cypress.json`, which you will use in your tests to pull in the site you are testing against.

```json
{
 "baseUrl": "https://www.saucedemo.com/v1/"
}
```

#### HINTS
- This code should be inside cypress.json

### 3.2 Add Credentials in constants.js

Next, in the `cypress/support` directory find a file called `constants.js`.

It’s good practice to store sensitive information like a username and a password in a separate file so you can use a .gitignore file to exclude it from Github repositories you will commit your project to.

Open `constants.js` and create the `const` to store different login credentials:

```js
export const LOGIN_USERS = {
};
```

Next, inside of `LOGIN_USERS` add in credentials for a user that is locked out of Swag Labs:

```js
LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce',
},
```

 Last, add user credentials inside of `LOGIN_USERS` that will allow you to login:

 ```js
STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
},
 ```

Now you can use these objects to login in your tests by calling `LOGIN_USERS.LOCKED` or `LOGIN_USERS.STANDARD`.
#### HINTS
- Final code should look like:
```js
// filename: cypress/support/constants.js
export const LOGIN_USERS = {
   LOCKED: {
       username: 'locked_out_user',
       password: 'secret_sauce',
   },
   STANDARD: {
       username: 'standard_user',
       password: 'secret_sauce',
   },
};
```

### 3.3 Locate Items on the Login Page
Open the `pageobjects` directory and add a file named: `LoginPage.js`, then open `LoginPage.js` and add the following:


In `LoginPage.js` you will create several get methods to locate elements on the page you will use in your test later on:

```js
class LoginPage {
   get screen() {
       return cy.get('#login_button_container');
   }

   get username() {
       return cy.get('#user-name');
   }

   get password() {
       return cy.get('#password');
   }

   get loginButton() {
       return cy.get('.btn_action');
   }

   get errorMessage() {
       return cy.get('[data-test="error"]');
   }

}

export default new LoginPage();
```
Since you have baseUrl specified in `cypress.json`, your tests know to visit [https://www.saucedemo.com](https://www.saucedemo.com). The first `get` method locates the div in blue below, where the other elements are found.

<img src="https://raw.githubusercontent.com/ShMcK/tutorial-saucectl-cypress-test/master/assets/TRT1.04B.png" alt="Login Page elements" width="850"/>

You can also see the ids, classes, and `data-test` element that your tests’ `get` methods use to locate other elements on the page.

### 3.4 Add a SignIn method

Next, below the get methods, add in the code to create your `signIn method`, and export the` LoginPage` class so it can be used by other classes (your test methods).

```js
// filename: cypress/pageobjects/LoginPage.js
class LoginPage {

    // ...

   signIn(userDetails) {
       const {password, username} = userDetails;

       if (username) {
           this.username.type(username);
       }
       if (password) {
           this.password.type(password);
       }

       this.loginButton.click();
   }
}
```

If you recall, in `const.js` there is a constant created called `LOGIN_USERS `which contains two objects, either `LOCKED` or `STANDARD`.

The `signIn()` method will allow you to pass either the `LOCKED` or `STANDARD` object in with the `username` and `password` values.

Later, when you call that method in your test, you will pass in the set of username and password fields from `const.js` depending on whether you call the method with `signIn(LOGIN_USERS.STANDARD)` or `signIn(LOGIN_USERS.LOCKED).`

#### HINTS
- The final `LoginPage.js` should looks like this:
```js
class LoginPage {
   get screen() {
       return cy.get('#login_button_container');
   }

   get username() {
       return cy.get('#user-name');
   }

   get password() {
       return cy.get('#password');
   }

   get loginButton() {
       return cy.get('.btn_action');
   }

   get errorMessage() {
       return cy.get('[data-test="error"]');
   }
   signIn(userDetails) {
       const {password, username} = userDetails;

       if (username) {
           this.username.type(username);
       }
       if (password) {
           this.password.type(password);
       }

       this.loginButton.click();
   }
}
```
### 3.5 Create Inventory Page Object
The page that you enter after you enter login credentials also needs to be accessed. This is known as the _Inventory_ or _Swag Labs_ page.

![Swag Overview Page](https://raw.githubusercontent.com/ShMcK/tutorial-saucectl-cypress-test/master/assets/TRT1.04C.png)

Open `SwagOverviewPage.js` and copy in the following code:

```js
get screen() {
    return cy.get('.inventory_list');
}
```

 This will go to the sauce demo page that lists the products, and search for the div that contains the list of items with an id of `inventory_list`.

 #### HINTS
 - Your `SwagOverviewPage.js` file should look like this:
 ```js
//filename: cypress/pageobjects/SwagOverviewPage.js
class SwagOverviewPage {
    get screen() {
        return cy.get('.inventory_list');
    }
}
export default new SwagOverviewPage();
```

## 4. Create a Cypress Test

> Create a test spec file for the Swag Labs login page. 


Now that you have all the configuration files and page objects created, you can create your first test object to use all of these elements and run a test.

In the `cypress/integration `directory, find the file named `login.spec.js`. In accordance with [Page Object Model (POM) conventions](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/), you are creating separate directories & files for page and test objects.

Open `login.spec.js` and take a look at the `describe()` method to set up your test. The `cy.visit() `method contains an empty string because it will automatically pull the `baseUrl `from the `cypress.json` file:

```js
describe('LoginPage', () => {
   beforeEach(() => {
       cy.visit('');
   });
});
```

### 4.1 Add Your First It Assertion - Login Page

Next, add in an `it()` method, which is a Mocha/ Cypress standard for declaring test methods. This will check to see that when you get onto the page, the `screen` (Defined in `LoginPage.js`) element which contains the login field is visible.

Add in an `it()` method, which is a Mocha/ Cypress standard for declaring test methods. This will check to see that when you get onto the page, the `screen` (Defined in `LoginPage.js`) element which contains the login field is visible.

You can add this method right after the `before()` method:

```js
it('should be able to test loading of login page', () => {
    LoginPage.screen.should('be.visible');
});
```
### 4.2 Second It Assertion – Inventory Page

Next, add a test to check that the next page (where you can choose items for your cart.) is visible when you log in with valid user credentials:


```js
   it('should be able to login with a standard user', () => {
       LoginPage.signIn(LOGIN_USERS.STANDARD);
       SwagOverviewPage.screen.should('be.visible');
   });
```

#### HINTS
- The final code for your login test should look like this:
```js
import LoginPage from '../pageobjects/LoginPage';
import SwagOverviewPage from '../pageobjects/SwagOverviewPage';
import { LOGIN_USERS } from '../support/constants';

describe('LoginPage', () => {
   beforeEach(() => {
       cy.visit('');
   });

   it('should be able to test loading of login page', () => {
       LoginPage.screen.should('be.visible');
   });

   it('should be able to login with a standard user', () => {
       LoginPage.signIn(LOGIN_USERS.STANDARD);
       SwagOverviewPage.screen.should('be.visible');
   });

   it('should not be able to login with a locked user', () => {
       LoginPage.signIn(LOGIN_USERS.LOCKED);
       LoginPage.errorMessage.should('have.text','Epic sadface: Sorry, this user has been locked out.');
   });
});
```

## 5. Introduction to saucectl & the Sauce Labs Platform 

> Run tests at scale, on multiple devices and browsers, using saucectl and the Sauce Labs Cloud

Sauce Labs has developed a set of tools in conjunction with saucectl to enable test developers to get set up quickly to scale up their testing to more browsers and devices, and to be able to do this with a wider range of testing frameworks than ever before.

This is a testing solution for developers that simplifies user setup, speeds up test execution time, unifies test results, and supports new open source frameworks like Playwright, Cypress, TestCafe, Espresson, and XCUI for running end-to-end web & mobile tests.

![Test Runner Toolkit](https://raw.githubusercontent.com/ShMcK/tutorial-saucectl-cypress-test/master/assets/TRT1.02A.png)

### 5.1 Install saucectl

`saucectl` stands for Sauce Control, the command line interface for running non-Selenium tests such a Cypress, TestCafe, Espresso, and XCUITest. The toolkit includes `saucectl` commands that allow you to interface with Sauce Labs, running hundreds of test in parallel on Sauce Labs Virtual Machines, making it easy to interpret, share, and analyze those test results.

First you need to download and install the Sauce Control Command Line Interface (CLI) that you will use to run Sauce Labs. 

This is a part of the Sauce Labs set of tools that allows you to set a configuration location & update the file in your local directory.  

It also allows you to run commands to run tests locally or remotely on the Sauce Labs platform.

First, anywhere on your machine (in Terminal) install the saucectl tool globally, using this command `npm` to install the Saucectl package:

```shell
npm i -g saucectl
```

### 5.2 Set Sauce Username and Access Key

You can access your Sauce Username and Access Key on the Sauce Labs Platform

Visit [https://accounts.saucelabs.com](https://accounts.saucelabs.com/am/XUI/#login/?utm_source=referral&utm_medium=LMS&utm_campaign=link). You can create a free trial account if you haven’t been assigned one.

![Testrunner Toolkit](https://raw.githubusercontent.com/ShMcK/tutorial-saucectl-cypress-test/master/assets/TRT4.05A.png)

Go to **Account> User Settings** to find your username and access key.


When you run this command in terminal, saucectl will detect your `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`, but you can run the following optional command to edit these:

```shell
saucectl configure
```

This command prompts you to manually enter your credentials if it cannot detect any environment variables, and will generate a `credentials.yml` file in a .sauce directory in your home folder.

### 5.3 The Configuration File

Now you need to set up the basic files for your project. The first thing you need to do is create a configuration file inside of a n directory called `.sauce`.

In terminal, create a new (hidden) folder with the command inside your project directory (this should be at the same level as your `/cypress` `cypress.json`):

```shell
touch .sauce
```

Navigate insde of this directory in terminal:

```shell
cd .sauce
```
Next, create the configuration file which will contain instructions for how to run your Cypress tests with saucectl:

```shell
touch config.yml
```

Now, open the `config.yml` file and copy-paste the following. Updated versions of this can be found in the ([config Docs](https://docs.saucelabs.com/testrunner-toolkit/configuration#basic-configuration)):


// filename: .sauce/config.yml

```yaml
apiVersion: v1alpha
kind: cypress
defaults:
  mode: sauce
sauce:
  region: us-west-1
  concurrency: 2
  metadata:
    name: saucectl cypress example
    tags:
      - e2e
      - release team
      - other tag
    build: Github Run $GITHUB_RUN_ID
docker:
  fileTransfer: copy
cypress:
  version: 7.3.0
  configFile: "cypress.json"
rootDir: ./
suites:
  - name:
    browser: "chrome"
    platformName: "Windows 10"
    screenResolution: "1920x1080"
    config:
      testFiles: [ "**/*.*" ]

artifacts:
  download:
    when: never
    match:
      - console.log
    directory: ./artifacts/
```


#### HINTS
- The project file should now look like this:
```text
cypress-test-project
    |
	cypress.json
	/.sauce
		|
		config.yml 
	/cypress
		|
        /fixtures
		/integration
			|
			login.spec.js (include imports & beforeEach())
		/pageobjects	
		/support
        /plugins
```

- The `.sauce/config.yml` file has:
```yaml
apiVersion: v1alpha
kind: cypress
defaults:
  mode: sauce
sauce:
  region: us-west-1
  concurrency: 2
  metadata:
    name: saucectl cypress example
    tags:
      - e2e
      - release team
      - other tag
    build: Github Run $GITHUB_RUN_ID
docker:
  fileTransfer: copy
cypress:
  version: 7.3.0
  configFile: "cypress.json"
rootDir: ./
suites:
  - name:
    browser: "chrome"
    platformName: "Windows 10"
    screenResolution: "1920x1080"
    config:
      testFiles: [ "**/*.*" ]

artifacts:
  download:
    when: never
    match:
      - console.log
    directory: ./artifacts/
```

### 5.4 Add a .sauceignore

The last file you will need to create is the `.sauceignore` file, which allows you to avoid uploading unnecessary files that are included in your project.

Create the `.sauceignore` file in the root of your project:

```shell
touch .sauceignore
```

The reason for a file like this is so that you can avoid uploading assets or other things that may get stored in your test file. a good example of this is the `/assets` directory that (can) be created when you run tests on Sauce Labs. Sauce Labs will automatically add things like screenshots and video into your project, to make it easier to share and record issues that occured when your tests were run.

Next, we will want to add something to your `.sauceignore` file. Open this newly created file and add in the following:

```text
cypress/videos/
cypress/results/
cypress/screenshots/
node_modules/
.git/
.github/
.DS_Store
__assets__
**/__assets__
```

These are several common files you may have included with your project that you don't want stored on Sauce Labs (It will take longer for your tests to run if you upload these), and they aren't necessary for your test suites.

#### HINTS
- The project file should now look like this:
```text
cypress-test-project
    |
	cypress.json
    .sauceignore
	/.sauce
		|
		config.yml 
	/cypress
		|
        /fixtures
		/integration
			|
			login.spec.js (include imports & beforeEach())
		/pageobjects	
		/support
        /plugins
```

## 6. Run Cypress Test on Sauce Labs

> Optional summary for Level 1

Here's where you can put a description, examples, and instructions for the lesson.

### 6.1 Level 1 Step 1

This is the test text. Create an `index.html` file to pass this lesson.

#### HINTS

- This is a hint to help people through the test
- Second hint for 1.1, don't worry if the hints don't show up yet


