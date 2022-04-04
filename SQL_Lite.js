window.addEventListener('load',carrega);
var btDelete;
// criando um banco de dados
var db = openDatabase("db_digital_net", "1.0", "TiPS Database Example", 100000000);

function carrega (){
    //alert("ok, SQL");
    document.getElementById("bt_confirme").addEventListener("click", salvar);
    btDelete = document.getElementById("bt_delete");
    btDelete.addEventListener("click", delite);
    // criando um tabela no banco de dados
    db.transaction(function (tx) {
        // DELETE TABELA => 
        // tx.executeSql("DROP TABLE db_digital_net");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS myTable(id INTEGER PRIMARY KEY,nome TEXT,senha TEXT, email TEXT)" );
        tx.executeSql("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nomeAluno TEXT, nomeRes TEXT, cpf TEXT, rg TEXT, end TEXT, fone TEXT, fone_zap TEXT, email TEXT, senha TEXT)");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nomeAluno TEXT, nomeRes TEXT, cpf TEXT, rg TEXT, end TEXT, fone TEXT, fone_zap TEXT, email TEXT, senha TEXT)");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nomeAluno TEXT, nomeRes TEXT, cpf TEXT, rg TEXT, end TEXT, fone TEXT, fone_zap TEXT, email TEXT, senha TEXT)");
        // tx.exexuteSql("INSERT INTO db_digital_net (nomeAluno, nomeRes, cpf, rg, end, fone, fone_zap, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    })
    // getAlunos();
}

function salvar(){
    var id = false;
    // document.getElementById('').value;
    var nome  = document.getElementById("inputName").value;
    var responsavel = document.getElementById("inputResponsavel").value;
    var cpf = document.getElementById("inputCpf").value;
    var rg = document.getElementById("inputRg").value;
    var end = document.getElementById("inputEnd").value;
    var check_Fone_whatsapp = document.getElementById("inputWhatsapp").checked;
    var fone = document.getElementById("inputFone").value;
    var email = document.getElementById("inputEmail").value;
    var senha = document.getElementById("inputSenha").value;
    // window.alert(nome+","+responsavel+","+cpf+","+rg+","+end+","+check_Fone_whatsapp+","+fone+","+email+","+senha);
    db.transaction(function(tx) {
    //     if(id){
    //         alert('update');
    //     }else{
            tx.executeSql('INSERT INTO alunos (nomeAluno, nomeRes, cpf, rg, end, fone, fone_zap, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, responsavel, cpf, rg, end, check_Fone_whatsapp, fone, email, senha]);
        // }
    });
    // window.Reflect;
    // alert("Salvou!! ");
}
function getAlunos(){

}
function delite(){
    alert("deletado!!");
    // btDelete.className = "w-100 btn btn-danger btn-lg";
    btDelete.className = "w-100 btn btn-danger btn-lg d-lg-none";
}