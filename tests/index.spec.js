import chai, { expect } from 'chai';
import sinon  from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');
describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrappper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });

    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('should use the default apiURL if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });
  describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach( () => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach( () => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.have.exist;
    });

    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with url passed', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });

    it('should call fetch with headers passed', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      const headers = {
        headers: {
          Authorization: `'Bearer foo'`,
        },
      };

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});
