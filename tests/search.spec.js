import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searcArtists, searchTracks, searchPlaylists }  from '../src/search';

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;

 beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

   afterEach( () => {
    fetchedStub.restore();
  });
  describe('smoke tests', () => {
    // search (generico) + de 1 tipo
    // searchAlbums
    // searcArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searcArtists method', () => {
      expect(searcArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing ane type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than ane type', () => {
        const artistAndAlbums = search('Incubus', ['artist','album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({body: 'json'});
      const artist = search('Incubus', 'artist');
      expect(artist.resolveValue).to.be.eql({body: 'json'});
    });

  });

  describe('SearchArtists', () => {
    it('should call fetch function', () => {
      const artists = searcArtists('Incubus');
      expect(fetchedStub).to.be.been.calledOnce;
    });

    it('should call fetch with URL correct', () => {
      let artists = searcArtists('Incubus');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      artists = searcArtists('Muve');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Muve&type=artist');
    });
  });

  describe('SearchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.be.been.calledOnce;
    });

    it('should call fetch with URL correct', () => {
      let albums = searchAlbums('Incubus');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      albums = searchAlbums('Muve');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Muve&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
     const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.be.been.calledOnce;
    });

    it('should call fetch with URL correct', () => {
      let tracks = searchTracks('Incubus');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      tracks = searchTracks('Muve');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Muve&type=track');
    });
  });

  describe('searchPlaylist', () => {
    it('should call fetch function', () => {
     const playlists = searchPlaylists('Incubus');
      expect(fetchedStub).to.be.been.calledOnce;
    });

    it('should call fetch with URL correct', () => {
      let playlists = searchPlaylists('Incubus');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      playlists = searchPlaylists('Muve');
      expect(fetchedStub).to.be.been.calledWith('https://api.spotify.com/v1/search?q=Muve&type=playlist');
    });
  });
});
