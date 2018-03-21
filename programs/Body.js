

// Body object contains all couple size/vectors to locate and scale the diff parts

function Body(B_id){

this.B_id = B_id;
this.script = sendRequest(B_id,"text");
this.keyboard_vector = null;
this.keyboard_size = null;
this.buttons_vector = null;
this.buttons_size = null;
this.screen_vector = null;
this.screen_size = null;
this.size = null;
this.x=null;
this.y=null;
this.z=null;

}


Body.prototype.getScript = function(){

return this.script;

};

Body.prototype.getB_id = function(){

return this.B_id;

};

Body.prototype.set_coord_from_string = function(){

	 this.x = parseFloat(this.script.substr(0,4));
	 this.y = parseFloat(this.script.substr(5,4));
	 this.z = parseFloat(this.script.substr(10,4));
	 this.script = this.script.substring(17);
	 
	 //this.keyboard_size = new Size(parseFloat(length),parseFloat(width),parseFloat(thickness));
};


///////////Keyboard methods////////////////

Body.prototype.set_keyboard_size = function(x,y,z){
	 
	 this.keyboard_size = new Size(x,y,z);
};


Body.prototype.make_keyboard_vector = function(x,y,z){

		 
	 this.keyboard_vector = new vector3D(x,y,z);
};



///////////Buttons methods//////////////////

Body.prototype.set_buttons_size = function(x,y,z){
	 
	 this.buttons_size = new Size(x,y,z);
};


Body.prototype.make_buttons_vector = function(x,y,z){

		 
	 this.buttons_vector = new vector3D(x,y,z);
};


///////////Screen methods//////////////////

Body.prototype.set_screen_size = function(x,y,z){
	 
	 this.screen_size = new Size(x,y,z);
};


Body.prototype.make_screen_vector = function(x,y,z){

		 
	 this.screen_vector = new vector3D(x,y,z);
};



