<?php 

$command = escapeshellcmd('python -m pip install mysql-connector');
$output = shell_exec($command);
echo $output;

?>