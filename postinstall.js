const fs = require('fs');
const request = require('request');
const unzip = require('unzip');

let tmp = './app/static/tmp';
let geogig_commadLine = 'http://download.locationtech.org/geogig/geogig-1.1.0.zip';

console.log('Working...');
if (!fs.existsSync(tmp)){
    fs.mkdirSync(tmp);
    console.log(`Working... [Successfully created folder ==> ${tmp}]`);
}

let get = request(geogig_commadLine);
get.on('response',  function (res) {
  res.pipe(fs.createWriteStream('./app/static/tmp/geogig-1.1.0.zip'));
  console.log(`Working... [Downloading Geogig Commad lime in: ${geogig_commadLine}`);
  console.log('Working... [Downloading Geogig Commad lime on: ./app/static/tmp] ==> wait a moment...');

});
get.on( 'end', function(){
    fs.createReadStream('./app/static/tmp/geogig-1.1.0.zip').pipe(unzip.Extract({ path: './app/static' }));
    console.log('Finalized. GO!');
});
get.on( 'error', function(){
    console.log('Error ocurred on download geogig command line');
});
