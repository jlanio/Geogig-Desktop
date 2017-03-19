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
            (error, stdout, stderr)=>callback(stdout)
        );
    }
    diffCommit(callback){
        request.get(`${url}/diff.json?oldRefSpec=${this.commit}&newRefSpec=${this.toCompare}&showGeometryChanges=true{}`)
        .success(data=> callback(data)
        )
    }
    diffFeature(callback){
        request.get(`${this.serverAddress}/featurediff.json?path=${this.feature}&newTreeish=${this.commit}&oldTreeish=${this.toCompare}`)
        .success(data => callback (data)
        )
    }

}