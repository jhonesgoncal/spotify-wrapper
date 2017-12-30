global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

let spotify = new SpotifyWrapper({
  token: 'BQCumPCEL1ktHmMFgeUyWlbMwU7Ivb3LhHXJSgtMzmAE6HOZjQOQ7VbJVxgp3GkAd6nvGCyr2jVmRALKiPuXsRsJZOwWsM6CY4bk_j3edIlD0E0Jt37KI0YwsE6cfJsBtvhgzFW4s96dD9E6NqAVRiPsbVe9DbNEcUg3Crg89xqNIO3kgQin0agDyYU0mrCm-6rAXdUw0bwz0jNjwyG6O_RnRb6dkhKCopuexjwrPaIbPyz0XFq3kDYv6a9bC2oSlzs5wdb512BO_WdNwlrSKAdlB3A0Xg',
});

const albums = spotify.search.albums('Muse');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
