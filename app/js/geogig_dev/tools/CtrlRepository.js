class CtrlRepository extends Repository {
    constructor(name, origin, serverAdress, mydb) {
        super(name, origin, serverAdress);
        this.mydb = mydb;
    }
    saveConexao(newObj){
        let obj = this.mydb;
        obj.infoRepositorios.conectedIn.push(newObj);
        db.set(obj)
    }
    saveLocal(newObj){
        let obj = this.mydb;
        obj.infoRepositorios.local.push(newObj);
        db.set(obj)
    }
    saveshpFile(id, newObj){
        let obj = this.mydb;
        obj.infoRepositorios.local[id].shpfile.push(newObj);
        db.set(obj)
    }
}
class Local extends CtrlRepository {
    constructor(name, origin, serverAdress, mydb, shpfile){
        super(name, origin, serverAdress, mydb);
        this.shpfile = shpfile;
    }
    new() {
        let obj = {
                "name":this.name,
                "shpfile":this.shpfile,
                "origin":this.origin,
                "serverAdress":"http://localhost:8182/repos/"+this.serverAdress
            };
        super.saveLocal(obj);
    }
    shpFile(id, name, localShp) {
        let obj ={'name':name,'localDir':localShp};
        super.saveshpFile(id, obj);
    }
}

class ConectedIn extends CtrlRepository {
    constructor(name, origin, serverAdress, mydb, repos) {
        super(name, origin, serverAdress, mydb);
        this.repos = repos;
    }
    new(){
        let obj = {
            "name":this.name,
            "origin":this.origin,
            "serverAdress":this.serverAdress,
            "repos":this.repos}
        super.saveConexao(obj)
    }
    updateRepos(){

    }
}
















/*var repository = new Repository ("name", "origin", "serverAdress");
var ctrl =  new CtrlRepository("name", "origin", "serverAdress", "mydb");
var local = new Local("name", "origin", "serverAdress", "mydb", "shpfile");
var conectedIn = new ConectedIn("name", "origin", "serverAdress", "mydb", "repos");
var ax = conectedIn.new();
var az = local.new();
var shp = local.shpFile(0,'guanabara','c:/imovel/aksodads/alaska')
console.log(ax, az, shp);
console.log(repository, ctrl, local, conectedIn);


*/





/*class Human{
    constructor(name, azar){
        this.name = name;
        this.azar = azar;
    }

    toString(){
        return "Hello, my name is"+ this.name + ".";
    }
}
class Person extends Human {
    constructor(name, azar,age){
        super(name, azar);
        this.age = age;
    }
    toString(){
        return super.toString() + " I am person and my age is" + this.age + ".";
    }
}
class Child extends Person{
    constructor(name, age){
        super(name, age);
    }
    toString (){
        return super.toString() + "I consider myself a children"
    }
}

var human = new Human('jose');
var person = new Person('fernando',1);
var child = new Child('guanabara',2)
console.log(human, person, child);

*/