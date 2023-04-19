<?php
session_start();

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'img_matcher';

// Create a new mysqli object
$mysqli = new mysqli($host, $username, $password, $database);

// Check for errors
if ($mysqli->connect_errno) {
    die('Failed to connect to MySQL: ' . $mysqli->connect_error);
}

/////////////////
///Description///
/////////////////

$sql = "SELECT * FROM `description` ";

// Execute the query
$result = $mysqli->query($sql);

// Check for errors
if (!$result) {
    die('Failed to retrieve data from the projects table: ' . $mysqli->error);
}

// Fetch all data as an associative array
$data = $result->fetch_all(MYSQLI_ASSOC);

// Store the data in the session
$_SESSION['dataDescription'] = $data;

/////////
///Images///
/////////

$sql = "SELECT * FROM `images` ";

// Execute the query
$result = $mysqli->query($sql);

// Check for errors
if (!$result) {
    die('Failed to retrieve data from the projects table: ' . $mysqli->error);
}

// Fetch all data as an associative array
$data = $result->fetch_all(MYSQLI_ASSOC);

// Store the data in the session
$_SESSION['dataImages'] = $data;

// Free the result set
$result->free();

// Set the response header to indicate that the response contains JSON data
header('Content-Type: application/json');

// Return the data as JSON
echo json_encode($_SESSION['dataDescription']);