<?php
// Secret database details
abstract class DBDeets {
  const DB_USER = 'cs404web';
  const DB_PW = 'RuydM86n2xdsXuo';
  const DB_SILENT_FAIL = FALSE;
}

function connectToDatabase($databaseName) {
  $db = new mysqli('localhost', DBDeets::DB_USER, DBDeets::DB_PW, $databaseName);
  if ($db->connect_errno) {
      if (!DBDeets::DB_SILENT_FAIL) {
        echo "<!-- FAILED DB CONNECT: ($db->connect_errno) $db->connect_error -->\n";
      }
      return null;
  }
  return $db;
}

function simpleQuery($db, $query) {
  // Prepare the query
  if(!($stmt = $db->prepare($query))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      echo "<!-- FAILED QUERY PREPARE: ($db->errno) $db->error -->\n";
    }
    return null;
  }

  // Execute query
  if(!$stmt->execute()) {
    if (!DBDeets::DB_SILENT_FAIL) {
      echo "<!-- FAILED QUERY EXECUTE: check that database and statement are still open and valid -->\n";
    }
    return null;
  }

  // Store the results for SELECT queries
  if(strpos($query, 'SELECT') !== false) {
    $stmt->store_result();
  }

  // return the statement object
  return $stmt;
}

function simpleQueryParam($db, $query, $ptype, &$param) {
  // Prepare the query
  if(!($stmt = $db->prepare($query))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      echo "<!-- FAILED QUERY PREPARE: ($db->errno) $db->error -->\n";
    }
    return null;
  }

  // Bind input param
  if(!($stmt->bind_param($ptype, $param))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      echo "<!-- FAILED BIND PARAM: Did you leave a ? in your query -->\n";
    }
    return null;
  }

  // Execute query
  if(!$stmt->execute()) {
    if (!DBDeets::DB_SILENT_FAIL) {
      echo "<!-- FAILED QUERY EXECUTE: check that database and statement are still open and valid -->\n";
    }
    return null;
  }

  // Store the results for SELECT queries
  if(strpos($query, 'SELECT') !== false) {
    $stmt->store_result();
  }

  // return the statement object
  return $stmt;
}
?>