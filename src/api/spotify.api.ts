import axios from 'axios';

export const getProfileDetails = (headers: any) =>
  axios
    .get('https://api.spotify.com/v1/me', headers)
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
