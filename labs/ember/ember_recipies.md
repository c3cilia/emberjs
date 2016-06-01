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

####Step 3: Start the evelopment server

```
ember serve 
```

open it at ```http://localhost:4200```.

####Step 4: Clear out the contents of ```app/templates/application.hbs``` 
leave [{{outler}}](). [What is application.hbs for]()

####Step 5: Generate an about [route]()

``` 
ember g route about
```

Three files are generated from this 
* The about [template]() (app/templates/about.hbs)
* The about [route handler]() (app/routes/about.js)
* And the about test file (tests/unit/routes/about-test.js)

Note: When we open the ```app/router.js```, we can see that the [generator]() has mapped a new about route for us.

####Step 6: Add a bit of information in the about template
open ```app/templates/about.hbs```

add a h2 header for the about page

```<h2>About Super Rentals</h2>```

Add Some text for the about page

```
<p>The Super Rentals website is a delightful project created to explore Ember.
By building a property rental site, we can simultaneously imagine traveling
AND building Ember applications.</p>
```

Then go to ```http://localhost:4200/about``` to see your changes.

####Step 7: Generate a contact route

```
ember g route contact
```

As usual this will generate a contact template, route handler and test file for the the route

Then open the contact template ```app/templates/contact.hbs```
Add some information about how to contact the person


```
<p>Super Rentals Representatives would love to help you choose a destination or answer
any questions you may have.</p>

<p>Contact us today:</p>

<p>
  Super Rentals HQ
  <address>
    1212 Test Address Avenue<br>
    Testington, OR 97233
  </address>
</p>

<p><a href="tel:503.555.1212">(503)555-1212</a></p>

<p><a href="mailto:superrentalsrep@superrentals.com">superrentalsrep@superrentals.com</a></p>
```

Go to ```http://localhost:4200```



##[Project after all this research]().
An application where a user can use maps to track 
* A shop they want with the thing they want


