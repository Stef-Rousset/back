# Piiquante #

This is the code for Project 6 of the Junior Web Developer path.
The purpose is to build a gastronomic web app dedicated to sauces.
The user will be able to:
- see all sauces,
- add one sauce with an image, modify it or delete it,
- like or dislike sauces.


### Installation ###

You need to have NodeJS 12.14 or 14.0 (See https://nodejs.org/ for more informations)

Clone this repo.
Then, from within the project folder, run `npm install` to install all dependencies needed
After that, you can launch the server with `node server`.
The server should only run on `localhost` port `3000`.
You should get a message "Connexion à MongoDB réussie".
If you want to stop the server, use Ctrl + C.

### Configuration ###

This app uses MongoDB as database (See https://www.mongodb.com/)
Please create an account and set those environment variables in a .env file with
your own identifiers:
- DBPASSWORD=<your password>
- DBUSERNAME=<your username>
- MYDATABASE=<the name of your db>

You will also need to set a secret key (=a long random string) to be used by jsonwebtoken
- TOKENSECRET=<your long random string>

