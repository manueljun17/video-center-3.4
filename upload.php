<?php
$target_dir = "img/";
$target_file = $target_dir . basename($_FILES["userfile"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["userfile"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    $name = pathinfo($_FILES['userfile']['name'], PATHINFO_FILENAME);  
    $extension = pathinfo($_FILES['userfile']['name'], PATHINFO_EXTENSION);  
    $increment = ''; //start with no suffix
    while(file_exists($target_dir . $name . $increment . '.' . $extension)) {       
    $increment++;
    }
    $basename = $name . $increment . '.' . $extension;
    $target_file = $target_dir . $basename;
}
// Check file size
if ($_FILES["userfile"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["userfile"]["tmp_name"], $target_file)) {
        // echo "The file ". basename( $_FILES["userfile"]["name"]). " has been uploaded.";
        echo "The file ". basename( $_FILES["userfile"]["name"]);
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>