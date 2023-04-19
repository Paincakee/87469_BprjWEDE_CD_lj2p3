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
    <script src="./js/match.js"></script>
    
</head>
<body onload="">
    
    <div class="game_wrapper">
        <div class='description_wrapper'>
            <?php
            // Shuffle the arrays
            shuffle($_SESSION['dataDescription']);
            shuffle($_SESSION['dataImages']);

            // var_dump($_SESSION['dataDescription']);
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
                    <div onclick='flipCard(event);' class='descriptions click_box' data-match-id="<?= $pair['description']['matchKey'] ?>" > <h4><?=$pair['description']['description_img']?></h4> </div>
                <?php 
            }
            ?>
        </div>
        <div class="info">
            <div class="header-page">
                <h1 id="header">Match the picture</h1>
            </div>
            
            <span id="timer_text">30 Seconds</span>
            <div class="leaderboard">
                <table>
                    <?php
                    $rank = 0; 
                    // var_dump($_SESSION['leaderboard']);
                    foreach ($_SESSION['leaderboard'] as $data){ 
                        $rank++;
                        ?>
                        <tr>
                            <td class="placement"><?= $rank ?></td>
                            <td class="name"><?= $data['user'] ?></td>
                            <td class="time"><?= $data['time'] ?></td>
                        </tr>
                    <?php } ?>
                </table>
            </div>
        </div>
           
        <div class="image_wrapper">
            <?php
            shuffle($matchingPairs);
            foreach ($matchingPairs as $pair) { 
                ?>
                <img onclick="flipCard(event);" src="img/<?= $pair['img']['name_img'] ?>" alt="<?= basename($pair['img']['name_img']) ?>" data-match-id="<?= $pair['img']['matchKey'] ?>" class="images click_box">
                <?php 
            }
            ?>
        </div>
    </div>
    <script src="js/getLeaderboard.js"></script>
    <script src="js/getItems.js"></script>
</body>
</html>
