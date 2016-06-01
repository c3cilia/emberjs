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

####Step 8: Add navigation link from about to contact
Ember has built-in [helpers]() that help with linking to other routes. The helper is ```{{link-to}}```
The [link-to]() helper takes an argument which is the route that it is going to open.

```
<h2>About Super Rentals</h2>

<p>The Super Rentals website is a delightful project created to explore Ember.<br>
  By building a property rental site, we can simultaneously imagine traveling<br>
  AND building Ember applications.</p>

{{#link-to "contact"}}Click here to contact us.{{/link-to}}
```

####Step 9: Add navigation link from contact to about

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

{{#link-to 'about'}}About us{{/link}}
```

####STep 10: Generate the index route

```
ember g route index
```

This again generate the index template, route handeler and test file.

The index route is special. It does not require an entry in the routers mapping. The reason will be clear when you learn about [nested routes]()

####Step 11: Fill the index template with some data
Start with a H1 for the heading

```<h1>Welcome to super rentals</h1>```

Then add a simple p tag

```<p>Hope you find what you are looking for in a place to stay</p>```

Add a link to the about route 

```
{{#link-to 'about'}}About us {{/link-to}}
```

Add a link to the contact route 

```
{{#link-to 'contact'}}Contact us {{/link-to}}
```

The final code in ```app/templates/index.hbs``` should be like 

```
<h1>Welcome to super rentals</h1>

<p>Hope you find what you are looking for in a place to stay</p>

{{#link-to 'about'}}About us {{/link-to}}
{{#link-to 'contact'}}Contact us {{/link-to}}
```


####Step 12: Add some dummy model data in index.js route
In ember the route handers are resposible for loading model data. Since we want data about the rentals to be on the front page we will therefore use the index route. The data is an array of objects

Open ```app/routes/index.js``` route handler

Add the dummy Data

```
var rentals = [{
  id: 1,
  title: 'Grand Old Mansion',
  owner: 'Veruca Salt',
  city: 'San Francisco',
  type: 'Estate',
  bedrooms: 15,
  image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
}, {
  id: 2,
  title: 'Urban Living',
  owner: 'Mike TV',
  city: 'Seattle',
  type: 'Condo',
  bedrooms: 1,
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
}, {
  id: 3,
  title: 'Downtown Charm',
  owner: 'Violet Beauregarde',
  city: 'Portland',
  type: 'Apartment',
  bedrooms: 3,
  image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
}];
```

Then add the model function. We are using [ES6 shorthand for functions](). The model function is a [hook]() that will be called when the user open the index route is called or opened by the user. The model hook return the rentals array and that is passed to the index template.

```
model(){
  return rentals;
}
```

The final code for ```app/routes/index.js``` should be

```
import Ember from 'ember';

var rentals = [{
  id: 1,
  title: 'Grand Old Mansion',
  owner: 'Veruca Salt',
  city: 'San Francisco',
  type: 'Estate',
  bedrooms: 15,
  image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
}, {
  id: 2,
  title: 'Urban Living',
  owner: 'Mike TV',
  city: 'Seattle',
  type: 'Condo',
  bedrooms: 1,
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
}, {
  id: 3,
  title: 'Downtown Charm',
  owner: 'Violet Beauregarde',
  city: 'Portland',
  type: 'Apartment',
  bedrooms: 3,
  image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
}];

export default Ember.Route.extend({
  model (){
    return rentals;
  },

});
```

####Step 13: Make data from the route handler appear in the template for viewing
Open ```app/templates/index.hbs``` template. Iterate through the rentals using the ```{{each}}``` helper. [each helper]().

```
{{#each model as |rental|}}
  <h2>{{rental.title}}</h2>
  <p>Owner: {{rental.owner}}</p>
  <p>Type: {{rental.type}}</p>
  <p>Location: {{rental.city}}</p>
  <p>Number of bedrooms{{rental.bedrooms}}</p>
  <img src="{{rental.image}}"/>
{{/each}}
```

The final code for ```app/templates/index.hbs``` should be  

```
<h1>Welcome to super rentals</h1>

<p>Hope you find what you are looking for in a place to stay</p>

{{#each model as |rental|}} //[|rental|]()
  <h2>{{rental.title}}</h2>
  <p>Owner: {{rental.owner}}</p>
  <p>Type: {{rental.type}}</p>
  <p>Location: {{rental.city}}</p>
  <p>Number of bedrooms{{rental.bedrooms}}</p>
  <img src="{{rental.image}}"/>
{{/each}}
{{#link-to 'about'}}About us {{/link-to}}
{{#link-to 'contact'}}Contact us {{/link-to}}
```











##[Project after all this research]().
An application where a user can use maps to track 
* A shop they want with the thing they want


