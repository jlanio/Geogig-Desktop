class Ctrl {
	constructor(name, origin = 'local',  address = `http://localhost:8182/repos/${name}`){
		this._Repository = new Repository(name, origin, address);
		this._Local = new RepositoryLocal(name, origin, address);
	}
	new(callback){
		this._Repository.init(q=>callback(q))
		this._Local.new();
	}
	update(id, name, localShp){
		this._Local.newShpFile(id, name, localShp);
	}
	delete(){

	}
	get Repository(){
		return this._Repository
	}


}

let ctrl = new Ctrl('xzzXzzzz','remote');
ctrl.Repository.init(q=>console.log(q));









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