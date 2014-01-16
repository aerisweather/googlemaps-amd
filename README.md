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
    googlemaps: 'mylib/vendor/amdplugins/googlemaps',
    async: 'mylib/vendor/amdplugins/async'
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
