//contains attribute Length, With, thickness and script
// Create a new size constructor

function Size(length,width,thickness){

this.length= length;
this.width = width;
this.thickness = thickness;
this.script="";

}


Size.prototype.getLength = function(){
return this.length;
};

Size.prototype.getWidth = function(){
return this.width;
};

Size.prototype.getThickness = function(){
return this.thickness;
};

Size.prototype.getScript = function(){
return this.script;
};


Size.prototype.make_Scale_Script = function(coef_x,coef_y,coef_z){

	this.script = "Transform { scale " + coef_x +" "+ coef_y +" "+ coef_z +" children ["; 
};
