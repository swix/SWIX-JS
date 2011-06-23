

(function (window) {

	//private variables
	var
	//root api url
	apiURL = "http://example.com:8000/api/v1/",
	//authentication, SWIX Username and Generated API Key
	username,
	apiKey,
	//debug mode settings
	debugMode,
	debugMsg = function(msg)
	{
		if (debugMode)
			console.log(msg);
	},
	//utility function for setting a default param
	defaultParam = function(param, defaultVal)
	{
		if (param == undefined)
			return defaultVal;

		return param;
	},
	// execute a jsonp/GET request
	jsonp = function(path, callback, params)
	{
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';

		var prefix = '?';
		if (path.indexOf('?') >= 0)
			prefix = '&';


		var id = 1;
		//generate a unique id for the callback(jsonp padding)
		//then add the callback to the list of callbacks
		while (SWIX.jsonp_callbacks[id] !== undefined)
			id += Math.floor(Math.random()*11); //always a whole number

		//define our callback.
		//essentially calls our callback and performs some cleanup.
		SWIX.jsonp_callbacks[id] = function()
		{
			//execute callback clean up
			delete SWIX.jsonp_callbacks[id];
			callback.apply(params, arguments);

		};

		path += prefix +
				'username=' + username + "&api_key=" + apiKey +
				'&format=jsonp&callback=' +
				encodeURIComponent('SWIX.jsonp_callbacks['+ id +']');

		src = apiURL + path;
		script.setAttribute('src', src);
		debugMsg('requesting: ' + src);

		head.appendChild(script);

	},
	// local swix variable also public in window
	SWIX = window.SWIX = {};


	//initialization function, initialized username and api key
	// also initialized debug mode. (which currently doesn't really do anything)
	SWIX.init = function(user, key, debug)
	{
		username = user;
		apiKey = key;
		debugMode = defaultParam(debug, false);
		return this;
	};

	//Get All brands associated with an account
	SWIX.getBrands = function(callback, params)
	{
		endpointURL = 'brand/';
		jsonp(endpointURL, callback, params);
		return this;
	};

	//Get Metadata associated with a brand by the brands ID
	SWIX.getBrandByID = function(id, callback, params)
	{
		endpointURL = 'brand/' + id + '/';
		jsonp(endpointURL, callback, params);
		return this;
	};

	//Get List of Pods associated with a particular brand
	SWIX.getBrandPods = function(brandID, callback, params)
	{
		endpointURL = 'brand/'+ brandID + '/pod/';
		jsonp(endpointURL, callback);
		return this;
	};

	//Get Pod Metadata given a particular brand id and pod id
	SWIX.getPodByID = function(brandID, podID, callback, params)
	{
		endpointURL = 'brand/' + brandID + '/pod/' + podID + '/';
		jsonp(endpointURL, callback, params);
		return this;
	};

	//Get a pods series data
	SWIX.getPodSeriesData = function(brandID, podID, metric, graph, callback, params)
	{
		var metric = defaultParam(metric, '');
		var graph = defaultParam(graph, '');
		var queryString = ""

		if(metric != '')
		    queryString = "?fields=" + metric;

		if(graph != '')
		{
		    if( queryString != '')
		        queryString += "&graph=" + graph;
		    else
		        queryString = "?graph=" + graph;
		}

		endpointURL = 'brand/' + brandID + '/pod/' + podID + '/seriesdata/' + queryString;
		jsonp(endpointURL, callback, params)
		return this;
	};

	SWIX.jsonp_callbacks = {};
}(window));
