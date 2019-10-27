# codeceptjs-resources-check
Codeceptjs helper. Load a URL with Puppeteer and listen to the requests while the page is loading.


##Usage
Run a browser with puppeteer and spy the resources loaded in a specific url.
You can ask questions about these resources later on.

### I.spyTheResourcesLoadedIn(url)
Open a new tab in the browser, listen to the resources the page asks for until it is fully loaded.
Close the tab.

###  I.checkTheNumberOfResources(number)
Check that the page loads the exact `number` of resources.

###  I.checkTheResource(pattern, expectedSize) 
Check that the page only calls for one resource that matches with the `pattern` and has `expectedSize` while taking in consideration 
a `threshold` that you can set up in the helper configuration. 

 
###  I.checkTheResources(pattern, expectedSize) 
Check that the sum of all sizes of the resources that match with the `pattern` and  has `expectedSize`  while taking in consideration 
a `threshold` that you can set up in the helper configuration. 
 
###  I.checkTheResourceType(contentType, expectedSize) 
Check that the sum of all sizes  of the resources have a specific `contentType` and  has `expectedSize`  while taking in consideration 
a `threshold` that you can set up in the helper configuration. 
 
###  I.checkAllResources(expectedSize) 
Check that the sum of all sizes of the resources has `expectedSize`  while taking in consideration 
a `threshold` that you can set up in the helper configuration. 
  
###  I.checkTheNumberOfResource(pattern, expectedNumber)
Check that the number of the resources that match with a specific `pattern` is `expectedNumber`.
  
###  I.checkTheNumberOfResourceType(contentType, expectedNumber)
Check that the number of the resources that  have a specific `contentType` is `expectedNumber`.
  
  
##Config:
You can add these lines into your `codecept.conf.js`
```
  helpers: {
    CodeceptjsResourcesCheck: {
      require: './helpers/codeceptjs-resources-check/index.js',
      threshold: 0.2
    }
  },
```

`threshold` by default is 0. 


##Example of usage in a Scenario:

```
Scenario('test something', async (I) => {

    // You have lunch the brower, maybe in your before step 
    const browser = await puppeteer.launch();

    await I.spyTheResourcesLoadedIn('https://stackoverflow.com/');

    I.checkTheNumberOfResources(49);

    // I.checkTheResource(/vendor-[A-Za-z0-9]{20}\.js/, 248524);
    I.checkTheResource(/full-anon/, 67707);

    I.checkTheResources(/\.js$/, 67707);

    I.checkTheResourceType('text/css', 104525);
    I.checkAllResources(387616);

    I.checkTheNumberOfResourceType('text/javascript', 1);

    // Remember to close your browser, maybe in your after step 
    await browser.close();
});
```


