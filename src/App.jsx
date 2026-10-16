import { useState } from 'react';

function App() {
  // texte dans le cham
  const [newTask, setNewTask] = useState('');

  // tâches, vide au départ
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    // empêcher le formulaire de recharger la page
    event.preventDefault();

    const text = newTask.trim();

    // empêcher d'ajouter une tâche vide
    if (!text) return;

    const task = {
      id: crypto.randomUUID(),
      text,
      done: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const remainingTasks = tasks.filter((task) => !task.done).length;

  return (
    <main>
      <h1>Ma liste de tâches</h1>

      <form onSubmit={addTask}>
        <label htmlFor="new-task">Nouvelle tâche : </label>

        <input
          id="new-task"
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />

        <button type="submit">Ajouter</button>
      </form>

      <p>Tâches restant à faire : {remainingTasks}</p>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />

              <span
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
            </label>

            <button type="button" onClick={() => deleteTask(task.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
