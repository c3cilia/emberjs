#RECIPE 1: ES6
##Setting up the environment
#### Setting up automatic update with browser sync module
Step 1: Start an npm project
```npm init```
Step 2: Install browser-sync npm package to help automate browser reloads. Its a dev dependency
```npm install browser-sync --save-dev```
Step 3: Create an index.html file in the root directory of the npm package
* Create an html tag ```<html>```
	* Create a head tag ```<head>```
		* Create a script tag pointing to jspm_packages ```<script src="/jspm_packages/system.js">```
		* Create another script tag pointing to the jspm modules ```<script src="/config.js">``` 
	* Create the body tag ```<body>```
		* Start writing your code here
Step 4: install the jspm modules
* Install jspm/jspm-cli as a global module  ```npm install jspm/jspm-cli -g```
* Install it again as a dev dependency  ```npm install jspm --save-dev```

#### Setting up jspm for development
Step 1: Setup a config.js 
* Just run ```jspm init``` command from the terminal

Step 2: install 'text, css, json' modules that let you use ES6 importing to bring CSS, JSON, and plain text strings into the scope of a module. ```jspm install text css json```  
