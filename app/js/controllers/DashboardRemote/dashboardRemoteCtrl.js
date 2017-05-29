/*	$s.clone = (name, repoAddress) => {
		let ls_tree = repoAddress.replace(".json","/ls-tree.json");
		let $geogig = new MainCtrl(name, repoAddress);
		$geogig.Repository.clone().then(q =>{
			console.log("", q +" ", "")
		})
		$http.get(ls_tree).success(data => {
				$geogig.RepositoryRemote.afterCloningGetFeatures(data);
		})
		.error(data => console.log(error))
	}
	getRepositorio_remote = (id, repositories) => {
		$geogig.updateRemoteRepositories(id, repositories)
	};
	function get (url, index){
			$http.get(`${url}repos.json`).success(data=>{
				getRepositorio_remote(index, data.repos.repo);
			}).error(data=>{
				toaster.pop({
					type: 'error',
					title: 'Servidor Offline',
					body: url,
					showCloseButton: true
				});
			})
		}
	$s.remoteUpdateRepos = () => {
		$s.mydb.infoRepositorios.conectedIn.forEach((conexao, index) =>{
		get(conexao.serverAddress, index)
		})	
	}*/