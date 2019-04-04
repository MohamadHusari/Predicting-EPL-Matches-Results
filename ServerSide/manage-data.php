<?php
header('Access-Control-Allow-Origin: *');
   // Define database connection parameters
   $hn      = '127.0.0.1';
   $un      = '**';
   $pwd     = '**';
   $db      = '**';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);

    $json    =  file_get_contents('php://input');
   // Retrieve the posted data
    //echo "mohamad 1";
   if (strlen($json) > 0 && ($obj = json_decode($json)))
   {
        //$key     =  $obj->{'key'};
        $key     =  strip_tags($obj->key);
       // Determine which mode is being requested
       switch($key)
       {
               
               
             case "SoonFixtures":

             // Attempt to run PDO prepared statement
             try {
                //$sql 	= "INSERT INTO technologies(name, description) VALUES(:name, :description)";
                $sql = "SELECT * FROM SoonFixtures";
                $stmt 	= $pdo->prepare($sql);
                $stmt->execute();
                //$list=array();
                if($stmt->rowCount() > 0) { 
                    //$list[] = array('result' => 'true');
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    //array_push($list,$arr);
                    echo json_encode(
                    /*array(
                        'result'  => 'value',
                        key2 => value2,
                        key3 => value3,
                        ...
                    ) */
                        $arr
                    );
                } 
                 /*
                else {
                    $list[] = array('result' => 'false');
                    echo json_encode($list);
                }*/

             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
               
               case "GetSeasons":

             // Attempt to run PDO prepared statement
             try {
                //$sql 	= "INSERT INTO technologies(name, description) VALUES(:name, :description)";
                $sql = "SELECT * FROM LeagueSeasons ORDER BY years ASC";
                $stmt 	= $pdo->prepare($sql);
                $stmt->execute();
                if($stmt->rowCount() > 0) { 
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode(
                        $arr
                    );
                } 
             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
               
               case "GetMatchGoals":

             // Attempt to run PDO prepared statement
               $fix_id	  = filter_var($obj->fix_id, FILTER_VALIDATE_INT);
             try {
                //$sql 	= "INSERT INTO technologies(name, description) VALUES(:name, :description)";
                $sql = "SELECT * FROM MatchesGoals WHERE id_fixture=:fix_id AND (goal_type_code = 'ng' OR goal_type_code = 'og' OR goal_type_code = 'p') ORDER BY elapsed ASC";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindValue(':fix_id', $fix_id, PDO::PARAM_INT);
                $stmt->execute();
                if($stmt->rowCount() > 0) { 
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode(
                        $arr
                    );
                } 
             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
               
               case "GetMatchPredict":

             // Sanitise URL supplied values
             $homeid 		     = filter_var($obj->homeid, FILTER_VALIDATE_INT);
             $awayid	  = filter_var($obj->awayid, FILTER_VALIDATE_INT);
             // Attempt to run PDO prepared statement
             try {
                $sql = "SELECT * FROM Prediction WHERE Home_team=:homeid AND Away_team=:awayid";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindValue(':homeid', $homeid, PDO::PARAM_INT);
                $stmt->bindValue(':awayid', $awayid, PDO::PARAM_INT);
                $stmt->execute();
                if($stmt->rowCount() > 0) { 
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode(
                        $arr[0]
                    );
                } 

             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
               
            case "GetMatches":

             // Sanitise URL supplied values
             $yearid 		     = filter_var($obj->yearid, FILTER_VALIDATE_INT);
             $roundnum	  = filter_var($obj->roundnum, FILTER_VALIDATE_INT);
             // Attempt to run PDO prepared statement
             try {
                $sql = "SELECT * FROM MatchesFixtures WHERE id_season=:yearid AND round=:roundnum";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindValue(':yearid', $yearid, PDO::PARAM_INT);
                $stmt->bindValue(':roundnum', $roundnum, PDO::PARAM_INT);
                $stmt->execute();
                if($stmt->rowCount() > 0) { 
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode(
                        $arr
                    );
                } 

             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
               
        // Add a new record to the technologies table
          case "checkuserpassvalid":

             // Sanitise URL supplied values
             $username 		     = filter_var($obj->user, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
             $password	  = filter_var($obj->pass, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_LOW);

             // Attempt to run PDO prepared statement
             try {
                //$sql 	= "INSERT INTO technologies(name, description) VALUES(:name, :description)";
                $sql = "SELECT * FROM users WHERE username=:username AND password=:userpass";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                $stmt->bindParam(':userpass', $password, PDO::PARAM_STR);
                $stmt->execute();
                $list=array();
                if($stmt->rowCount() > 0) { 
                    $list[] = array('result' => 'true');
                    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    array_push($list,$arr);
                    echo json_encode(
                    /*array(
                        'result'  => 'value',
                        key2 => value2,
                        key3 => value3,
                        ...
                    ) */
                        $list
                    );
                } 
                else {
                    $list[] = array('result' => 'false');
                    echo json_encode($list);
                }

             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;

          // Add a new record to the technologies table
          case "create":

             // Sanitise URL supplied values
             $name 		     = filter_var($obj->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
             $description	  = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

             // Attempt to run PDO prepared statement
             try {
                $sql 	= "INSERT INTO technologies(name, description) VALUES(:name, :description)";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':description', $description, PDO::PARAM_STR);
                $stmt->execute();

                echo json_encode(array('message' => 'Congratulations the record ' . $name . ' was added to the database'));
             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;



          // Update an existing record in the technologies table
          case "update":

             // Sanitise URL supplied values
             $name 		     = filter_var($obj->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
             $description	  = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
             $recordID	     = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

             // Attempt to run PDO prepared statement
             try {
                $sql 	= "UPDATE technologies SET name = :name, description = :description WHERE id = :recordID";
                $stmt 	=	$pdo->prepare($sql);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':description', $description, PDO::PARAM_STR);
                $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
                $stmt->execute();

                echo json_encode('Congratulations the record ' . $name . ' was updated');
             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;



          // Remove an existing record in the technologies table
          case "delete":

             // Sanitise supplied record ID for matching to table record
             $recordID	=	filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

             // Attempt to run PDO prepared statement
             try {
                $pdo 	= new PDO($dsn, $un, $pwd);
                $sql 	= "DELETE FROM technologies WHERE id = :recordID";
                $stmt 	= $pdo->prepare($sql);
                $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
                $stmt->execute();

                echo json_encode('Congratulations the record ' . $name . ' was removed');
             }
             // Catch any errors in running the prepared statement
             catch(PDOException $e)
             {
                echo $e->getMessage();
             }

          break;
          default:
           echo "i is not equal to 0, 1 or 2";
       }
   }
?>