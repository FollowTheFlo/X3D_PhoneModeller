<?php


$u=$_GET["u"];
$p=$_GET["p"];
$operation=$_GET["o"];	//operation

$con = mysql_connect("sql.free.fr", "florent.letendre", "pingpong");

if (!$con)
 {

 die('Could not connect: ' . mysql_error());

 }

 mysql_select_db("x3dphone",$con);


////////////////////////Get target phone data//////////////

 if($operation == "getphone")
{

 	$sql="SELECT * FROM phone WHERE name = '".$p."' AND owner = '".$u."'";


 	$result = mysql_query($sql);


///////return XML file containing phone parts file name/////////////

	echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
	echo "<person>";

	while($row = mysql_fetch_array($result))
 	{

 		echo "<name>" . $row['name'] . "</name>";
		echo "<body>" . $row['body'] . "</body>";
		echo "<keyboard>" . $row['keyboard'] . "</keyboard>";
 		echo "<buttons>" . $row['buttons'] . "</buttons>";
 		echo "<screen>" . $row['screen'] . "</screen>";
 		echo "<topcolour>" . $row['topcolour'] . "</topcolour>";
 		echo "<bottomcolour>" . $row['bottomcolour'] . "</bottomcolour>";
 		echo "<texture>" . $row['texture'] . "</texture>";

 	}
	echo "</person>";

}//end if

/////////////////////////Register/////////////////

else if($operation == "register")
{
	$sql="SELECT * FROM user WHERE name = '".$u."'";
	$res = mysql_query($sql) or die('Error, insert query failed');

	if(mysql_num_rows($res)!=0)
		echo "username $u is already used!";
	else
	{

		$sql2="INSERT INTO `user` ( `id` , `name` , `password` ) VALUES (NULL , '$u', '$p')";
 		$result = mysql_query($sql2) or die('Error, insert query failed');
		echo "$u register";
	}


}

/////////////////////////Log///////////////////////

else if($operation == "log")
{

	$sql2="SELECT name FROM user WHERE name = '".$u."' AND password = '".$p."' ";


$res = mysql_query($sql2);

	if(mysql_num_rows($res)==0)
		echo "no";
	else echo "yes";

}

/////////////////////////Get phone profiles of one user///////////

else if($operation == "profiles")
{

	$sql="SELECT * FROM phone WHERE owner = '".$u."'";


$res = mysql_query($sql);

	if(mysql_num_rows($res)==0)
		echo "<p>Empty list</p>";
	else
	{
	echo "<select name='profiles_list' id='buttons_list' size='1'>";
	while($row = mysql_fetch_array($res))
	 	{

	 		echo "<option value=". $row['name'] . ">" . $row['name'] . "</option>";


	 	}

	echo "</select>";
    echo "<input style='background-color:yellow' value='Display profile' type=button onClick='display_profile()';>";


	}
}


/////////////////////////save phone profile/////////////////

else if($operation == "saveprofile")
{
	$body = $_GET["a"];
	$keyboard = $_GET["b"];
	$buttons=$_GET["c"];
	$screen=$_GET["d"];
	$profilename=$_GET["e"];
	$topcolour=$_GET["f"];
	$bottomcolour=$_GET["g"];
	$texture=$_GET["h"];


	$sql="SELECT * FROM phone WHERE owner = '".$u."' AND name = '".$profilename."' ";

	$res = mysql_query($sql);

	if(mysql_num_rows($res)==0)
	{
			$sql2="INSERT INTO `phone` ( `id` , `owner` , `name` , `body` , `keyboard` , `buttons` , `screen` , `topcolour`, `bottomcolour`,`texture` ) VALUES (NULL , '$u' , '$profilename', '$body', '$keyboard' , '$buttons' , '$screen' ,'$topcolour' , '$bottomcolour','$texture')";
			$result = mysql_query($sql2) ;

		echo "Phone saved";
	}
	else
	{
		echo "This phone name is already used";
	}

}

mysql_close($con);
?>
