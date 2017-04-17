class Commit { 
    constructor(repository, comment, thisCommit, toCompare, feature) {
        this._repository = repository;
        this._comment = comment;
        this._thisCommit = thisCommit;
        this._toCompare = toCompare;
        this._feature = feature;
    }
    commit(callback){
        Utils.geogig(['--repo',  this._repository.dir, 'commit', '-m', this._comment],
            (error, stdout, stderr)=>callback(stdout)
        );
    }
    diffCommit(callback){
        request.get(`${url}/diff.json?oldRefSpec=${this.commit}&newRefSpec=${this._toCompare}&showGeometryChanges=true{}`)
        .success(data=> callback(data)
        )
    }
    diffFeature(callback){
        request.get(`${this.serverAddress}/featurediff.json?path=${this._feature}&newTreeish=${this.commit}&oldTreeish=${this.toCompare}`)
        .success(data => callback (data)
        )
    }

}