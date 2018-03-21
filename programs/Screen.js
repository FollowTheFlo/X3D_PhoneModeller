// phone Screen

function Screen(S_id){

this.S_id = S_id;
this.script = sendRequest(S_id,"text"); //get the file .txt on server with ajax
this.size = null;

}


Screen.prototype.getS_id = function(){
return this.S_id;
};

Screen.prototype.getScript = function(){
return this.script;
};



Screen.prototype.setSize = function(){

	 var length = this.script.substr(0,4);
	 var width = this.script.substr(5,4);
	 var thickness = this.script.substr(10,4);
	 this.script = this.script.substring(15);
	 
	 this.size = new Size(parseFloat(length),parseFloat(width),parseFloat(thickness));
	 

};


Screen.prototype.concat_Scale_Script = function(){

	this.script = this.size.getScript() + this.script + "]}";

};



