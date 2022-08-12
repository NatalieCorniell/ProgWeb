var users = [];

$("form").submit(function (e) {
  e.preventDefault();
});

//------------------------------ Capturando usuario
$("form#addUser").submit(function () {
  var user = {};
  var nameInput = $('input[name="name"]').val().trim();
  var addressInput = $('input[name="address"]').val().trim();
  var phoneNumberInput = $('input[name="phone"]').val().trim();
  // var state = false;
  if (nameInput && addressInput && phoneNumberInput) {
    $(this).serializeArray().map(function (data) {
      user[data.name] = data.value;
    });
    if (users.length > 0) {

      var lastUser = users[Object.keys(users).sort().pop()];
      user.id = lastUser.id + 1;
    } else {
      user.id = 0;
    }
    addUser(user);
  } else {
    alert("Porfavor llene los campos faltantes.");
  }
});
//------------------------------Guardando usuario en array users
function addUser(user) {
  users.push(user);
  saveUser()
};
//------------------------------Guardando usuario en localStorage 
const saveUser = () => {
  localStorage.setItem("user", JSON.stringify(users));
  showUsers();
};
//------------------------------Mostrando usuario desde localStorage
const showUsers = () => {
  //leemos el JSON del localstorage y parseamos a array para poder realizar una lectura de el y mostrar en pantalla
  users = JSON.parse(localStorage.getItem("user"));
  if (users === null) {
    users = [];
  } else {
    $("tr").remove();
    users.forEach((element) => {
      appendToUsrTable(element);
    });
  }
};
//------------------------------ Insertando usuario en la tabla
function appendToUsrTable(user) {

  $("#userTable > tbody:last-child").append(`
          <tr id="user-${user.id}">
              <td class="userData" name="name">${user.name}</td>
              '<td class="userData" name="address">${user.address}</td>
              '<td id="tdphoneNumber" class="userData" name="phone">${user.phone}</td>
              '<td align="center">
              
<button class="btn btn-outline-success form-control" onClick="initModal(${user.id})" 
data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
              </td>
              <td align="center">
                  <button class="btn btn-outline-danger form-control" onClick="deleteUser(${user.id})">Eliminar</button>
              </td> 
               <td align="center">
              <button class="btn btn-outline-info form-control"  
              data-bs-toggle="modal" data-bs-target="#myModalEmail" onClick="emailModal(${user.id})">Enviar Correo</button>
          </td>
          </tr>
      `);
  clear();
}
//----------------------------------Clean input
function clear() {

  const inputs = document.querySelectorAll('input');

  inputs.forEach(input => {
    input.value = '';
  });
}
//------------------------------ Modal usuario
const initModal = (id) => {
  let index = users.findIndex(
    (user) => user.id === id
  );
  var usr = users[index];
  $(".modal-body").empty().append(`
                  <form id="updateUser" action="">
                      <label for="name">Nombre</label>
                      <input class="form-control" type="text" name="ename" value="${usr.name}"/>
                      <label for="address">Correo</label>
                      <input class="form-control" type="text" name="eaddress" value="${usr.address}"/>
                      <label for="phone">Telefono</label>
                      <input class="form-control" type="text" name="ephone" value="${usr.phone}" min=10 max=100/>
              `);
  $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-success" onClick="editUser(${usr.id})">Actualizar</button>
                      <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                  </form>
              `);
};
//------------------------------ Editar usuario
const editUser = (id) => {
  var data = window.localStorage.getItem('user');
  if (data != null) {
    let user = JSON.parse(data);
    user[id].name = $('input[name="ename"]').val().trim();
    user[id].address = $('input[name="eaddress"]').val().trim();
    user[id].phone = $('input[name="ephone"]').val().trim();
    window.localStorage.setItem('user', JSON.stringify(user));

  }
  showUsers();
}
//------------------------------ Eliminar usuario
const deleteUser = (user) => {
  let indexArray;
  users.forEach((elemento, index) => {
    console.log(index);
    if (elemento.user === user) {
      indexArray = index;
    }
  });

  users.splice(indexArray, 1);
  saveUser();
};

function emailModal(id) {
  let index = users.findIndex(
    (user) => user.id === id
  );
  var usr = users[index];
  $(".modal-body").empty().append(`
  <form action="mailto:corniellnatalie@gmail.com" method="post" enctype="text/plain" >
  <label for="name">Mensaje para: ${usr.name}</label>
<textarea class="form-control" type="text" name="msg" id="msg"></textarea>

  <input type="submit" class="btn btn-success" value="Enviar"/>
                      <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cancelar</button>
                  </form>
              `);
}
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }