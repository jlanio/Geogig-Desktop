function Aluno () {
 var nome;
 var idade;
 var curso;
 
  this.setNome = function (vNome) {
    this.nome = vNome;
  }
 
  this.setIdade = function (vIdade) {
    this.idade = vIdade;
  }
 
  this.setCurso = function (vCurso) {
    this.curso = vCurso;
  }
 
  this.getNome = function () {
    return this.nome;
  }
 
  this.getIdade = function () {
    return this.idade;
  }
 
  this.getCurso = function () {
    return this.curso;
  }
 
  this.mostraDados = function () {
    console.log("Nome do aluno: " + this.nome + "\nIdade: " + this.idade + "\nCurso: " + this.curso);
  }
}

var Aluno = new Aluno();
 
Aluno.setNome("Henrique");
Aluno.setIdade("25");
Aluno.setCurso("Introdução à programação orientada a objetos em Javascript");
Aluno.mostraDados();