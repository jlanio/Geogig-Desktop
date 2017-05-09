class Ctrl {
	constructor(name, origin = 'local',  serverAddress = `http://localhost:8182/repos/${name}`, shpfile = []){
		this._Repository = new Repository(name, origin, serverAddress);
		this._RepositoryLocal = new RepositoryLocal(name, origin, serverAddress, shpfile);
	}
	new(){
		this._Repository.init()
			.then(q => console.log(q))
			.catch(q => console.log(q))

	}
	update(id, name, localShp){
		this._RepositoryLocal.newShpFile(id, name, localShp);
	}
	delete(){

	}
	get Repository(){
		return this._Repository
	}
	get RepositoryLocal(){
		return this._RepositoryLocal
	}


}

let a = new Ctrl('leite');
console.log(a.new());








/*
this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

    get(target, prop, receiver) {

        if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

            return function(){

              console.log(`método '${prop}' interceptado`);

             Reflect.apply(target[prop], target, arguments);

              self._negociacoesView.update(target);

            }
     }

     return Reflect.get(target, prop, receiver);
  }
});*/