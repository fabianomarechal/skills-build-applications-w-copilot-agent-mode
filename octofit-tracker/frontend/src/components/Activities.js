import React, { useEffect, useState } from 'react';
const API_URL = 'https://glowing-space-chainsaw-j7vq5r6pqxfpvw6-8000.app.github.dev/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Erro ao buscar atividades:', error));
  }, []);

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4 text-primary">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (s)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.user}</td>
                <td>{activity.activity_type}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3">Nova Atividade</button>
    </div>
  );
}

export default Activities;
