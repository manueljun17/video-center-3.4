<?php
$url_self = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$url_root_dir = str_replace("upload.php", '', $url_self);
$file = $_FILES["userfile"];
//print_r($file);
if ( $file['error'] ) responseError( $file['error'] );


// Sanitize filename.
$name = $file["name"];
$upload_path = "data/upload/$name";

if ( ! @move_uploaded_file( $file['tmp_name'], $upload_path ) ) {
    $e = error_get_last();
    $error = urlencode("$e[message] at $e[line] on $e[file]");
    responseError( $error );
}
else {
    $url = "$url_root_dir$upload_path";
    responseSuccess( $url );
}

function responseError( $error )
{
    ?>
    <script>
        var data = {};
        data.success = false;
        data.error = "<?php echo $error?>";
        parent.postMessage(data, "*");
    </script>
    <?php
}

function responseSuccess( $url )
{
    ?>
    <script>
        var data = {};
        data.success = true;
        data.url = "<?php echo $url?>";
        parent.postMessage(data, "*");
    </script>
    <?php
}
?>