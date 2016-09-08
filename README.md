# Video Center 3.4


Video Center Version 3.4


# TODO

Hide typescript source code by submodule.

Put typescript submodule in private git server.

* refactor folder strcuture


# Coding Guide

js/ext  ---- for external libraries.
js/src  ---- for interal source codes.


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

