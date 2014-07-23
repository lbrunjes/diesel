 diesel.js
 =========

 Diesel is a simple event based game engine. Basically, it emits events and wires them into your game object.

 To use it:
 <ol>
 <li>include diesel.js</li>
 <li>setup a diesel game object by inheriting from diesel.proto.game</li>
 <li>run the diesel.start command passing in your game object once the dom has loaded</li>
</ol>

 The engine will start running the by emitting draw and update events from the game container element, the game listens to those and should start receiveing the events.


The game object
---------------
This is where the heavy lisfting for your game happens. For a basic example, look at the proto/game.js


Events
------
This is a list of engine events and when they are created.

**startup** called at the time the engine start cuntion is called before events are bound.

**draw** called everytime the game loop runs

**update** called every time the game loop runs, with the time delta since the last update;

**save**  (key, data) saves json data to local storage by key

**load** (key) returns jsons data from local storage by name

**listSaves** returns the possible json keys in local storage


Settings
--------

**shouldLoop** if the game shold stop after the next call to loop

**pauseOnBlur** if the loops stops if you minizime the window

**fpsLimit** maximum number from frames per second

**debug**  turns on some extra debug logging.




Subfolders
----------

 Items in many of these folders are dumped into the main object using mixins at enginge start

 **data**
 used to store details about keys. Possibly other things later on.

 **events**
enginge level events are here.  so mouse movement events, global key events, saving and laoding from local storage, and blur events

**math**
MAth functions not included in the standard math library (clamp)

**mixin**
The basic mixin functionality is added here.

**proto**
used for basic game implementations of a game, a game object, and a screen.
NOT mixed into the main object used to easily setup a baseline game object.

**sockets**
Websockets wrapper.
Matches incoming json messages by type to the diesel.game.messages space and calls the receive function if the message type is registered.

**sprites**
Simple 2d sprite implementation

**tests**
exactly what it sounds like.

**util**
items that dont really fit else where, ajax, a preoloader,  a url string parser.


Building
--------
Simply run build.sh
it uses cat to include all the files in files.txt into the library. Also creates a test script.




