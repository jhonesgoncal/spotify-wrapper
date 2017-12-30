// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';
import sinon  from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach( () => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      let album = getAlbum('4aawyAB9vmq3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTy');

      album = getAlbum('4aawyAB9vmq3uQ7FjRGTk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTk');
    });

    it('should return correct data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('4aawyAB9vmq3uQ7FjRGTk');
      expect(album.resolveValue).to.be.eql({album: 'name'});

    });
  });

  describe('getAlbums', () => {

      it('should call fetch method', ()=> {
        const albums = getAlbums();
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('should call fetch correct URL', () => {
        const albums = getAlbums(['4aawyAB9vmq3uQ7FjRGTy', '4aawyAB9vmq3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmq3uQ7FjRGTy,4aawyAB9vmq3uQ7FjRGTk');
      });

      it('should return correct data from Promise', () => {
        promise.resolves({albums: 'name'});
        const albums = getAlbums(['4aawyAB9vmq3uQ7FjRGTy', '4aawyAB9vmq3uQ7FjRGTk']);
        expect(albums.resolveValue).to.be.eql({albums: 'name'});
      });

  });

  describe('getAlbumTracks', () => {
      it('should call fetch method', () => {
        const albumTracks = getAlbumTracks();
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('should call fetch with correct URL', () => {
        let albumTracks = getAlbumTracks('4aawyAB9vmq3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTy/tracks');

        albumTracks = getAlbumTracks('4aawyAB9vmq3uQ7FjRGTk');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmq3uQ7FjRGTk/tracks');
      });

      it('should return correct data from Promise', () => {
        promise.resolves({tracks: 'name'});
        const albumTracks = getAlbumTracks('4aawyAB9vmq3uQ7FjRGTk');
        expect(albumTracks.resolveValue).to.be.eql({tracks: 'name'});
      });
  });

});
