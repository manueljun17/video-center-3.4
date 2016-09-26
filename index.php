<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link href="css/index.css" rel="stylesheet">
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <script src="js/ext/jquery-3.1.0.min.js"></script>

    <script src="js/ext/underscore-min.js"></script>
    <script src="js/ext/underscore.string.min.js"></script>    
    <?php
        $url_server = "http://dev.withcenter.com:9001/";
        // $url_server = "http://localhost:9001/";    
    ?>
    <script src="http://dev.withcenter.com:9001/socket.io/socket.io.js"></script>
    <!--<script src="http://localhost:9001/socket.io/socket.io.js"></script>-->

    <script>
        // if ( typeof io == 'undefined' ) alert("Socket.IO is not loaded. Please check the socket io server.");
    </script>


    <script src="js/ext/lockr.js"></script>

    <script src="RTCMultiConnection/dist/rmc3.min.js"></script>
    <script src="js/src/function.js"></script>
    <script data-main="js/src/index.js" src="js/ext/require.js"></script>
</head>

<body>


    <div id="entrance">
        <header>
            <span class="logo">Video English</span>
        </header>
        <form>
            <input name="username" placeholder="Input Username" />
            <input type="submit" value="Log In" />
        </form>
        <footer class="footer">
            <h4>Copyright</h4>
        </footer>
    </div>
    <div id="lobby">
        <header>
            <span class="logo">Lobby: TITLE ...</span>
        </header>
        <div id="lobby-menu">
            <h1>Lobby <span class="my-name"></span></h1>
            <button class="update-username">Update Username</button>
            <button class="create-room">Create Room</button>
            <button class="logout">Logout</button>
        </div>
        <div id="lobby_form_username">
            <form>
                <h4>Update Username</h4>
                <input name="username" placeholder="Input user name" />
                <input type="submit" value="Update">
            </form>
        </div>
        <div id="lobby_form_roomname">
            <form>
                <h4>Create Room</h4>
                <input name="roomname" placeholder="Input room name" />
                <input type="submit" value="Create">
            </form>
        </div>
        <div class="chat">
            <h4>Lobby</h4>
            <div class="display"></div>
            <form>
                <input name="message">
            </form>
        </div>
        <h4>Room List</h4>
        <div class="room-list"></div>
        <footer class="footer">
            <h4>Copyright</h4>
        </footer>
    </div>
    <div id="room">
        <header>
            <span class="logo">LOGO</span>
            <span class="roomname">...</span>
            <span class="buttons">
            <button type="button" class="room-leave">Leave</button>
            <button type="button" class="whiteboard">Whiteboard</button>
        </span>
        </header>

        <main>
            <div class="chat">
                <div class="user-list"></div>
                <div class="display"></div>
                <form>
                    <input name="message">
                </form>

            </div>
            
            <!--Document-->
            <div class="document">
                <span class="books">Books</span>
                <div class="container">
                    <select name="books" class="btn">
                        <option value="">Books</option>
                        <option value="Let's Go">Let's Go</option>
                        <option value="Side By Side">Side By Side</option>
                        <option value="Express Yourself">Express Yourself</option>
                        <option value="Speak Your Mind">Speak Your Mind</option>
                    </select>

                    <a class="btn folder_up">
                        <i class="fa fa-level-up" title="One folder up" aria-hidden="true"></i>
                        <span class="sr-only">One folder up</span>
                    </a>
                    <div class="file-upload">
                        <form target="_hidden_file_upload_frame" enctype="multipart/form-data" action="<?php echo $url_server?>upload.php" method="POST">
                        <!--<form target="_hidden_file_upload_frame" enctype="multipart/form-data" method="POST">-->
                            <input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
                            <input name="userfile" type="file" />
                        </form>
                    </div>
                </div>
                <div class="document-content"></div>

            </div>

            <!--Document-->

            <!--Whiteboard-->
            <div class="whiteboard">
                <div class="container">
                    <img class="book" src="img/white.jpg">
                    <canvas id="whiteboard-canvas" height="535px" width="1035px"></canvas>

                    <nav>
                        <button class="clear btn btn-primary btn-sm"><i class="fa fa-file-o" aria-hidden="true"></i> <span>Clear Whiteboard</span></button>
                        <button class="eraser btn btn-primary btn-sm"><i class="fa fa-eraser" aria-hidden="true"></i> <span>Eraser</span></button>
                        <button class="draw btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> <span>Draw</span></button>
                        <div class="line-size selectBox">
                            <span class='selected'></span>
                            <div class="options">
                                <option value="1" class="option">Line size</optoin>
                                    <option value="2" class="option">Extra Small</option>
                                    <option value="3" class="option">Small</option>
                                    <option value="4" class="option">Medium</option>
                                    <option value="5" class="option">Large</option>
                                    <option value="8" class="option">Extra Large</option>
                            </div>
                        </div>

                        <div class="colors selectBox">
                            <span class='selected'></span>
                            <div class="options">
                                <option value="Default" class="option">Line Color</optoin>
                                    <option value="Black" class="option">Black</option>
                                    <option value="Grey" class="option">Grey</option>
                                    <option value="White" class="option">White</option>
                                    <option value="Red" class="option">Red</option>
                                    <option value="Green" class="option">Green</option>
                                    <option value="Blue" class="option">Blue</option>
                            </div>
                        </div>
                    </nav>
                    
                </div>
                <!--/.container-->
            </div>
            <!--/.whiteboard-->
        </main>
        
        <footer class="footer">
            <h4>Copyright</h4>
        </footer>
    </div>

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