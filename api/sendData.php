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
$timer = $_POST['time'];

$sql = "INSERT INTO `leaderboard`(`id`, `user`, `time`) VALUES (null,?,?)";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ss", $user, $timer); 

if ($stmt->execute()) {
    echo 'Created';
} else {
    echo 'Error inserting data: ' . $mysqli->error;
}