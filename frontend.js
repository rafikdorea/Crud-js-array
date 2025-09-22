document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const userTableBody = document.querySelector('#userTable tbody');
    const formTitle = document.getElementById('formTitle');
    const submitButton = userForm.querySelector('button[type="submit"]');
    let editingUserId = null;

    function renderUsers() {
        const users = api.read();
        userTableBody.innerHTML = '';

        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', user.id);

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !email) {
            alert('Por favor, preencha nome e email.');
            return;
        }

        const userData = { name, email };

        if (editingUserId) {
            api.update(editingUserId, userData);
        } else {
            api.create(userData);
        }

        resetForm();
        renderUsers();
    });

    userTableBody.addEventListener('click', (e) => {
        const target = e.target;
        const row = target.closest('tr');
        if (!row) return;
        
        const userId = row.getAttribute('data-id');

        if (target.classList.contains('delete-btn')) {
            if (confirm(`Tem certeza que deseja excluir o usuário com ID ${userId}?`)) {
                api.delete(userId);
                renderUsers();
            }
        }

        if (target.classList.contains('edit-btn')) {
            const user = api.read(userId);
            if (user) {
                nameInput.value = user.name;
                emailInput.value = user.email;
                editingUserId = user.id;

                formTitle.textContent = `Editando Usuário (ID: ${user.id})`;
                submitButton.textContent = 'Atualizar';
                window.scrollTo(0, 0);
            }
        }
    });

    function resetForm() {
        userForm.reset();
        editingUserId = null;
        formTitle.textContent = 'Adicionar Novo Usuário';
        submitButton.textContent = 'Adicionar';
    }

    renderUsers();
});
