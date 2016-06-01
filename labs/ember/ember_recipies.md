###Recipe 1: Creating the super rental app
####Step 1: Create the a new ember app called super-rental

```
ember new super-rentals
```

A few folders are created Automatically.</br>
* App --> contains [models](), [components](), [routes](), [templates](), styles etc.
* bower_components --> [Bower]() is a dependency management tool. In [Ember CLI]() it manages HTML, CSS and JS. You can add others like [Bootstrap](). [What is the difference between Ember and Ember data]()
* config --> configuration settings for the entire app
* dist --> contains built files for deployment
* node_modules --> Ember is built with [node]() and this makes is sort of important.
* public --> for images and fonts 
* vendor --> JS and CSS not managed by bower goes here
* test --> for Ember CLI test runner [testem]()
* tmp --> for temporary files 
* ember-cli-build.js --> This describes [how Ember CLI should build our app]()

Note: Ember users [ECMAScript 2015]() 

####Step 2: Update the version of ember you are using 

* Change the versions of ember and ember data in ```bower.json```
* Then 	do 

```
bower install
```

####STep 3: Start the evelopment server

```
ember serve 
```

open it at ```http://localhost:4200```.

##Project after all this research.
An application where a user can use maps to track 
* A shop they want with the thing they want


