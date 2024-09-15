# Testing_Visual_On_Hotell_App

# Hello Welcome to this project. 

# 1. Dowload main branch every day with git pull command.

# 2. Install playwright and choose typescript and mapp tests for your front-end-tests:

npm init playwright@latest (command for install)

# 3. Create a Local Branch with your name as branch name and go to that branch.

# 4. In file playwrigt.config.ts paste following code before code block export default:

import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });



# 5. In file playwright.config.ts in row reporter: replace the row with following codes: 

reporter: [["line"], ["allure-playwright"]],

# 6. Install allure in our terminal with following command if you dont have it installed globally: 

check if you have allure on your system 

allure-version 

if you dont get version number do following command: 

npm install -g allure-commandline

if you allreday have it globally on your machine just type in following in your command: 

npm i -D allure-playwright


# 7. in our mapp tests rename the testfile to the following name.

yourname(Testsuite_Visual_Testing.spec.ts)

example 

Hampus.Testsuite_Visual_Testing.spec.ts

# 8. in the test mapp create a folder with the name of your testfile but add -snapshots to your file extension.

Example 

Hampus.Testsuite_Visual_Testing.spec.ts-snapshots.

Here every generating snapshots will be stored from your testfile. 

#9. Create a file named .env and then paste all info from file copy.env in it. 

#10. Hannes will send you the details for every env variable local not on remote for security reasons. 

#11. At the ending of projekt one in the group push upp following files to Main Branch

 - playwright.config.ts
 - .gitignore
 - package-lock.json
 - package.json
   












     

     
       
