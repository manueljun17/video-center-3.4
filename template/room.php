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
            <div class="display"></div>
            <form>
                <input name="message">
            </form>
            <div class="user-list"></div>
        </div>
        

        <div class="whiteboard">
            <div class="container">
                <img class="book" src="img/whiteboard-first-page.jpg">
                <nav>
                    <button class="clear btn btn-primary btn-sm"><i class="fa fa-file-o" aria-hidden="true"></i> <span>Clear Whiteboard</span></button>
                    <button class="eraser btn btn-primary btn-sm"><i class="fa fa-eraser" aria-hidden="true"></i> <span>Eraser</span></button>
                    <button class="draw btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> <span>Draw</span></button>
                    <select>
                        <option value="0">Line size</optoin>
                        <option value="1">Extra Small</option>
                        <option value="2">Small</option>
                        <option value="3">Medium</option>
                        <option value="5">Large</option>
                        <option value="10">Extra Large</option>
                    </select>
                    
                    <select>
                        <option value="0">Line Color</optoin>
                        <option value="1">Black</option>
                        <option value="2">White</option>
                        <option value="5">Red</option>
                        <option value="3">Blue</option>
                        <option value="10">Green</option>
                    </select>
                </nav>
                <canvas id="whiteboard-canvas"></canvas>
            </div><!--/.wrapper-->
        </div><!--/.whiteboard-->

        

    </main>



    
    <footer class="footer">
        <h4>Copyright</h4>
    </footer>

</div>