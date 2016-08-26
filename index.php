<?php
/**
 * @file index.php
 */

/**
 * Configuration
 */
$socket_server_url = 'http://localhost:9001/';

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link href="css/index.css" rel="stylesheet">
    <script>
        var socket_server_url = '<?php echo $socket_server_url?>';
    </script>

    <script src="js/ext/jquery-3.1.0.min.js"></script>

    <script src="js/ext/underscore-min.js"></script>
    <script src="js/ext/underscore.string.min.js"></script>

    <script src="<?php echo $socket_server_url?>socket.io/socket.io.js"></script>


    <script>
        // if ( typeof io == 'undefined' ) alert("Socket.IO is not loaded. Please check the socket io server.");
    </script>


    <script src="js/ext/lockr.js"></script>

<?php
/*
    <script src="js/function.js"></script>
    <script src="RTCMultiConnection/dist/rmc3.min.js"></script>



    <script src="js/init.js"></script>
    <script src="js/dom-handler.js"></script>
    <script src="js/event-handler.js"></script>
    <script src="js/markup.js"></script>
    <script src="js/lobby.js"></script>
    <script src="js/action.js"></script>
    <script src="js/element.js"></script>
    <script src="js/video-center-3.2-client.js"></script>
    <script src="js/socket-event.js"></script>
    <script src="js/callback.js"></script>
*/
?>

    <script src="RTCMultiConnection/dist/rmc3.min.js"></script>
    <script data-main="js/index.js" src="js/ext/require.js"></script>
</head>
<body>



<header class="navbar">
    <span class="logo">Video English</span>
</header>

<section id="content">
    <?php include "template/entrance.php"; ?>
    <?php include "template/lobby.php"; ?>
</section>

<footer class="footer">
    <h4>Copyright</h4>
</footer>



<script>

window.addEventListener('load', function() {
    // @todo Make Sure That This Is Not Going To Be A Problem.
    // DOME 'load' & 'ready' first, before 'require.js' since it uses jQuery inside.
    // if DOM is 'loaded' later than 'requirjs', jQuery inside 'those script' will cause problem
    // becase they work with DOM which is not loaded and ready yet.
    console.log('window.addEventListener( "load", ... ) begins ');
});

</script>




</body>
</html>
