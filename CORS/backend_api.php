<?php

$conn = null;

function connect_with_db(){
	$server_name = "localhost";
	$user_name = "mimi";
	$password = "cess";
	$dbname = "learning_books";
	global $conn;
	$conn = new mysqli($server_name, $user_name, $password, $dbname);
	$sql = "SELECT * FROM  books";
	if ($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
	} 
	$result = $conn->query($sql);
	return $result;
}


function get_all_books(){
	global $conn;
	$all_books = array();
	$result = connect_with_db();
	if ($result->num_rows > 0) {
    	while($row = $result->fetch_assoc()) {
			$all_books += [$row['id'] => $row['names']]; 
    	}
	} 
	else {
    	echo "0 results";
	}
	$conn->close();
	return $all_books;
}


function get_book_by_id($id){
	$all_books = get_all_books();
	$single_book = array();
	if (array_key_exists($id, $all_books)){
		$single_book += [$id => $all_books[$id]];
	}
	return $single_book;
}

$book = null;
var_dump("testing");
if(!empty($_GET["book_id"])){
	
	global $book;	
	$book = get_book_by_id($_GET["book_id"]);
}
exit(json_encode($book));


?>


