class Commit { 
    constructor(repository, comment, thisCommit, toCompare, feature) {
        this._repository = repository;
        this._comment = comment;
        this._thisCommit = thisCommit;
        this._toCompare = toCompare;
        this._feature = feature;
    }
    commit(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo',  this._repository, 'commit', '-m', this._comment],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )            
        })
    }
    diffCommit(){
        return new Promise((resolve, reject) => {
            request(`${this._repository._serverAddress}/diff.json?oldRefSpec=${this._thisCommit}&newRefSpec=${this._toCompare}&showGeometryChanges=true`, 
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}
            )   
        })
    }
    diffFeature(){
        return new Promise((resolve, reject) => {
            request(`${this.serverAddress}/featurediff.json?path=${this._feature}&newTreeish=${this.commit}&oldTreeish=${this.toCompare}`,
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}    
            ) 
        })
    }

}