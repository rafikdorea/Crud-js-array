const api = (() => {
    let users = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" }
    ];
    let nextId = 4;

    function createUser(userData) {
        if (!userData || !userData.name || !userData.email) {
            return { error: "Dados inválidos. Nome e email são obrigatórios." };
        }
        const newUser = {
            id: nextId++,
            name: userData.name,
            email: userData.email
        };
        users.push(newUser);
        return newUser;
    }

    function readUsers(id = null) {
        if (id) {
            return users.find(u => u.id === parseInt(id));
        }
        return [...users];
    }

    function updateUser(id, userData) {
        const userId = parseInt(id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return { error: `Usuário com ID ${id} não encontrado.` };
        }
        const updatedUser = { ...users[userIndex], ...userData };
        users[userIndex] = updatedUser;
        return updatedUser;
    }

    function deleteUser(id) {
        const userId = parseInt(id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
             return { error: `Usuário com ID ${id} não encontrado.` };
        }
        const [deletedUser] = users.splice(userIndex, 1);
        return deletedUser;
    }

    return {
        create: createUser,
        read: readUsers,
        update: updateUser,
        delete: deleteUser
    };
})();
