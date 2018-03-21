/////////////////////handle database operations link with the PHP file "x3dphone.php"////////
////////require Apache server and mysql

var user_log = false;
var user_name="";


////////////////////Get phone data from database via XML/////////
////<phone>
//////<name>n_val</name>
//////<body>b_val</body>
//////<keyboard>k_val<keyboard>...
///</phone>

function request_phone_database(user,phone)
{
	alert("in phoenDB1");
	
	var url = "programs/x3d_phone.php?u="+user+"&p="+phone+"&o=getphone"; //buld url to parse data
	
	var xmlDoc = sendRequest(url,"xml"); //ajax request with xml encoding
	alert("in phoenDB2");
	
				
		var DB_name = xmlDoc.getElementsByTagName("name").item(0).firstChild.data;
		var DB_body = xmlDoc.getElementsByTagName("body").item(0).firstChild.data;
		var DB_keyboard = xmlDoc.getElementsByTagName("keyboard").item(0).firstChild.data;
		var DB_buttons = xmlDoc.getElementsByTagName("buttons").item(0).firstChild.data;
		var DB_screen = xmlDoc.getElementsByTagName("screen").item(0).firstChild.data;
		my_topcolour_var = xmlDoc.getElementsByTagName("topcolour").item(0).firstChild.data;
		my_bottomcolour_var = xmlDoc.getElementsByTagName("bottomcolour").item(0).firstChild.data;
		my_texture_var = xmlDoc.getElementsByTagName("texture").item(0).firstChild.data;
		
		my_body_var = DB_body ;//need to set 'my_body_var' argument to make method 'is_color_body' working
		alert("in phoenDB3");			
		
		////////////Process colour operation once phone is displayed///
		 //setup new phone
		if(is_color_body()) //check colour or texture body
		{
			change_phone(DB_body,DB_keyboard,DB_buttons,DB_screen);
			
			//alert("process color"); //message on purpose to let time phone to be displayed
			
			
			
					
			setTimeout("modify_colour_X3Dnode(my_bottomcolour_var,'my_col_body')",2000); //modify bottom color in scene
			setTimeout("modify_colour_X3Dnode(my_topcolour_var,'my_col_top')",500);		//modify top colour in scene
		}else{
			
			//in this case we have to stick the texture
			
			add_in_scene(replace_imagepath(make_phone(DB_body,DB_keyboard,DB_buttons,DB_screen),my_texture_var));
		}
		
		
		
}

////////////////////////////Register a user in the database/////////

function register_database()
{
	///////get value username & password of web page via DOM//////
	
	var my_user_text= window.document.getElementById('user');
	var my_user = my_user_text.value;
		
	var my_password_text= window.document.getElementById('password');
	var my_password = my_password_text.value;
	
	if(my_user == "" )	//username field non empty
	{
		alert("enter your user name!");
	}
	
	else if(my_user.length >30  || my_password.length > 30 )
	{
		alert("username or password longer than 30 characters");
	}
	
	else
	{
		var url = "programs/x3d_phone.php?u="+my_user+"&p="+my_password+"&o=register";
					
				alert( sendRequest(url,"text"));  //print out result from server 
				user_name = my_user;
				
				document.getElementById("txtHint").innerHTML =""; //clear data of previous user
				document.getElementById("log_field").innerHTML ="";
				
				var my_button_show_profiles= window.document.getElementById('show_profiles');
		my_button_show_profiles.disabled = false;
		
		
	}

}

/////////////////////////////Log user on database///////////////////

function log_database()
{
	var my_user_text= window.document.getElementById('user'); //get user field data
	var my_user = my_user_text.value;
	
	var my_password_text= window.document.getElementById('password'); //get password field data
	var my_password = my_password_text.value;
	
	
	var url = "programs/x3d_phone.php?u="+my_user+"&p="+my_password+"&o=log";
		
	var reply= sendRequest(url,"text"); 
	
	if(reply == "yes")	///succesful request
	{
		document.getElementById('log_field').innerHTML = "<p><b>"+my_user + "</b> is log <p><input value='Log off' style='background-color:yellow' type='button' onClick=log_off()>";
		user_name = my_user;
		document.getElementById("txtHint").innerHTML =""; //clear data of previous user
		
		var my_button_show_profiles= window.document.getElementById('show_profiles');
		my_button_show_profiles.disabled = false;
	}
	else {alert("username or password incorrect!");}	//unsuccessful request
	
	

}

///////////////////////get phone profiles of a user/////////////////

function request_profiles_database()
{
	var url = "programs/x3d_phone.php?u="+user_name+"&p="+"nothing"+"&o=profiles";
	
	
	document.getElementById("txtHint").innerHTML ="";		
	document.getElementById("txtHint").innerHTML = sendRequest(url,"text"); 

}

//////////////////////Add new phone profile on database///////////////////

function save_profile_database()
{
	if(user_name == "")
	{
		alert("You need to log first!");
	}
	else
	{
		
		
	var my_profile = window.document.getElementById('profile');
	var my_profile = my_profile.value;
		
	var url = "programs/x3d_phone.php?p=empty&u="+user_name+"&o=saveprofile"+"&a="+my_body_var+"&b="+my_keyboard_var+"&c="+my_buttons_var+"&d="+my_screen_var+"&e="+my_profile+"&f="+my_topcolour_var+"&g="+my_bottomcolour_var+"&h="+my_texture_var;
			
	alert(sendRequest(url,"text")); 
	}
}

/////////////////////////display selected profile//////////

function display_profile()
{
	var my_profiles_list = window.document.getElementById('profiles_list');
	my_profiles_var = my_profiles_list.options[my_profiles_list.selectedIndex].value;
	request_phone_database(user_name,my_profiles_var);//get data of selected profile on database
}

//////////////////////////Log user off/////////////////

function log_off()
{
	var my_user_text= window.document.getElementById('user');
	my_user_text.value="";	//clear user name field
			
	var my_password_text= window.document.getElementById('password');
	my_password_text.value = "";	//clear password field
	
	document.getElementById("txtHint").innerHTML =""; //clear data of previous user
	document.getElementById("log_field").innerHTML ="";
	
	var my_button_show_profiles= window.document.getElementById('show_profiles');
	my_button_show_profiles.disabled = true;	//button disable 


}

