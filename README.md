# Spotifest

Spotifest is a web application that uses **Spotify data to generate your ideal festival poster**. After the user successfully logged in with his Spotify cridentials it shows a poster with his top artists.

You can change the time range and theme of the poster. The data will be more accurate if you're a frequent Spotify user.

![Screenshot](screenshot.png)

## Technologies

- [create-react-app](https://github.com/facebook/create-react-app) - Used as boilerplate
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - To authenticate and get top artist data
- [Heroku](https://www.heroku.com/) - Deploy and run

## How to run locally

**Back-end**

You need a basic back-end server to perform oauth authentication with the Spotify Web API. I've used an online template that takes 5 minutes to set up.

1.  Create a Spotify app on your [developer account dashboard](https://developer.spotify.com/dashboard/applications).

2.  Follow [mpj's](https://github.com/mpj) instructions on [oauth-bridge-template](https://github.com/mpj/oauth-bridge-template) to get the server up and running.

3.  For this specific app you'll need to add `user-top-read` to the `scope` on `line 16`. You can find more information about the Spotify Web API's authorization scope [here](https://developer.spotify.com/documentation/general/guides/scopes/).

**Front-end**

To set up the front-end simply clone this repository, install dependencies, and start the local server.

```
$ git clone https://github.com/wouterlanduydt/Spotifest.git
$ cd Spotifest/
$ yarn
$ yarn start
```

## Extra

The background of the poster is the profile image of the authenticated user with an svg duotone effect. This matches Spotify's style very well. Users can select the color effect of their choice.

## Credits

- [mpj](https://github.com/mpj) - [oauth-bridge-template](https://github.com/mpj/oauth-bridge-template)
- [Lentie Ward](https://codepen.io/lentilz) - [Duotone SVG Filters](https://codepen.io/lentilz/pen/mPOKdG/)
