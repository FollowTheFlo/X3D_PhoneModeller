// Create 3D vector to translate part at the appropriate location in the scene
//contains attribute x, y, z and script

function vector3D(x,y,z){

this.x= x;
this.y = y;
this.z = z;
this.script="";

}


vector3D.prototype.getX = function(){
return this.x;
};

vector3D.prototype.getY = function(){
return this.y;
};

vector3D.prototype.getZ = function(){
return this.z;
};

vector3D.prototype.getScript = function(){
return this.script;
};

vector3D.prototype.makeScript = function(){

	this.script = "Transform { translation " + this.x +" "+ this.y +" "+ this.z +" children ["; 

};



