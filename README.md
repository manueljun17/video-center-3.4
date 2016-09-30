# Video Center 3.4


Video Center Version 3.4


# TODO

* Make 'observer' function.
    secretly enter/leave lobby and room
    send message to any one secretly ( which means the message will only delever to only one user. )
        any one can send message to any one in any room.

* make a book site which has lots of books ready to use and let teacher use books on the site.

* double-check : is it really right to clear the canvas when a user resizes canvas size?

* Video arrangment.

* ***video layout mode: tile
if there is only 1 user, biggest video.
if there are 2 users, 50% of each video in one row.
if there are 3 users, first row 50%/50%, second row 50% and so on.

* ***video layout overlap:
one big video and all other videos are upon the big video.

* ***video layout list:
one video at one line.



# Coding Guide

js/ext  ---- for external libraries.
js/src  ---- for interal source codes.



# whiteboard size

    340 x 400
    480 x 600
    600 x 720


# Coding Logic or Code flow

## Room Managemnt

### Case 1. When a new user comes into 'lobby'.

* he is new and has no room. it's 'emptyroom'.

    * only inform 'lobby users'. ( O )

### Case 1.5. When an old user re-visits chat website. he has username and roomname 'lobby'.

* he has 'username' and
    * his old roomis ( programmactially ) 'empty roomname'
    * his new room is 'lobby'.
* he joins 'lobby'.
* he informs 'lobby users'.


### Case 1.6. An old user revisit. He has username and roomname 'Room A'.

* his
    * old room is ( programmactially ) 'empty roomname'
    * new room is 'Room A'
* he enters his room 'Room A'.
* he informs 'lobby room users'.
* he informs 'Room A users'.


### Case 2. When a user named 'A' creates a room named 'Room A'.

* he is in lobby.
* he create a room and join the room.

    * he informs 'lobby users'. ( O )

### Case 3. user named 'B' joins 'Room A' from 'lobby'.

* he is in lobby.
* he joins the room.

    * he informs 'lobby users'. ( O )
    * he informs 'Room A users'. ( O )


### Case 4. user named 'B' leaves 'Room A' which means He joins 'lobby'.

* he is in 'Room A'
* he joins 'lobby'
* he informs his old room ('Room A') users. ( O )
* he informs 'lobby users'. ( O )


### Case X. user named 'X' refresh his web browser when he is in lobby.

* he is in 'lobby'.
* he disconnects - he informs his disconnection to his prev room ('lobby users') for leaving.
* he informs lobby.
* GO TO : Case 1.5.



### Case Y. User 'B' refreshes web browser when he is in 'Room A'. Which means, the user may not return to the room( ending the browser. )
* he disconnects. - he informs 'Room A users' that he is leaving.
* GO TO : Case 1.6





### Case Z. User 'C' in room 'Room A' and 'C' lost internet connection for 5 seconds. He will be disconnected and he will be... where? any how?



# Install

## npm install

Do 'npm install'

