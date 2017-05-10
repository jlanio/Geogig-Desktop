class Commit { 
    constructor(repository, comment, thisCommit, toCompare, feature) {
        this._repository = repository;
        this._comment = comment;
        this._thisCommit = thisCommit;
        this._toCompare = toCompare;
        this._feature = feature;
    }
    commit(){
        console.log();
        return Utils.geogig(['commit', '-m', this._comment], this._repository._name)
                .then(response  => {return response})
                .catch(error => {return error});
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
            request(`${this._repository._serverAddress}/featurediff.json?path=${this._feature}&newTreeish=${this._thisCommit}&oldTreeish=${this._toCompare}`,
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}    
            ) 
        })
    }

}