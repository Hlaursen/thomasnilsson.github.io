<?php

require "connection.php";

$username = "insertedUser";
$password = "newpass";

$query = "INSERT INTO User VALUES ('$username');";
$result = mysqli_query($connection, $query);

if ($result){
	echo "Insertion was succesful!";
}else{
	echo "Insertion went wrong.";
}

?>
