function togglePass(idPass) {
    var x = document.getElementById("pass" + idPass);
    var eye = document.getElementById("pass-eye" + idPass);
    if (x.type === "password") {
        x.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
    } else {
        x.type = "password";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    }
}

function registrarse() {
	window.location.href = "welcomePage.html";
}

function validarTamContraseña(){
	var pass1 = document.getElementById("pass1");
    if (pass1.value.length >= 15 && pass1.value.length <= 20) {
        pass1.classList.remove("input-invalid");
        pass1.classList.add("input-valid");
        document.getElementById("pass1_feedback").style.display = "none";
    } else {
        pass1.classList.remove("input-valid");
        pass1.classList.add("input-invalid");
        document.getElementById("pass1_feedback").style.display = "block";
        pass1.value = '';
    }
}

function validarContraseñas(){
	var pass1 = document.getElementById("pass1");
    var pass2 = document.getElementById("pass2");
    if (pass1.value == pass2.value) {
        pass2.classList.remove("input-invalid");
        pass2.classList.add("input-valid");
        document.getElementById("pass2_feedback").style.display = "none";
    } else {
        pass2.classList.remove("input-valid");
        pass2.classList.add("input-invalid");
        document.getElementById("pass2_feedback").style.display = "block";
        pass2.value = '';
    }
}

function onloadPage() {
    //randomPrefDir();
    //var dir = document.getElementById("dir");
    //dir.addEventListener('change', valDireccion);
    var pass1 = document.getElementById("pass1");
    pass1.addEventListener('change', validarTamContraseña);
    var pass2 = document.getElementById("pass2");
    pass2.addEventListener('change', validarContraseñas);
}

function showContent() {
        element = document.getElementById("content");
        check = document.getElementById("check");
        if (check.checked) {
            element.style.display='block';
        }
        else {
            element.style.display='none';
        }
    }


    document.getElementById('getUsers').addEventListener('click', fetchUsers);

    function fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let response = '';
          response += `<div>
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Geo</th>
              <th>Teléfono</th>
              <th>Sitio Web</th>
              <th>Compañía</th>
            </tr>
            </thead>
            <tbody id="myTable">
              <tr>
                <td>${data[0].id}</td>
                <td>${data[0].name}</td>
                <td>${data[0].username}</td>
                <td>${data[0].email}</td>
                <td>${data[0].address.city}, ${data[0].address.street}, ${data[0].address.suite}, ${data[0].address.zipcode}</td>
                <td>${data[0].address.geo.lat},  ${data[0].address.geo.lng}</td>
                <td>${data[0].phone}</td>
                <td>${data[0].website}</td>
                <td> ${data[0].company.name} </td>
              </tr>`;
          for (let i = 1; i < data.length; i++) {
            response += `<tr>
                  <td>${data[i].id}</td>
                  <td>${data[i].name}</td>
                  <td>${data[i].username}</td>
                  <td>${data[i].email}</td>
                  <td>${data[i].address.city}, ${data[i].address.street}, ${data[i].address.suite}, ${data[i].address.zipcode}</td>
                  <td>${data[i].address.geo.lat},  ${data[i].address.geo.lng}</td>
                  <td>${data[i].phone}</td>
                  <td>${data[i].website}</td>
                  <td> ${data[i].company.name} </td>
                </tr>`;
          }

          response += `</tbody></table></div>`;

          document.getElementById("table").innerHTML = response;
        });
    }

function getDepartamentos(){
var elSelect= document.getElementById("dep");
  //console.log(elSelect.value)
  let url = 'http://datos.gov.co/resource/xdk5-pm3f.json?$SELECT=distinct%20departamento'
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    myJson.forEach(item => {
       var depOption = document.createElement("option");
       depOption.className = 'dep_option'
       depOption.value = item.departamento
       depOption.text = item.departamento
       dep.prepend(depOption)
    })
  });
}

function getMunicipio(elSelect){
var depart= document.getElementById("dep");

  console.log(elSelect.value)
  let url = 'https://www.datos.gov.co/resource/xdk5-pm3f.json?$where=departamento=\''+depart.value+'\'';
  console.log(url)
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
     removeOptions(document.getElementById("mun"));
    var firstOpt = document.createElement("option");
       firstOpt.className = 'dep_option'
       firstOpt.value = 'Selecciona Municipio'
       firstOpt.text = 'Selecciona Municipio'
    mun.prepend(firstOpt)
    myJson.forEach(item => {
       var munOption = document.createElement("option");
       munOption.className = 'mun_option'
       munOption.value = item.municipio
       munOption.text = item.municipio
       mun.prepend(munOption)
    })
  });
}

function removeOptions(selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}