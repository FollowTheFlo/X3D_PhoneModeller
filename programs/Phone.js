
//phone.js assembles the phone parts together
// Phone object contains body,keyboard,buttons,scren

function Phone(){

this.body = null;
this.keyboard = null;
this.buttons = null;
this.screen = null;
this.script = "";

}

Phone.prototype.makeKeyboard = function(K_id){

	this.keyboard = new Keyboard(K_id);
	
	this.keyboard.setSize();
	

};

Phone.prototype.makeBody = function(B_id){

	this.body = new Body(B_id);
		
	this.body.set_coord_from_string();	//get 1st line of param in txt file
	this.body.set_keyboard_size(this.body.x,this.body.y,this.body.z);
	
	///get value
	this.body.set_coord_from_string();	//get 2nd line of param in txt file
	this.body.set_buttons_size(this.body.x,this.body.y,this.body.z);
	
	this.body.set_coord_from_string();	//get 3rd line of param in txt file
	this.body.set_screen_size(this.body.x,this.body.y,this.body.z);


};

Phone.prototype.makeButtons = function(Bu_id){

	this.buttons = new Buttons(Bu_id);
	
	this.buttons.setSize();

}


Phone.prototype.makeScreen = function(S_id){

	this.screen = new Screen(S_id);
	
	this.screen.setSize();

}


Phone.prototype.getScript = function(){

	return this.script;

};

Phone.prototype.combine_scripts = function(){

	
	this.script= this.body.keyboard_vector.getScript()+this.keyboard.getScript() +"]}"+ this.body.buttons_vector.getScript()+this.buttons.getScript()+"]}"+ this.body.screen_vector.getScript()+this.screen.getScript()+"]}"+this.body.getScript();
	return this.script;
};


////////////////////Keyboard methods///////////////////////////////


Phone.prototype.get_keyboard_translation = function(){

	this.body.set_coord_from_string();
	this.body.make_keyboard_vector(this.body.x,this.body.y,this.body.z);
	this.body.keyboard_vector.makeScript();

};


Phone.prototype.fit_keyboard = function(){

	var coef_x = parseFloat(this.body.keyboard_size.getLength()/this.keyboard.size.getLength());
	var coef_y = parseFloat(this.body.keyboard_size.getWidth()/this.keyboard.size.getWidth());
	var coef_z = parseFloat(this.body.keyboard_size.getThickness()/this.keyboard.size.getThickness());

	this.keyboard.size.make_Scale_Script(coef_x,coef_y,coef_z);
	this.keyboard.concat_Scale_Script();

};



/////////////////////Buttons methods/////////////////////////////////////

Phone.prototype.fit_buttons = function(){

var coef_x1 = parseFloat(this.body.buttons_size.getLength()/this.buttons.size.getLength());
var coef_y1 = parseFloat(this.body.buttons_size.getWidth()/this.buttons.size.getWidth());
var coef_z1 = parseFloat(this.body.buttons_size.getThickness()/this.buttons.size.getThickness());


this.buttons.size.make_Scale_Script(coef_x1,coef_y1,coef_z1);
this.buttons.concat_Scale_Script();

};

Phone.prototype.get_buttons_translation = function(){

	this.body.set_coord_from_string();
	this.body.make_buttons_vector(this.body.x,this.body.y,this.body.z);
	this.body.buttons_vector.makeScript();
	
};


///////////////////Screen methods/////////////////////////

Phone.prototype.fit_screen = function(){

var coef_x1 = parseFloat(this.body.screen_size.getLength()/this.screen.size.getLength());
var coef_y1 = parseFloat(this.body.screen_size.getWidth()/this.screen.size.getWidth());
var coef_z1 = parseFloat(this.body.screen_size.getThickness()/this.screen.size.getThickness());


this.screen.size.make_Scale_Script(coef_x1,coef_y1,coef_z1);
this.screen.concat_Scale_Script();

};

Phone.prototype.get_screen_translation = function(){

	this.body.set_coord_from_string();
	this.body.make_screen_vector(this.body.x,this.body.y,this.body.z);
	this.body.screen_vector.makeScript();
	
};


