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
    <script src="./js/match.js"></script>
</head>
<body onload="getData();">
    <div class="header-page">
        <h1>Match the picture</h1>
    </div>
    <div class="game_wrapper">
        <div class='description_wrapper'>
            <?php
            // Shuffle the arrays
            shuffle($_SESSION['dataDescription']);
            shuffle($_SESSION['dataImages']);

            $matchingPairs = array();
            foreach ($_SESSION['dataDescription'] as $description) {
                foreach ($_SESSION['dataImages'] as $img) {
                    if ($description['matchKey'] == $img['matchKey']) {
                        $matchingPairs[] = array('description' => $description, 'img' => $img);
                        break;
                    }
                }
                if (count($matchingPairs) >= 5) {
                    break;
                }
            }

            foreach ($matchingPairs as $pair) { 
                ?>
                    <div onclick='flipCard(event);' class='descriptions click_box' data-match-id="<?= $pair['description']['matchKey'] ?>" ><?=$pair['description']['description_img']?></div>
                <?php 
            }
            ?>
        </div>
        <div class="info">
            <span id="timer_text">30 Seconds</span>
            <div class="leaderboard">Hallp</div>
        </div>
           
        <div class="image_wrapper">
            <?php
            shuffle($matchingPairs);
            foreach ($matchingPairs as $pair) { 
                ?>
                <img onclick="flipCard(event);" src="img/<?= $pair['img']['name_img'] ?>" alt="<?= basename($pair['img']['name_img']) ?>" data-match-id="<?= $pair['img']['matchKey'] ?>" width="200px" height="150px" class="images click_box">
                <?php 
            }
            ?>
        </div>
    </div>


   
</body>
</html>
