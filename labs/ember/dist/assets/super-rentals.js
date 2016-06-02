"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('super-rentals/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'super-rentals/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('super-rentals/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'super-rentals/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('super-rentals/components/filter-listing', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    filter: null,
    filteredList: null,
    actions: {
      autoComplete: function autoComplete() {
        this.get('autoComplete')(this.get('filter'));
      },
      search: function search() {
        this.get('search')(this.get('filter'));
      },
      choose: function choose(city) {
        this.set('filter', city);
      }
    }
  });

});
define('super-rentals/components/rental-listing', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
		isImageShowing: false,
		actions: {
			imageShow: function imageShow() {
				this.set('isImageShowing', true);
			},
			imageHide: function imageHide() {
				this.set('isImageShowing', false);
			}
		}
	});

});
define('super-rentals/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('super-rentals/controllers/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    filteredList: null,
    actions: {
      autoComplete: function autoComplete(param) {
        var _this = this;

        if (param !== '') {
          this.get('store').query('rental', { city: param }).then(function (result) {
            return _this.set('filteredList', result);
          });
        } else {
          this.set('filteredList', null);
        }
      },
      search: function search(param) {
        var _this2 = this;

        if (param !== '') {
          this.store.query('rental', { city: param }).then(function (result) {
            return _this2.set('model', result);
          });
        } else {
          this.get('store').findAll('rental').then(function (result) {
            return _this2.set('model', result);
          });
        }
      }
    }
  });

});
define('super-rentals/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('super-rentals/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, pluralize) {

	'use strict';

	exports['default'] = pluralize['default'];

});
define('super-rentals/helpers/rental-property-type', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports.rentalPropertyType = rentalPropertyType;

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var communityPropertyTypes = ['Condo', 'Townhouse', 'Appartment'];

	function rentalPropertyType(_ref) {
		var _ref2 = _slicedToArray(_ref, 1);

		var type = _ref2[0];

		if (communityPropertyTypes.contains(type)) {
			return 'Community';
		}
		return 'Standalone';
	}

	exports['default'] = Ember['default'].Helper.helper(rentalPropertyType);

});
define('super-rentals/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, singularize) {

	'use strict';

	exports['default'] = singularize['default'];

});
define('super-rentals/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'super-rentals/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('super-rentals/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'super-rentals/config/environment', 'super-rentals/mirage/config', 'ember-cli-mirage/server', 'lodash/object/assign'], function (exports, readModules, ENV, config, Server, _assign) {

  'use strict';

  exports.startMirage = startMirage;

  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }

      if (_shouldUseMirage(ENV['default'].environment, ENV['default']['ember-cli-mirage'])) {
        startMirage(ENV['default']);
      }
    }
  };

  function startMirage() {
    var env = arguments.length <= 0 || arguments[0] === undefined ? ENV['default'] : arguments[0];

    var environment = env.environment;
    var modules = readModules['default'](env.modulePrefix);
    var options = _assign['default'](modules, { environment: environment, baseConfig: config['default'], testConfig: config.testConfig });

    return new Server['default'](options);
  }

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }

});
define('super-rentals/initializers/export-application-global', ['exports', 'ember', 'super-rentals/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('super-rentals/mirage/config', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {
    this.get('/rentals', function (db, request) {
      var rentals = [{
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
      }, {
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
      }, {
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
      }];

      if (request.queryParams.city !== undefined) {
        var filteredRentals = rentals.filter(function (i) {
          return i.attributes.city.toLowerCase().indexOf(request.queryParams.city.toLowerCase()) !== -1;
        });
        return { data: filteredRentals };
      } else {
        return { data: rentals };
      }
    });
  }

});
define('super-rentals/mirage/scenarios/default', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () /* server */{

    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
       Make sure to define a factory for each model you want to create.
    */

    // server.createList('post', 10);
  }

});
define('super-rentals/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, ember_cli_mirage) {

	'use strict';

	exports['default'] = ember_cli_mirage.JSONAPISerializer.extend({});

});
define('super-rentals/models/rental', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({
		title: DS['default'].attr('string'),
		ownwer: DS['default'].attr('string'),
		city: DS['default'].attr('string'),
		type: DS['default'].attr('string'),
		image: DS['default'].attr('string'),
		bedrooms: DS['default'].attr('number')
	});

});
define('super-rentals/router', ['exports', 'ember', 'super-rentals/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('about');
    this.route('contact');
  });

  exports['default'] = Router;

});
define('super-rentals/routes/about', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('super-rentals/routes/contact', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('super-rentals/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('rental');
		}

	});

});
define('super-rentals/templates/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 32
            }
          },
          "moduleName": "super-rentals/templates/about.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Contact us");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes",
            "wrong-type"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 44
          }
        },
        "moduleName": "super-rentals/templates/about.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("About Super Rentals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The Super Rentals website is a delightful project created to explore Ember.\nBy building a property rental site, we can simultaneously imagine traveling\nAND building Ember applications.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","link-to",["contact"],[],0,null,["loc",[null,[7,0],[7,44]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('super-rentals/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "super-rentals/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('super-rentals/templates/components/filter-listing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "super-rentals/templates/components/filter-listing.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,0,0);
          return morphs;
        },
        statements: [
          ["element","action",["choose",["get","item.city",["loc",[null,[6,24],[6,33]]]]],[],["loc",[null,[6,6],[6,35]]]],
          ["content","item.city",["loc",[null,[6,36],[6,49]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 5
          }
        },
        "moduleName": "super-rentals/templates/components/filter-listing.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("City: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Search");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["value",["subexpr","@mut",[["get","filter",["loc",[null,[1,20],[1,26]]]]],[],[]],"key-up",["subexpr","action",["autoComplete"],[],["loc",[null,[1,34],[1,57]]]]],["loc",[null,[1,6],[1,59]]]],
        ["element","action",["search"],[],["loc",[null,[2,8],[2,27]]]],
        ["block","each",[["get","filteredList",["loc",[null,[5,8],[5,20]]]]],[],0,null,["loc",[null,[5,0],[7,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('super-rentals/templates/components/rental-listing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 1
            },
            "end": {
              "line": 10,
              "column": 1
            }
          },
          "moduleName": "super-rentals/templates/components/rental-listing.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("Hide image");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element1, 'src');
          morphs[1] = dom.createAttrMorph(element1, 'alt');
          morphs[2] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [
          ["attribute","src",["concat",[["get","rental.image",["loc",[null,[8,14],[8,26]]]]]]],
          ["attribute","alt",["concat",[["get","rental.type",["loc",[null,[8,37],[8,48]]]]]]],
          ["element","action",["imageHide"],[],["loc",[null,[9,10],[9,32]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 1
            },
            "end": {
              "line": 12,
              "column": 1
            }
          },
          "moduleName": "super-rentals/templates/components/rental-listing.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("Show image");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["imageShow"],[],["loc",[null,[11,10],[11,32]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes",
            "wrong-type"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 8
          }
        },
        "moduleName": "super-rentals/templates/components/rental-listing.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Owner: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Type: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" - ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Location: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Number of bedrooms");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [4]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        morphs[2] = dom.createMorphAt(element3,1,1);
        morphs[3] = dom.createMorphAt(element3,3,3);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [6]),1,1);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [8]),1,1);
        morphs[6] = dom.createMorphAt(fragment,10,10,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","rental.title",["loc",[null,[1,4],[1,20]]]],
        ["content","rental.owner",["loc",[null,[2,11],[2,27]]]],
        ["inline","rental-property-type",[["get","rental.type",["loc",[null,[3,33],[3,44]]]]],[],["loc",[null,[3,10],[3,46]]]],
        ["content","rental.type",["loc",[null,[3,49],[3,64]]]],
        ["content","rental.city",["loc",[null,[4,14],[4,29]]]],
        ["content","rental.bedrooms",["loc",[null,[5,22],[5,41]]]],
        ["block","if",[["get","isImageShowing",["loc",[null,[7,7],[7,21]]]]],[],0,1,["loc",[null,[7,1],[12,8]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('super-rentals/templates/contact', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 28
            }
          },
          "moduleName": "super-rentals/templates/contact.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("About us");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes",
            "wrong-type"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 40
          }
        },
        "moduleName": "super-rentals/templates/contact.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Super Rentals Representatives would love to help you choose a destination or answer\nany questions you may have.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Contact us today:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Super Rentals HQ\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("address");
        var el3 = dom.createTextNode("\n    1212 Test Address Avenue");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    Testington, OR 97233\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","tel:503.555.1212");
        var el3 = dom.createTextNode("(503)555-1212");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","mailto:superrentalsrep@superrentals.com");
        var el3 = dom.createTextNode("superrentalsrep@superrentals.com");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,10,10,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","link-to",["about"],[],0,null,["loc",[null,[18,0],[18,40]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('super-rentals/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "super-rentals/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","rental-listing",[],["rental",["subexpr","@mut",[["get","rentalUnit",["loc",[null,[8,26],[8,36]]]]],[],[]]],["loc",[null,[8,2],[8,38]]]]
        ],
        locals: ["rentalUnit"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 25
            }
          },
          "moduleName": "super-rentals/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("About");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 47
            }
          },
          "moduleName": "super-rentals/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Click here to contact us.");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes",
            "wrong-type"
          ]
        },
        "revision": "Ember@2.5.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 59
          }
        },
        "moduleName": "super-rentals/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Welcome to Super Rentals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nWe hope you find exactly what you're looking for in a place to stay.\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,5,5,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,7,7,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,9,9,contextualElement);
        morphs[3] = dom.createMorphAt(fragment,11,11,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","filter-listing",[],["filteredList",["subexpr","@mut",[["get","filteredList",["loc",[null,[5,30],[5,42]]]]],[],[]],"autoComplete",["subexpr","action",["autoComplete"],[],["loc",[null,[6,13],[6,36]]]],"search",["subexpr","action",["search"],[],["loc",[null,[6,44],[6,61]]]]],["loc",[null,[5,0],[6,63]]]],
        ["block","each",[["get","model",["loc",[null,[7,8],[7,13]]]]],[],0,null,["loc",[null,[7,0],[9,9]]]],
        ["block","link-to",["about"],[],1,null,["loc",[null,[11,0],[11,37]]]],
        ["block","link-to",["contact"],[],2,null,["loc",[null,[12,0],[12,59]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('super-rentals/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });

});
define('super-rentals/tests/components/filter-listing.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/filter-listing.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/filter-listing.js should pass jshint.');
  });

});
define('super-rentals/tests/components/rental-listing.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/rental-listing.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/rental-listing.js should pass jshint.');
  });

});
define('super-rentals/tests/controllers/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });

});
define('super-rentals/tests/helpers/rental-property-type.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/rental-property-type.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/rental-property-type.js should pass jshint.');
  });

});
define('super-rentals/tests/helpers/resolver', ['exports', 'ember/resolver', 'super-rentals/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('super-rentals/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });

});
define('super-rentals/tests/helpers/start-app', ['exports', 'ember', 'super-rentals/app', 'super-rentals/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('super-rentals/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });

});
define('super-rentals/tests/integration/components/filter-listing-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('filter-listing', 'Integration | Component | filter listing', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 18
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'filter-listing', ['loc', [null, [1, 0], [1, 18]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'filter-listing', [], [], 0, null, ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('super-rentals/tests/integration/components/filter-listing-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/filter-listing-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/filter-listing-test.js should pass jshint.');
  });

});
define('super-rentals/tests/integration/components/rental-listing-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('rental-listing', 'Integration | Component | rental listing', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 18
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'rental-listing', ['loc', [null, [1, 0], [1, 18]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'rental-listing', [], [], 0, null, ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('super-rentals/tests/integration/components/rental-listing-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/rental-listing-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rental-listing-test.js should pass jshint.');
  });

});
define('super-rentals/tests/models/rental.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/rental.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'models/rental.js should pass jshint.');
  });

});
define('super-rentals/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });

});
define('super-rentals/tests/routes/about.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/about.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });

});
define('super-rentals/tests/routes/contact.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/contact.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass jshint.');
  });

});
define('super-rentals/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });

});
define('super-rentals/tests/test-helper', ['super-rentals/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('super-rentals/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('super-rentals/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/helpers/rental-property-type-test', ['super-rentals/helpers/rental-property-type', 'qunit'], function (rental_property_type, qunit) {

  'use strict';

  qunit.module('Unit | Helper | rental property type');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = rental_property_type.rentalPropertyType(42);
    assert.ok(result);
  });

});
define('super-rentals/tests/unit/helpers/rental-property-type-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers/rental-property-type-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/rental-property-type-test.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/models/rental-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('rental', 'Unit | Model | rental', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('super-rentals/tests/unit/models/rental-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models/rental-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rental-test.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/routes/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('super-rentals/tests/unit/routes/about-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/about-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/routes/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:contact', 'Unit | Route | contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('super-rentals/tests/unit/routes/contact-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/contact-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass jshint.');
  });

});
define('super-rentals/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('super-rentals/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('super-rentals/config/environment', ['ember'], function(Ember) {
  var prefix = 'super-rentals';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("super-rentals/tests/test-helper");
} else {
  require("super-rentals/app")["default"].create({"name":"super-rentals","version":"0.0.0+86789e93"});
}

/* jshint ignore:end */
//# sourceMappingURL=super-rentals.map