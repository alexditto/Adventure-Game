# Adventure-Game

The full game is playable at <currently not availiable>

The Adventure-Game is a simple Dungeons and Dragons lite game that utilizes a random number generator to process a simple js game.

The application uses the following dependencies
  "dependencies": {
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "connect-mongo": "^3.1.0",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-session": "^1.17.0",
    "mongoose": "^5.7.7",
    "pug": "^2.0.4"
  }
  
  The application uses node.js to run a server with epress to manage the router. 
  It uses a MongoDB database to save the user and the seperate characters that the player
  creates into two different collections. There is a independant REACT element that governs 
  the leaderboard. The major application uses Bootstrap for the majority of the CSS and the 
  leaderboard uses MaterialUI. The leaderboard also uses Elasicsearch.
  
  
