#SWIX-JS

A read-only interface to the SWIX REST Api.


#Using the SWIX-JS Library

You can load the SWIX Javascript library one of 2 ways.

```html
	<script type="text/javascript" src="www.yourwebsite.com/swix.js">
```
or when the API is publicly available you will be able to load the source
Javascript directly from SWIX.

```html
	<script type="text/javascript" src="www.swixapp.com/media/js/swix.1.0.js">
```


SWIX-JS uses [jsonp](http://en.wikipedia.org/wiki/JSONP) to fetch data with
the SWIX api.


Initialize the Library

```javascript
	SWIX.init('username', 'apikey')
```

Fetch a list of brands

``` javascript
	SWIX.getBrands(function(data){
		console.log(data);
	});

	//output
	{
		[
			{
				"brand": "/api/v1/brand/1/",
				"created_at": "2011-04-20T12:31:04",
				"date": "2011-04-14T00:00:00",
				"id": "1",
				"name": "test"
			},
			{
				"brand": "/api/v1/brand/2/",
				"created_at": "2011-04-20T12:31:04",
				"date": "2011-04-14T00:00:00",
				"id": "2",
				"name": "test 2"
			}
		]
	}

```

Fetch a Brand by its ID

```
	SWIX.getBrandByID(1, function(data){
		console.log(data);
	});

	//output
	{
		"brand": "/api/v1/brand/1/",
		"created_at": "2011-04-20T12:31:04",
		"date": "2011-04-14T00:00:00",
		"id": "1",
		"name": "test"
	},
```

Fetch a List of pods in a particular Brand

```
	SWIX.getBrandPods(1, function(data){
		console.log(data);
	});
	//output
	{
		"meta":
		{
			"limit": 20,
			"next": null,
			"offset": 0,
			"previous": null,
			"total_count": 1
		},
		"objects":
		[
			{
				"active": true,
				"brand": "/api/v1/brand/1/",
				"created_at": "2011-06-15T09:22:28",
				"error_count": 0,
				"id": "2",
				"name": "Mike Grouchy",
				"seriesdata": "/api/v1/brand/1/pod/2/seriesdata/"
			}
		]
	}
```

Fetch a Pod given a Brand ID and a Pod ID.

```
	SWIX.getPodById(1, 2, function(data){
		console.log(data);
	});
	//output
	{
		"pod": "/api/v1/brand/1/pod/2",
		"active": true,
		"brand": "/api/v1/brand/1/",
		"created_at": "2011-06-15T09:22:28",
		"error_count": 0,
		"id": "2",
		"name": "Mike Grouchy",
		"seriesdata": "/api/v1/brand/38/pod/1/seriesdata/"
	}
```

Get the a Pods Series Data given a Brand ID and a Pod ID.
Optionally specify an arbitrary metric to retrieve
Note: Currently only highcharts format is supported, eventually
you will be able to request other

```
	SWIX.getPodSeriesData(1, 2, , function(data){
		console.log(data);
	});

	//assuming a twitter pod and we want to get the follower data
	SWIX.getPodSeriesData(1, 2, 'followers', function(data){
		console.log(data);
	});

	//result
	{
		"metric": "followers",
		"series": [[1299823200000, 12], [1299909600000, 13],
			[1299996000000, 13], [1300078800000, 14], [1300165200000, 13],
			[1300251600000, 14], [1300338000000, 13], [1300424400000, 13],
			[1300510800000, 13], [1300597200000, 13], [1300683600000, 13],
			[1300770000000, 12], [1300856400000, 12], [1300942800000, 12],
			[1301029200000, 12], [1301115600000, 11], [1301202000000, 12],
			[1301288400000, 11], [1301374800000, 12], [1301461200000, 12],
			[1301547600000, 12], [1301634000000, 14], [1301720400000, 12],
			[1301806800000, 12], [1301893200000, 13], [1301979600000, 13],
			[1302066000000, 13], [1302152400000, 13], [1302238800000, 13],
			[1302325200000, 12], [1302411600000, 12], [1302498000000, 12],
			[1302584400000, 12], [1302670800000, 14], [1302757200000, 12],
			[1302843600000, 13], [1302930000000, 13], [1303016400000, 13],
			[1303102800000, 13], [1303189200000, 16], [1303275600000, 14]]
	}

```


