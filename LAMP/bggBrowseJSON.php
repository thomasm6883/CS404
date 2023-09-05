<?php
header("Content-Type: application/json; charset=UTF-8");

include "database.php"; 
$db = connectToDatabase("BGG");
if($db == NULL) {
  http_response_code(500);
  die('{"error": true, "message": "failed to connect to DB"}');
}


  $stmt = simpleQuery($db, "SELECT gameId, gameName, gameYear, gameUrl, gamePublishers From board_games Order by gameYear;");
  if($stmt == NULL) {
    http_response_code(500);
    die('{"error": true, "message": "SQL error"}');
  }

  $stmt->bind_result($gameId,$gameName,$gameYear,$gameUrl, $gamePublishers);

  echo "[\n";

  $firstTime = true;
  while($stmt->fetch()) {
    // Output a JSON object for the current movie
    if ($firstTime) {$firstTime=false;}
    else {echo ",";}
  ?>
    {
      "gameId": <?=json_encode($gameId)?>,
      "gameName": <?=json_encode($gameName)?>,
      "gameYear": <?=json_encode($gameYear)?>,
      "image": <?=json_encode($gameUrl)?>,
      "publishers": <?=json_encode($gamePublishers)?>
    }
  <?php
  } //end of while loop

  //end data output (close JSON array)
  echo "]\n";

// Close the database connection
$stmt->close();
$db->close();
?>