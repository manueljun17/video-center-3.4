<?php 
$filenameArray = [];

$handle = opendir(dirname(realpath(__FILE__)).'/img/');
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..'){
                array_push($filenameArray, "img/$file");
            }
        }

echo json_encode($filenameArray);
?>