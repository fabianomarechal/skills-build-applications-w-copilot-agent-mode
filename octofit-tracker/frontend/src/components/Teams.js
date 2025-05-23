import React, { useEffect, useState } from 'react';
const API_URL = 'https://glowing-space-chainsaw-j7vq5r6pqxfpvw6-8000.app.github.dev/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Erro ao buscar times:', error));
  }, []);

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4 text-primary">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{Array.isArray(team.members) ? team.members.join(', ') : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3">Nova Equipe</button>
    </div>
  );
}

export default Teams;
