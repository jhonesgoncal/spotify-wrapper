// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon  from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach( () => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      let album = spotify.album.getAlbum('4aawyAB9vmq3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTy');

      album = spotify.album.getAlbum('4aawyAB9vmq3uQ7FjRGTk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTk');
    });

    it('should return correct data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = spotify.album.getAlbum('4aawyAB9vmq3uQ7FjRGTk');
      expect(album.resolveValue).to.be.eql({album: 'name'});

    });
  });

  describe('getAlbums', () => {

      it('should call fetch method', ()=> {
        const albums = spotify.album.getAlbums();
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('should call fetch correct URL', () => {
        const albums = spotify.album.getAlbums(['4aawyAB9vmq3uQ7FjRGTy', '4aawyAB9vmq3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmq3uQ7FjRGTy,4aawyAB9vmq3uQ7FjRGTk');
      });

      it('should return correct data from Promise', () => {
        promise.resolves({albums: 'name'});
        const albums = spotify.album.getAlbums(['4aawyAB9vmq3uQ7FjRGTy', '4aawyAB9vmq3uQ7FjRGTk']);
        expect(albums.resolveValue).to.be.eql({albums: 'name'});
      });

  });

  describe('getAlbumTracks', () => {
      it('should call fetch method', () => {
        const albumTracks = spotify.album.getTracks();
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('should call fetch with correct URL', () => {
        let albumTracks = spotify.album.getTracks('4aawyAB9vmq3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTy/tracks');

        albumTracks = spotify.album.getTracks('4aawyAB9vmq3uQ7FjRGTk');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTk/tracks');
      });

      it('should return correct data from Promise', () => {
        promise.resolves({tracks: 'name'});
        const albumTracks = spotify.album.getTracks('4aawyAB9vmq3uQ7FjRGTk');
        expect(albumTracks.resolveValue).to.be.eql({tracks: 'name'});
      });
  });

});
