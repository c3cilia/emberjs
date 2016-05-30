#RECIPE 1
####Setting up the development environment for ES6
Step 1: Start an npm project
```npm init```
Step 2: Install browser-sync npm package to help automate browser reloads
Step 3: Create an index.html file in the root directory of the npm package

 


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <script src="/jspm_packages/system.js"></script>
    <script src="/config.js"></script>
    <script>
        System.import('./startup'); //note no .js on this file
    </script>
</head>
<body></body>
</html>

