# MechatronicsToolkit-website
1. Open the repository in VS code
2. Open a terminal and run 'python -m http.server' to host a local server, this is necessary for the website to call external scripts and json files
3. Open a browser and go to http://localhost:8000/index.html to view the homepage

Create a new branch before modifying the source code:

* 'git branch \<your branch name\>': This command creates a new branch
* 'git checkout \<your branch name\>': This command loads the new branch, changes will not affect the master branch

Use the following commands to commit your changes:

* 'git status': This command displays the current status of your local repository, including which files have been modified and which ones are ready to be committed
* 'git add .': This command stages all modified files for commit
* 'git commit -m "\<your commit message\>"': This command creates a new commit with the specified commit message and the files that have been staged using the git add command

Merge your branch with the master branch and push them to the remote repository:

* 'git checkout master': This command loads the master branch
* 'git merge \<your branch name\>': This command merges the new branch with the master
* 'git pull origin master': This command integrates remote changes
* 'git push origin master': This command pushes the commits to the remote repository

Note: when viewing changes that you've made to the source code in your browser, it is sometimes necessary to clear your browsers cache to ensure you are viewing the up-to-date version of the code.

This can be achieved in Chrome by navigating to Settings>Privacy and security>Clear browing data
