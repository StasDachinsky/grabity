/**
 * @author EmmanuelOlaojo
 * @since 11/18/17
 */

let chai = require("chai")
  , expect = chai.expect;

let grabity = require("../lib/grabity");
let {PORT} = require("../test_setup/config");
let tags = require("../test_setup/tags");

let URL = `http://localhost:${PORT}/test`;

describe("grabity", () => {
  describe("#grabIt", () => {
    it("should return title, description, image, and favicon", async () => {
      let it = await grabity.grabIt(URL);

      expect(it.title).to.equal(tags["og:title"]);
      expect(it.description).to.equal(tags["og:description"]);
      expect(it.image).to.equal(tags["twitter:image"]);
      expect(it.favicon).to.equal("https://assets-cdn.github.com/favicon.ico");
    });
  });

  describe("#grab", () => {
    it("should return all 'twitter:' and 'og:' tags, favicon, default title tag and meta description", async () => {
      let it = await grabity.grab(URL);
      let keys = Object.keys(tags);

      for(key of keys){
        expect(it[key]).to.equal(tags[key]);
      }

      expect(it.favicon).to.equal("https://assets-cdn.github.com/favicon.ico");
    });
  });

  describe("#grab with twitter links", () => {
    it("should not crash by twitter links", async () => {
      let it = await grabity.grab("https://twitter.com/i/web/status/1085665371095363584");
      console.log('IT', it)
      expect(it['og:title']).to.equal('robert fair on Twitter')
    });
  });
});
