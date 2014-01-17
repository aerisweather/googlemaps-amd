define([
  'async'
], function(async) {
  var root = this;
  var GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api/js';

  /**
   * Google maps AMD loader plugin.
   *
   * Example:
   *  // All configs options are optional.
   *  require.config({
   *      googlemaps: {
   *        url: 'https://maps.googleapis.com/maps/api/js',
   *        params: {
   *          key: 'abcd1234',
   *          libraries: 'geometry',
   *          sensor: true                // Defaults to false
   *        },
   *        async: asyncLoaderPlugin      // Primarly for providing test stubs.
   *      }
   *  });
   *
   *  require(['googlemaps!'], function(gmaps) {
   *    var map = new gmaps.map('map-canvas);
   *  });
   *
   */
  return {
    load: loadGoogleMaps_
  };

  /**
   * Main loader method.
   * Implements the AMD loader plugin api load method.
   * See: https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins#load-function-resourceid-require-load-config-
   */
  function loadGoogleMaps_(name, parentRequire, onload, opt_config) {
    var isGoogleMapsAlreadyLoaded;
    var config;
    var googleUrl;
    var onAsyncLoad;

    // Do nothing during a build
    if (opt_config && opt_config.isBuild) {
      onload(null);
      return;
    }

    // Grab default config values
    config = normalizeConfig_(opt_config);

    // Prevent duplicate loading of google maps
    isGoogleMapsAlreadyLoaded = root.google && root.google.maps;
    if (isGoogleMapsAlreadyLoaded) {
      onload(root.google.maps);
      return;
    }

    // Setup async callback
    // to resolve with google maps
    onAsyncLoad = function() {
      resolveWithGoogleMaps_(onload);
    };
    onAsyncLoad.onerror = onload.onerror;

    // Load google maps using async! plugin
    googleUrl = getGoogleUrl_(config.googlemaps);
    config.googlemaps.async.load(googleUrl, parentRequire, onAsyncLoad, config);
  }


  function normalizeConfig_(opt_config) {
    var config = opt_config || {};
    config.googlemaps || (config.googlemaps = {});
    config.googlemaps.url || (config.googlemaps.url = GOOGLE_MAPS_URL);
    config.googlemaps.params = normalizeParams_(config.googlemaps.params);
    config.googlemaps.async || (config.googlemaps.async = async);

    return config;
  }

  function normalizeParams_(params) {
    var defaultParams = {
      sensor: false
    };
    params || (params = {});

    params.sensor = isUndefined_(params.sensor) ? defaultParams.sensor : params.sensor;

    return params;
  }

  function getGoogleUrl_(googleMapsConfig) {
    return googleMapsConfig.url + '?' + serialize_(googleMapsConfig.params);
  }

  function resolveWithGoogleMaps_(onload) {
    var googleMaps;

    try {
      googleMaps = getGlobalGoogleMapsLibrary_();
    }
    catch(error) {
      handleLoadError_(error, onload);
    }

    onload(googleMaps);
  }


  function getGlobalGoogleMapsLibrary_() {
    var google = root.google || {};

    if (!google.maps) {
      throw new Error('Google maps library failed to load.');
    }

    return google.maps;
  }

  /** Thanks to underscore */
  function isUndefined_(obj) {
    return obj === void 0;
  }

  /** Thanks to http://jsfiddle.net/rudiedirkx/U5Tyb/1/ */
  function serialize_(obj, prefix) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push(typeof v == "object" ? serialize_(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }


  function handleLoadError_(error, onload) {
    if (onload.onerror) { onload.onerror(error); }
    else { throw error; }
  }
});
