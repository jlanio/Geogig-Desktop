class Commit { 
    static new(comment){
        return Utils.geogig(['commit', '-m', comment], this.name)
                .then(response  => { return response})
                .catch(error => { return error});
    }
    static diffCommit(){
        return new Promise((resolve, reject) => {
            request(`${this._repository._serverAddress}/diff.json?oldRefSpec=${this._thisCommit}&newRefSpec=${this._toCompare}&showGeometryChanges=true`, 
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}
            )   
        })
    }
    static diffFeature(){
        return new Promise((resolve, reject) => {
            request(`${this._repository._serverAddress}/featurediff.json?path=${this._feature}&newTreeish=${this._thisCommit}&oldTreeish=${this._toCompare}`,
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}    
            ) 
        })
    }

}
