import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

import { useRef, useState } from "react";
import { nanoid } from "nanoid";

const CATEGORY_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}
const CATEGORY_NAMES = Object.keys(CATEGORY_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [category, setCategory] = useState("All");

  // map tasks to Component
  const taskList = tasks.filter(CATEGORY_MAP[category]).map((task) =>
    <Todo 
      id={ task.id }
      key={ task.id }
      name={ task.name }
      completed={ task.completed }
      toggleTaskCompleted={ toggleTaskCompleted }
      deleteTask={ deleteTask }
      editTask={ editTask }
    />
  );  // ?. -> optional chaining

  // Add Tasks
  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? 'tasks':'task';
  const headingText = `${taskList.length} ${tasksNoun}`;

  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updateTasks);
  }

  // deleting tasks
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  // editing tasks
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // filtering tasks 
  const categoryList = CATEGORY_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === category}
      setCategory={setCategory}
    />
  ))

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        { categoryList }
      </div>

      <h2 id="list-heading">{ headingText }</h2>

      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>

  </div>
  );
}

export default App;
