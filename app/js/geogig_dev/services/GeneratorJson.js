class GeneratorJson{
	static local(name, shpfile, origin, serverAddress){
		return {
                	"name":name,
                	"shpfile":shpfile,
                	"origin":origin,
                	"serverAddress":`http://localhost:8182/repos/${serverAddress}`
            	};
	}
	static remote (name, origin, serverAddress, repos){
		return {
		            "name": name,
		            "origin": origin,
		            "serverAddress": serverAddress,
		            "repos": repos
        		}
	}
	static shpfile (name, localShp){
		return {
					'name':name,'shpfile':localShp
				}
	}
}