<div id="lobby">
    <div id="lobby-menu">
        <h1>Lobby - <span class="username">username</span></h1>
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
        <div class="display" id='lobbyDisplay'></div>
        <form>
            <input name="message">
        </form>
    </div>
    <h4>User List</h4>
    <div class="user-list"></div>
    <h4>Room List</h4>
    <div class="room-list"></div>

</div>
