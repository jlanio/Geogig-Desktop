class Commit {
    constructor(repository, comment, thisCommit, toCompare, feature) {
        this.repository = repository;
        this.comment = comment;
        this.thisCommit = thisCommit;
        this.toCompare = toCompare;
        this.feature = feature;
    }
    commit(callback){
        utils.geogig(['--repo',  this.repository.dir, 'commit', '-m', this.comment],
            (error, stdout, stderr)=>{
                callback(stdout);
            });
    }
    diffCommit(callback){
        request.get(url+"/diff.json?oldRefSpec="+this.commit+"&newRefSpec="+this.toCompare+"&showGeometryChanges=true")
        .success(function(data){
            callback (data);
        })
    }
    diffFeature(callback){
        request.get(this.serverAdress+"/featurediff.json?path="+this.feature+"&newTreeish="+this.commit+"&oldTreeish="+this.toCompare)
        .success(function(data){
            callback (data);
        })
    }
    add(callback){
        utils.geogig(['--repo',  this.dir, 'add'], 
            (error, stdout, stderr)=>{
                callback(error, stdout, stderr)
        });
    }

}

/*a = new Repository('asas', [],'local', 'http://localhost:8182/repos/imovel');
a.importShapefile('C:/Users/jlanio/Desktop/app/imovel.shp', (stdout)=>{console.log(stdout)})
b = new Commit (a);
b.commit((error, stdout, stderr)=>{console.log(error, stdout, stderr)})

*/
/*console.log(b.commit((data)=>{
    console.log(data);
}),'asdasdads')*/;

/*b.commit((error, stdout, stderr)=>{
    console.log(error, stdout, stderr, b.ver());
})
*/
