import React, { useEffect, useState } from 'react';
const API_URL = 'https://glowing-space-chainsaw-j7vq5r6pqxfpvw6-8000.app.github.dev/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Erro ao buscar leaderboard:', error));
  }, []);

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4 text-primary">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry._id}>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3">Nova Pontuação</button>
    </div>
  );
}

export default Leaderboard;
