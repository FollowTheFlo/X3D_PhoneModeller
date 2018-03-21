// phone Buttons controls

function Buttons(C_id){

this.C_id = C_id;
this.script = sendRequest(C_id,"text"); //get the file .txt on server with ajax
this.size = null;

}


Buttons.prototype.getC_id = function(){
return this.C_id;
};

Buttons.prototype.getScript = function(){
return this.script;
};



Buttons.prototype.setSize = function(){

	 var length = this.script.substr(0,4);
	 var width = this.script.substr(5,4);
	 var thickness = this.script.substr(10,4);
	 this.script = this.script.substring(15);
	 
	 this.size = new Size(parseFloat(length),parseFloat(width),parseFloat(thickness));
	 

};


Buttons.prototype.concat_Scale_Script = function(){

	this.script = this.size.getScript() + this.script + "]}";

};



