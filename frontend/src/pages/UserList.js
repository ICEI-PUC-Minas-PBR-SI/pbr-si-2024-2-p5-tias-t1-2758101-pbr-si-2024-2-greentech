// frontend/src/pages/UserList.js
import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/person');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/person/${id}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.gender}
            <button onClick={() => deleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
