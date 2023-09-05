<?php
header("Content-Type: application/json; charset=UTF-8");

include "database.php"; 
$db = connectToDatabase("BGG");
if($db == NULL) {
  http_response_code(500);
  die('{"error": true, "message": "failed to connect to DB"}');
}

$entityBody = file_get_contents('php://input');
//set to nulls if possible
$newGame = json_decode($entityBody);

if (gettype($newGame->gameId) != 'integer') {
  http_response_code(500);
  die('{"error": true, "message": id is invalid}');
}
if (gettype($newGame->gameName) != 'string') {
  http_response_code(500);
  die('{"error": true, "message": name is invalid}');
}

if (gettype($newGame->gameDesc) != 'string') {
  if (!gettype($newGame->gameDesc).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": description is invalid}');
  }
}
if (gettype($newGame->gameYear) != 'integer'){
  if (!gettype($newGame->gameYear).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": year is invalid}');
  }
}
if (gettype($newGame->gameRated) != 'double') {
  if (!gettype($newGame->gameRated).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": rating is invalid}');
  }
}
if (gettype($newGame->mintoPlay) != 'integer') {
  if (!gettype($newGame->mintoPlay).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": field is invalid}');
  }
}
if (gettype($newGame->maxToPlay) != 'integer') {
  if (!gettype($newGame->maxToPlay).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": field is invalid}');
  }
}
if (gettype($newGame->minTime) != 'integer') {
  if (!gettype($newGame->minTime).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": time is invalid}');
  }
}
if (gettype($newGame->maxTime) != 'integer') {
  if (!gettype($newGame->maxTime).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": time is invalid}');
  }
}
if (gettype($newGame->gameWeight) != 'double') {
  if (!gettype($newGame->gameWeight).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": weight is invalid}');
  }
}
if (gettype($newGame->age) != 'integer') {
  if (!gettype($newGame->age).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": age is invalid}');
  }
}
if (gettype($newGame->gameDesigners) != 'string') {
  if (!gettype($newGame->gameDesigners).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": names invalid}');
  }
}
if (gettype($newGame->gameArtists) != 'string') {
  if (!gettype($newGame->gameArtists).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": names invalid}');
  }
}
if (gettype($newGame->gamePublishers) != 'string') {
  if (!gettype($newGame->gamePublishers).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": names invalid}');
  }
}
if (gettype($newGame->gameUrl) != 'string') {
  if (!gettype($newGame->gameUrl).is_null()) {
    http_response_code(500);
    die('{"error": true, "message": text invalid}');
  }
}

//insert query here after variables are received
$query = "INSERT INTO board_games (gameId, gameName, gameDesc, gameYear, gameRated, mintoPlay, maxToPlay, minTime, maxTime, gameWeight, age, gameDesigners, gameArtists, gamePublishers, gameUrl)
          Values ($newGame->gameId, '$newGame->gameName', '$newGame->gameDesc', $newGame->gameYear, $newGame->gameRated, 
                  $newGame->mintoPlay, $newGame->maxToPlay, $newGame->minTime, $newGame->maxTime, $newGame->gameWeight, 
                  $newGame->age, '$newGame->gameDesigners', '$newGame->gameArtists', '$newGame->gamePublishers', '$newGame->gameUrl')";

$stmt = simpleQuery($db, $query);
if($stmt == NULL) {
  http_response_code(500);
  die('{"error": true, "message": "SQL error"}');
}    

?>

