// init application
// init taccess to he X3D FLUX plugin 

var browser = null;
var context = null;
var listener = null;


function init()
{
	var browser = document.FLUX.getBrowser();
	var context = browser.getExecutionContext();
	initScene("empty.x3d"); //the start animation 

}

function initScene(filename)
{
	browser = null;
	context = null;
	

    browser = document.FLUX.getBrowser();

    if (browser != null)
    {
	    listener = new Object();
	    listener.browserChanged = browserChanged;
	    browser.addBrowserListener(listener);
	    browser.loadUrlS (filename);
	}
}

function browserChanged(evt)
{
	if (evt == 0)		// BROWSER_INITIALIZED
	{
	    context = browser.getExecutionContext();
   	}
}




