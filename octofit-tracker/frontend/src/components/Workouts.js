import React, { useEffect, useState } from 'react';
const API_URL = 'https://glowing-space-chainsaw-j7vq5r6pqxfpvw6-8000.app.github.dev/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Erro ao buscar treinos:', error));
  }, []);

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4 text-primary">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout._id}>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3">Novo Treino</button>
    </div>
  );
}

export default Workouts;
