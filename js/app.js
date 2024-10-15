document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crudForm');
    const userTable = document.querySelector('#userTable tbody');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Renderiza la tabla con los usuarios al cargar la página
    renderTable();

    // Función para renderizar la tabla
    function renderTable() {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.nit}</td>
                <td>${user.correo}</td>
                <td>${user.telefono}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Función de validación de los campos del formulario
    function validateFields(nombre, apellido, nit, correo, telefono) {
        const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
        const nitRegex = /^[0-9]+$/; // Solo números
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Correo sin mayúsculas ni espacios
        const phoneRegex = /^[0-9]+$/; // Solo números

        if (!nameRegex.test(nombre)) {
            alert('El nombre solo debe contener letras.');
            return false;
        }

        if (!nameRegex.test(apellido)) {
            alert('El apellido solo debe contener letras.');
            return false;
        }

        if (!nitRegex.test(nit)) {
            alert('El NIT solo debe contener números.');
            return false;
        }

        if (!emailRegex.test(correo)) {
            alert('El correo no debe contener espacios ni mayúsculas.');
            return false;
        }

        if (!phoneRegex.test(telefono)) {
            alert('El teléfono solo debe contener números.');
            return false;
        }

        return true;
    }

    // Manejo del evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const nit = document.getElementById('nit').value;
        const correo = document.getElementById('correo').value.toLowerCase().trim(); // Minúsculas y sin espacios.
        const telefono = document.getElementById('telefono').value;
        const editIndex = document.getElementById('editIndex').value;

        if (!validateFields(nombre, apellido, nit, correo, telefono)) {
            return; // Detiene la ejecución si la validación falla.
        }

        const user = { nombre, apellido, nit, correo, telefono };

        if (editIndex === '-1') {
            // Crear nuevo usuario
            users.push(user);
        } else {
            // Editar usuario existente
            users[editIndex] = user;
            document.getElementById('editIndex').value = '-1';
        }

        // Guardar en LocalStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Reiniciar formulario y renderizar tabla
        form.reset();
        renderTable();
    });

    // Función para editar un usuario
    window.editUser = function(index) {
        const user = users[index];
        document.getElementById('nombre').value = user.nombre;
        document.getElementById('apellido').value = user.apellido;
        document.getElementById('nit').value = user.nit;
        document.getElementById('correo').value = user.correo;
        document.getElementById('telefono').value = user.telefono;
        document.getElementById('editIndex').value = index;
    };

    // Función para eliminar un usuario
    window.deleteUser = function(index) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            renderTable();
        }
    };
});
