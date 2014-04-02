googlemaps-amd
==============

Google Maps AMD Loader Plugin


## Usage

The `googlemaps` loader plugin allows you to directly require Google Maps as an AMD dependency.

```javascript
require(['googlemaps!'], function(gmaps) {
  // google.maps is now available as `gmaps`
  var map = new gmaps.Map('map-canvas');
});
```

The plugin depends on the [async loader plugin](https://github.com/millermedeiros/requirejs-plugins). Use a RequireJS [paths config](http://requirejs.org/docs/api.html#config-paths) to tell `googlemaps` where to find it. For example:

```javascript
require.config({
  paths: {
    googlemaps: 'bower_components/googlemaps-amd/src/googlemaps',
    async: 'bower_components/requirejs-plugins/src/async'
  }
});
```

### Why not use the [async plugin](https://github.com/millermedeiros/requirejs-plugins/)?

The async plugin also allows you to load google maps, like so:

```javascript
require(['async!http://maps.google.com/maps/api/js?sensor=false'], function() {
  // google.maps is defined
});
```

The googlemaps-amd plugin is essentially a wrapper around the async plugin, which allows an alternate syntax. This snippet does the same thing as the one above:

```javascript
require(['googlemaps!'], function(googleMaps) {
  google.maps === googleMaps;   // true
});
```

Besides providing a more readable syntax, using the the googlemaps-amd plugin [allows you to configure your google maps API keys (and other parameters) from the RequireJS configuration](#configuration). This is especially useful if you want various consumers of your code to be able to configure their own API keys, without having to modify the source code of your library.

If this is not necessary for your situation, I recommend you do use [the RequireJS async plugin](https://github.com/millermedeiros/requirejs-plugins).


## Install

The easiest way to use the `googlemaps` plugin is to [download the source file](https://raw.github.com/hamweather/googlemaps-amd/master/src/googlemaps.js)

### Using Bower

The `googlemaps` plugin is registered as a Bower module. To install:

```
bower install googlemaps-amd
```

And don't forget to configure your paths:

```javascript
require.config({
  paths: {
    googlemaps: 'bower_components/googlemaps-amd/src/googlemaps',
    async: 'bower_components/requirejs-plugins/src/async'
  }
});
```


## Configuration

By default, the `googlemaps` loader will pull in the Google Maps library from `https://maps.googleapis.com/maps/api/js?sensor=false`. However, the plugin can be configured with additional options:

```javascript
require.config({
  googlemaps: {
    params: {
      key: 'abcd1234',
      libraries: 'geometry'
    }
  }
});
```

Using the plugin will now load the library from `https://maps.googleapis.com/maps/api/js?sensor=false&key=abcd1234&libraries=geometry`.
