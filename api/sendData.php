<?php

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

$user = $_POST['user'];
$timer = $_POST['timer'];

$sql = "";