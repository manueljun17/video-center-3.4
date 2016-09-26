<?php

$data = $_POST['userfile'];
$data = str_replace('data:image/jpg;base64,', '', $data);
$data = str_replace(' ', '+', $data);

$img = base64_decode($data);

$path = 'img/' . uniqid() . '.jpg';
if(file_put_contents($path, $img)){
    print $path;
}
else {
    header('HTTP/1,1 500 Internal Server Error');
}

?>