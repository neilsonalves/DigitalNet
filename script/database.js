window.addEventListener('load', carregar);
 
var db = openDatabase("db_digital_net", "1.0", "TiPS Database Example", 100000000);

var resultad;

function carregar(){
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, nome TEXT, useName TEXT, email TEXT, type TEXT, senha TEXT)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nome TEXT, nomeRes TEXT, cpf TEXT, rg TEXT, end TEXT, fone TEXT, senha TEXT)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY, nome TEXT, valor REAL)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS cursoAluno (id_aluno INTEGER, id_curso INTEGER, hora_init TEXT, hora_fim TEXT, valor REAL, FOREIGN KEY(id_aluno) REFERENCES alunos(id), FOREIGN KEY(id_curso) REFERENCES cursos(id))");
        
        // tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, nome TEXT, useName TEXT, email TEXT, type TEXT, senha TEXT)");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nome TEXT, nomeRes TEXT, cpf TEXT, rg TEXT, end TEXT, fone TEXT, senha TEXT)");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY, nome TEXT, valor REAL)");
        // tx.executeSql("CREATE TABLE IF NOT EXISTS cursoAluno (id INTEGER PRIMARY KEY, id_aluno INTEGER, id_curso INTEGER, hora_init TEXT, hora_fim TEXT, valor REAL, FOREIGN KEY(id_aluno) REFERENCES alunos(id), FOREIGN KEY(id_curso) REFERENCES cursos(id))");
        tx.executeSql("SELECT * FROM user WHERE nome=? ", ["admin"], function (tx, resultado){
            if(resultado.rows.length <= 0){
                addDados("INSERT INTO user ( nome,useName,email, type, senha) VALUES ('admin', 'admin', '', 'admin', 'admin')");
            }
        });
    });
    // let t = getDados("SELECT * FROM user");
    // console.log(t);
    // for(i in t){
    //     for(ii in t[i]){
    //         console.log(i[i][ii]);
    //     }
    // }
    // // console.log(t.values);
    // // console.log(t.values());
    // addDados("INSERT INTO user ( nome,email, type, senha) VALUES ('neilson', '', 'admin', 'admin')");
    // if(getDados("SELECT * FROM user").length > 0){
    // addDados("INSERT INTO user ( nome,email, type, senha) VALUES ('admin', '', 'admin', 'admin')");
    // }else{
    //     // alert("ja tem user");
    // }
}
function addDados(tagSql){
    db.transaction(function (tx){
        tx.executeSql(tagSql);
    });
    curso_list();
    // if(tipo =="add"){
    // }else{
    //     db.transaction(function (tx){
    //         tx.executeSql(tagSql,null);
    //     });
    // }
}
function getDados(selectTagSql = "", myDados = []){
    
    db.transaction(function(tx){
        tx.executeSql(selectTagSql, myDados, function (tx, resultado) {
            resultad = resultado.rows; 
                  
        }, []);
    });
}
function post(tipo){
    if(tipo ==="login"){
        let l_user = document.getElementById("l_user");
        let l_senha = document.getElementById("l_senha");
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM user WHERE nome=? ", [l_user.value], function (tx, resultado){
                // console.log(resultado);
                // console.log(resultado.rows);
                if(resultado.rows.length > 0){
                    let _user = resultado.rows[0];
                    if((_user.nome === l_user.value) && (_user.senha === l_senha.value)){
                        setCookie("login", true);
                        setCookie("id", _user.id);
                        setCookie("user", _user.nome);
                        // checkCookie();
                        window.location.href = "index.html";
                        alert("Bem Vindo!");

                    }else{
                        alert("O Usuario ou Senha esta invalido!");
                        l_user.value = "";
                        l_senha.value = "";
                    }
                }else{
                    alert("usuario ou senha invalido!");
                }
            });
        });
        
    }
}

function curso_list(){
    let tBody = "";
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM cursos",[], function (tx, resultado){
            let base = resultado.rows;
            if(base.length > 0){
                for(let i =0; i < base.length; i++){
                    tBody += "<tr>";
                    // console.log(base[i]);
                        tBody += "<th scope='row'>"+(i+1)+"</th>"+
                        "<th scope='col'>"+base[i].nome+"</th>"+
                        "<th scope='col'>"+base[i].valor.toFixed(2)+"</th>"+
                        "<td class='col-1'>"+
                        "<div class='btn-group' role='group'>"+
                        "<button id='btnGroupDrop1' type='button' class='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>CONF.</button><ul class='dropdown-menu' aria-labelledby='btnGroupDrop1'>"+
                        "<li><a class='dropdown-item' href='detalhes.html?id="+base[i].id+"'>Detalhes</a></li>"+
                        "<li><button class='dropdown-item' onclick='editCurso("+base[i].id+")'>Editar</button></li>"+
                        "<li><button class='dropdown-item' onclick='delCurso("+base[i].id+")'>Delete</button></li>"+
                        "</ul></div></td>";
                    tBody += "</tr>";
                }
                
                BodyTabela.innerHTML = tBody;
            }else{
                BodyTabela.innerHTML = "";
            }
        });
    });
}
