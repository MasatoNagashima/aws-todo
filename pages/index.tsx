// pages/index.tsx
import { useState } from 'react';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     const res = await fetch('/api/todos');
  //     const data = await res.json();
  //     setTodos(data);
  //   };

  //   fetchTodos();
  // }, []);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    });

    if (res.ok) {
      const todo = await res.json();
      setTodos([...todos, todo]);
      setNewTask('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
    </div>
  );
};

export default Home;

