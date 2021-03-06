module.exports = (app) => {
  const Event = require("../models/courseMessage");
  const axios = require("axios");
  // GET all events
  app.get("/courses", async function (req, res) {
    try {
      const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?fields[course]=@default,primary_subcategory,avg_rating`;
      axios.defaults.headers.common["Authorization"] =
        "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
      await axios.get(UdemyUrl).then((response) => {
        res.send(response.data.results);
      });
      res.end();
    } catch (error) {
      console.log(error);
    }
  });

  // GET event by id
  app.get("/courses/:search", async function (req, res) {
    try {
      const a = req.params.search;
      const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?search=${a}&fields[course]=@default,primary_subcategory,avg_rating`;
      axios.defaults.headers.common["Authorization"] =
        "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
      await axios.get(UdemyUrl).then((response) => {
        res.send(response.data.results);
      });
      res.end();
    } catch (error) {
      console.log(error);
    }
  });
};
