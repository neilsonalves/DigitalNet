window.addEventListener("load", init);

function init(){
  console.log(window)
  if(window.location.pathname.indexOf("index")>0){
    console.log("index")
  }else if(window.location.pathname.indexOf("caixa")>0){
    console.log("caixa")
  }else if(window.location.pathname.indexOf("turma")>0){
    console.log("turma")
  }else if(window.location.pathname.indexOf("alunos")>0){
    console.log("alunos")
  }else if(window.location.pathname.indexOf("curso")>0){
  console.log("curso")
}else 
  console.log()

  checkCookie();
    // nav();
}
function nav(){
    let user = getCookie("user");
    // window.alert("init ok"+user);
}
function setCookie(cname, cvalue) {
    const d = new Date();
    let exdays = 1;//numero de dia para expiração do cookie
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie() {
    if (getCookie("login") == "true") {
      if(window.location.href.indexOf("login.html")>0){
        window.location.href = ("index.html");
      }else{
        let user = getCookie("user");

      }
    } else {
      if(window.location.href.indexOf("login.html")<0){
        window.location.href = ("login.html");
      }
    }
  }
function sair(){
  setCookie("login", false);
  checkCookie();
}