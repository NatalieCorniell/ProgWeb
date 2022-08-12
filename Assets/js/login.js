

//checking
function check(){
    var storedName = localStorage.getItem('email');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    var userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPw.value == storedPw){
        alert('Iniciar session validado');
        $("#noneOn").attr("style", "display:none !important");
        $("#noneOff").attr("style", "display:block !important");

    }else{
        alert('Iniciar session NO permitido');
    }
}