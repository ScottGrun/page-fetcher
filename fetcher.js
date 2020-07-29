const request = require("request");
const fs = require("fs");
const userArgs = process.argv.slice(2);

const downloadPage = (pageUrl, downloadLocation, saveFile) => {
  request(`https://${pageUrl}`, (error, response, body) => {
    //Hanlde error if we don't get a good response
    if (response.statusCode !== 200) {
      console.log(
        `Sorry we encountered an error retriveing your file\n please make sure the url is correct`
      );
      return;
    }
    saveFile(body, downloadLocation);
  });
};

const saveToFile = (pageData, downloadLocation) => {
  //Check if file exists
  if (fs.existsSync(downloadLocation)) {
    console.log("File already exists overwriting now :D");
  } else {
    console.log(`Creating new file at: ${downloadLocation}`);
  }

  fs.writeFile(`${downloadLocation}`, pageData, function (err) {
    if (err) return console.log(err);
  });
};

downloadPage(userArgs[0], userArgs[1], (pageUrl, downloadLocation) => {
  saveToFile(pageUrl, downloadLocation);
  var stats = fs.statSync(downloadLocation);
  console.log("File Size in Bytes:- " + stats.size);
});

