<?php
header("Content-Type: application/json; charset=UTF-8");

include "database.php"; 
$db = connectToDatabase("BGG");
if($db == NULL) {
  http_response_code(500);
  die('{"error": true, "message": "failed to connect to DB"}');
}

if (isset($_GET['gameId'])){
  $gameId = $_GET['gameId'];

  $query = "SELECT gameName,gameDesc,gameYear,gameRated,mintoPlay,maxToPlay,minTime,maxTime,gameWeight,age,gameDesigners,gameArtists,gamePublishers,gameUrl FROM board_games WHERE gameId=?;";
  $stmt = simpleQueryParam($db, $query, "s", $gameId);
  if($stmt == NULL) {
    http_response_code(500);
    die('{"error": true, "message": "SQL error"}');
  }

  if(!$stmt->bind_result($gameName, $gameDesc, $gameYear, $gameRated, $minToPlay, $maxToPlay, $minTime,
    $maxTime, $gameWeight, $age, $gameDesigners,$gameArtists,$gamePublishers,$gameUrl)) {
      http_response_code(500);
      die('{"error": true, "message": "Binding error"}');
  }

  if($stmt->fetch()) {
    $gameObj = array(
     "gameId"=>$gameId,
     "gameName"=>$gameName, 
     "gameDesc"=>$gameDesc,
     "gameYear"=>$gameYear,
     "gameRated"=>$gameRated,
     "mintoPlay"=>$minToPlay,
     "maxToPlay"=>$maxToPlay,
     "minTime"=>$minTime,
     "maxTime"=>$maxTime,
     "gameWeight"=>$gameWeight,
     "age"=>$age,
     "gameDesigners"=>$gameDesigners,
     "gameArtists"=>$gameArtists,
     "gamePublishers"=>$gamePublishers,
     "gameUrl"=>$gameUrl
   );
   echo json_encode($gameObj);
  }
  else {
    http_response_code(404);
    die('{"error": true, "message": "not found"}');
  }
} 

else {
  http_response_code(404);
  echo '{"Error": "missing id"}';
}
// Close the database connection
$stmt->close();
$db->close();
?>