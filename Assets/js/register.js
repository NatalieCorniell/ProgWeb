function store(){
    var name = document.getElementById('email');
    var pw = document.getElementById('pw');
    // var lowerCaseLetters = /[a-z]/g;
    // var upperCaseLetters = /[A-Z]/g;
    // var numbers = /[0-9]/g;

    if(name.value.length == 0){
        alert('Ingrese el usuario');

    }else if(pw.value.length == 0){
        alert('Ingrese la contraseña');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Ingrese el usuario y la contrseña');

    }else{
        localStorage.setItem('email', name.value);
        localStorage.setItem('pw', pw.value);
        alert('Usuario creado!');
    }
}