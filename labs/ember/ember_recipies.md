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

{{#each model as |rental|}} 
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

[|rental|]() - is this like how we define variables in a template or what?
[#each]() - look more into this.

####Step 14: Generate Ember Data model
The [Ember Data]() model is the data management library

```
ember g model rental
```

This generate rental model ```app/models/rental.js``` and a test file for it ```tests/unit/models/rental-test.js```

####Step 15: Add some models in the rental model
open ```app/models/rental.js```

Define how the rental data model

```
{
  title: DS.attr('string'),
  ownwer: DS.attr('string'),
  city: DS.attr('string'),
  type: DS.attr('string'),
  image: DS.attr('string'),
  bedrooms: DS.attr('number'),
}
```

The final code for ```app/models/rental.js``` should be 

```
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  ownwer: DS.attr('string'),
  city: DS.attr('string'),
  type: DS.attr('string'),
  image: DS.attr('string'),
  bedrooms: DS.attr('number'),
});
```

[DS]()
[ember-data]()
[DS.Model.extend]() 
[export default]()

####Step 16: Use mirage as the backend
First you need to install [mirage]()

```ember install ember-cli-mirage```

Then restart the ember server

```ember serve```


####Step 17: Configure mirage to send data to the rentals model
Open ```app/mirage/config.js```

```
export default function(){
  this.get('/rentals', function(){
    return {
      data: [
        {
          type: 'rentals',
          id: 1,
          attributes: {
            title: 'Grand Old Mansion',
            owner: 'Veruca Salt',
            city: 'San Francisco',
            type: 'Estate',
            bedrooms: 15,
            image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
          }
        },
        {
          type: 'rentals',
          id: 2,
          attributes: {
            title: 'Urban Living',
            owner: 'Mike Teavee',
            city: 'Seattle',
            type: 'Condo',
            bedrooms: 1,
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
          }
        },
        {
          type: 'rentals',
          id: 3,
          attributes: {
            title: 'Downtown Charm',
            owner: 'Violet Beauregarde',
            city: 'Portland',
            type: 'Apartment',
            bedrooms: 3,
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
          }
        } 
      ]
    };
  });
}

```

[this.get('/rentals', function(){})]()

####Step 18: Update the index route to get all the data from mirage
First remove the object that had all the data then add this

```

export default Ember.Route.extend({
  model (){
    return this.store.findAll('rental');
  },

});
```

[this.store.findAll('rental');]()

####Step 19: Add ability to hde and show an image for each rental
We will use a [component]() for this. Component names must have a dash in between. First lets generate the ```rental-listing``` component 

```
ember g component rental-listing
```

Just like the route this will generate a component hander ```app/components/rental-listing.js``` a component [handlebars]() template ```app/templates/components/rental-listing.hbs``` and a test file for the component ```tests/integration/components/rental-listing-test.js```

####Step 20: Move rental display from index route to the rental-listing component 

The ```app/templates/index.hbs``` should now be like this

```
<h1>Welcome to super rentals</h1>

<p>Hope you find what you are looking for in a place to stay</p>

{{#each model as |rentalUnit|}}
  {{rental-listing rental=rentalUnit}}
{{/each}}
{{#link-to 'about'}}About us {{/link-to}}
{{#link-to 'contact'}}Contact us {{/link-to}}
```

move the code to ```app/templates/components/rental-listing.hbs``` which should now look like this

```
<h2>{{rental.title}}</h2>
  <p>Owner: {{rental.owner}}</p>
  <p>Type: {{rental.type}}</p>
  <p>Location: {{rental.city}}</p>
  <p>Number of bedrooms{{rental.bedrooms}}</p>
  <img src="{{rental.image}}"/>
```

####Step 21: Hiding and showing images
First introduce the ```{{if}}``` helper to check if ```isImageShowing``` is set to true or false.
If it is true show the image and a  "Hide image" button else just show the "Show image" button. ```isImageShowing``` comes from the components handler.

```
{{#if isImageShowing}}
    <img src="{{rental.image}}"/>
    <button>Hide image</button>
  {{else}}
    <button>Show image</button>
  {{/if}}
```

The whole code for ```app/templates/components/rental-listing.hbs``` should be like 

```
<h2>{{rental.title}}</h2>
  <p>Owner: {{rental.owner}}</p>
  <p>Type: {{rental.type}}</p>
  <p>Location: {{rental.city}}</p>
  <p>Number of bedrooms{{rental.bedrooms}}</p>

  {{#if isImageShowing}}
    <img src="{{rental.image}}"/>
    <button>Hide image</button>
  {{else}}
    <button>Show image</button>
  {{/if}}
```

####Step 22: Add isImageShowing in the rental-listing component handler

```
import Ember from 'ember';

export default Ember.Component.extend({
  isImageShowing: false,
});
```

[Ember.Component.extend]()

####Step 23: Add an "showImage" action to the "Show image" button

```<button {{action "imageShow"}}>Show image</button>```

####Step 24: Handle the action in the  ```app/components/rental-listing.js```

```
import Ember from 'ember';

export default Ember.Component.extend({
  isImageShowing: false,
  actions: {
    imageShow(){
      this.set('isImageShowing', true);
    },
  }
});
```

[this.set('isImageShowing', true);]()

####Step 25: Add a "hideImage" action to the "Hide image" button

```
<button {{action "imageHide"}}>Hide image</button>
```

####Step 26: Handle the "imageHide" action in the components handle 

```
import Ember from 'ember';

export default Ember.Component.extend({
  isImageShowing: false,
  actions: {
    imageShow(){
      this.set('isImageShowing', true);
    },
    imageHide(){
      this.set('isImageShowing', false);
    }
  }
});
```

####Step 27: Manipulate the data so that the user sees if the property is standalone or communial
We will use the [handlebars helpers](). 

So first generate the helper

```
ember g helper rental-property-type
```

This generates a rental-property-type helper ```app/helpers/rental-property-type``` and its test file ```tests/unit/helpers/rental-property-type-test.js```

#####Step 28: Update the rental-listing component template to use the rental-property-type helper

```
<p>Type: {{rental-property-type rental.type}} - {{rental.type}}</p>
```

####Step 29: Update the ```app/helpers/rental-property-type``` 
To check if the the property is "Standalone" or "community". We are using [ES2015 destructuring]() to get the first item in the array and name it ```type```.

```
import Ember from 'ember';

const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Appartment'
]
export function rentalPropertyType([type]) {
  if (communityPropertyTypes.contains(type)){
    return 'Community';
  }
  return 'Standalone';
}

export default Ember.Helper.helper(rentalPropertyType);
```
[communityPropertyTypes.contains(type)]()
[export function rentalPropertyType([type])]()


####Step 30: Generate a search component

```
ember g component filter-listing
```

####Step 31: In the filter-listing template 
Create an input field using the [input helper]() ```{{input}}```.

```
City: {{input value=filter key-up=(action 'autoComplete')}} 
```



 



















How many hours do programmer spend a day programming?


####1.1) [Ember.js - Models: Introduction](https://guides.emberjs.com/v2.5.0/models/)
[Adapater pattern](https://en.wikipedia.org/wiki/Adapter_pattern) 
[streaming servers]()
[SOLID principles](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

####2) [Learning something in 20 hours](https://www.youtube.com/watch?v=EtJy69cEOtQ)
- What is it going to look like when you are done? What is the outcome of this learning? Define the outcome. 
- Deconstruct the skill into small chunks
- Research just enough that you are able to identify the most important sub-skills in whatever you want to learn how to do.


####3) Saka
Make the banner for the landing page
  - Design an image 
  - Make the image appear in the frontend
    - Get the core concepts about the front end
  - Style the image 













