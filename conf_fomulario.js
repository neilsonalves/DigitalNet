window.addEventListener('load',carrega);


function carrega (){
    // alert("ok, CONFIGURAÇÃO");
    document.getElementById("bt_add_curso").addEventListener('click', addCurso);
    document.getElementById("bt_remover_curso").addEventListener('click', removerCurso);
}

function addCurso(){
    let listCurso =  document.getElementById('db_curso');
    let myListCurso =  document.getElementById('curso_aluno');

    if(listCurso.value != ""){
            myListCurso.options.add(listCurso.options.item(listCurso.index));
    }else alert("selecione um curso!");
        
   
}
function removerCurso(){
    let listCurso =  document.getElementById('db_curso');
    let myListCurso =  document.getElementById('curso_aluno');
    
    if(myListCurso.value != ""){
            listCurso.options.add(myListCurso.options.item(myListCurso.index));
    }else alert("selecione um curso!");
        
   
}