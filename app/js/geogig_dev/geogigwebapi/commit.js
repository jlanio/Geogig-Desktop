var request = require("request");

function commit (_RepoName) {

  var localServe = 'http://localhost:8182/repos/'+ _RepoName;

  this.beginTransaction = function(){
	request.get(localServe+'/beginTransaction.json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
		console.log(JSON.parse(body).response.Transaction.ID) // Show the HTML for the Google homepage. 
	}
	})
  };
  this.newCommit = function (transactionId) {
	request(localServe+'/commit.json?authorName=John\
	  &authorEmail=john@example.com\
	  &message=something\
	  &all=true\
	  &transactionId='+transactionId, 
	  function(error, response, body) {
		console.log(body);
	});
  };

}

