// create ajax object in a synchronous way

function createXMLHttpRequest()
{
	try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
	try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	try { return new XMLHttpRequest(); } catch(e) {}
	alert("XMLHttpRequest not supported");
	return null;
}

function sendRequest(url,response_type)
{
	var xmlhttp = createXMLHttpRequest();

	if (xmlhttp)
	{
		var i;
		xmlhttp.open("GET", url, false);
		xmlhttp.send("");

		// now extract the views based on the response, repopulate array, list, and form items
		
		if(response_type == "xml")
		{
				
			return xmlhttp.responseXML;
		}
		else{
			return xmlhttp.responseText;
		    }
	}
}


