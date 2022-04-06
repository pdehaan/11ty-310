const fetch = require("node-fetch");

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode("stargazers", async function (orgRepo = "") {
    const res = await fetchStargazers(orgRepo);
    return `<p>${res.stargazers} GitHub Stars</p>`;
  });

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};

async function fetchStargazers(orgRepo = "") {
  return fetch(`https://api.github.com/repos/${orgRepo}`)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      return {
        stargazers: json.stargazers_count
      };
    });
}
