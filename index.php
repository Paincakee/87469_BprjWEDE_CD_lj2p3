<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Match</title>
    <link rel="stylesheet" href="styles/styles.css">
    <script src="./js/getItems.js"></script>
</head>
<body onload="getData();">
    <div class="header-page">
        <h1>Match the picture</h1>
    </div>
    <div class="game_wrapper">
        <div class='description_wrapper'>
        <?php
        shuffle($_SESSION['dataDescription']);
        shuffle($_SESSION['dataImages']);

        foreach ($_SESSION['dataDescription'] as $description) { 
            ?>
                <div class='descriptions' data-match-id="<?= $description['matchKey'] ?>"><?= $description['description_img'] ?></div>
            <?php 
        }
        ?>
        </div>

        <div class="image_wrapper">
        <?php
        foreach ($_SESSION['dataImages'] as $img) { 
            ?>
                <img src="<?= $img['name_img'] ?>" alt="<?= basename($img['name_img']) ?>" width="200px" height="150px">
            <?php 
        }
        ?>
        </div>
    </div>

   
</body>
</html>
