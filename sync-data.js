console.log("Syncing data from airtable...")

const Airtable = require("airtable");
const fs = require('fs');
const path = require('path');

let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appwhbSqHuGVFZRpB');

let loadData = function (airtableName, localFileName) {
  let results = [];
  base(airtableName).select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      results.push(record.fields);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    let newFileContents = `
      export default ${JSON.stringify(results)}
    `

    fs.writeFileSync(path.resolve(__dirname, localFileName), newFileContents, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log(`Saved ${results.length} rows to ${localFileName}!`);
    });

    if (err) { console.error(err); return; }
  });
}



loadData('Corporate Causes', 'src/data/causes.js');
loadData('Climate Effects', 'src/data/effects.js');
