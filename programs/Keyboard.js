// Create a new keyboard constructor

function Keyboard(K_id){

this.K_id = K_id;
this.script = sendRequest(K_id,"text");
this.size = null;

}


Keyboard.prototype.getK_id = function(){
return this.K_id;
};

Keyboard.prototype.getScript = function(){
return this.script;
};



Keyboard.prototype.setSize = function(){

	 var length = this.script.substr(0,4);
	 var width = this.script.substr(5,4);
	 var thickness = this.script.substr(10,4);
	 this.script = this.script.substring(15);
	 
	 this.size = new Size(parseFloat(length),parseFloat(width),parseFloat(thickness));
	 

};


Keyboard.prototype.concat_Scale_Script = function(){

	this.script = this.size.getScript() + this.script + "]}";

};



