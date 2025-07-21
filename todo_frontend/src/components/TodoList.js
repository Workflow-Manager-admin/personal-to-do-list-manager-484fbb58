import React, { useState } from 'react';
import TodoModal from './TodoModal';

/**
 * PUBLIC_INTERFACE
 * TodoList main UI (CRUD + Mark Complete).
 * @param {object} props
 * @param {object} props.user - Current user object.
 */
function TodoList({ user }) {
  // Each todo: {id, title, description, completed, dueDate}
  const [todos, setTodos] = useState([
    // Example to-dos, remove in production
    {
      id: 1,
      title: "Sample Task",
      description: "This is an example to-do. Click edit or add your own.",
      completed: false,
      dueDate: null,
    },
  ]);
  const [modalState, setModalState] = useState({
    open: false,
    todo: null,
    isEdit: false,
  });

  // PUBLIC_INTERFACE
  const openAddModal = () => setModalState({ open: true, todo: null, isEdit: false });
  // PUBLIC_INTERFACE
  const openEditModal = (todo) => setModalState({ open: true, todo, isEdit: true });
  // PUBLIC_INTERFACE
  const closeModal = () => setModalState({ ...modalState, open: false });
  // PUBLIC_INTERFACE
  const addTodo = (data) => {
    const newTodo = {
      id: Date.now(),
      ...data,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    closeModal();
  };
  // PUBLIC_INTERFACE
  const updateTodo = (todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, ...todo } : t))
    );
    closeModal();
  };
  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  return (
    <div className="todo-list-wrapper">
      <div className="todo-list-header">
        <h1>
          <span role="img" aria-label="list">📝</span> {user.name || user.username}'s To-Do List
        </h1>
        <button className="todo-add-btn" onClick={openAddModal}>
          ＋ Add Task
        </button>
      </div>
      <ul className="todo-list-ul">
        {todos.length === 0 && (
          <li className="todo-empty">
            <span role="img" aria-label="empty">📭</span> No tasks yet! Click 'Add Task' to get started.
          </li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item${todo.completed ? " completed" : ""}`}
            tabIndex={0}
          >
            <div className="todo-main">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                aria-label="Mark complete"
                className="todo-checkbox"
              />
              <div className="todo-texts">
                <span className="todo-title">{todo.title}</span>
                {todo.description && (
                  <span className="todo-desc">{todo.description}</span>
                )}
                {todo.dueDate && (
                  <span className="todo-due">
                    Due:{" "}
                    <span className="todo-due-date">{todo.dueDate}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="todo-actions">
              <button className="todo-icon-btn" onClick={() => openEditModal(todo)} title="Edit">
                ✎
              </button>
              <button className="todo-icon-btn" onClick={() => deleteTodo(todo.id)} title="Delete">
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
      <TodoModal
        open={modalState.open}
        onClose={closeModal}
        onSubmit={modalState.isEdit ? updateTodo : addTodo}
        todo={modalState.todo}
        isEdit={modalState.isEdit}
      />
      <style>{`
        .todo-list-wrapper {
          max-width: 600px;
          margin: 32px auto;
          padding: 2rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 24px 0 rgba(44,55,130,0.09);
          background: var(--bg-secondary, #f8f9fa);
        }
        .todo-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .todo-list-header h1 {
          color: #1976d2;
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
        }
        .todo-add-btn {
          background: #9c27b0;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 0.6rem 1.1rem;
          cursor: pointer;
          box-shadow: 0 2px 6px 0 rgba(156,39,176,0.12);
          transition: filter 0.18s;
        }
        .todo-add-btn:hover {
          filter: brightness(1.07);
        }
        .todo-list-ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .todo-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          border-radius: 7px;
          padding: 1.15rem 1rem;
          margin-bottom: 13px;
          box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.06);
          background: var(--bg-primary, #fff);
          border: 1.5px solid transparent;
          position: relative;
          transition: box-shadow 0.12s, border-color 0.17s;
        }
        .todo-item.completed {
          opacity: 0.75;
          text-decoration: line-through;
          border-color: #ffd18b;
          background: #fffaf0;
        }
        .todo-item:focus {
          border-color: #ff9800;
          outline: none;
        }
        .todo-main {
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
          flex: 1 1 auto;
          min-width: 0;
        }
        .todo-checkbox {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          margin-top: 2px;
        }
        .todo-texts {
          flex: 1 1 auto;
          min-width: 0;
        }
        .todo-title {
          font-weight: 600;
          font-size: 1.13rem;
          color: #1976d2;
          word-break: break-word;
        }
        .todo-desc {
          display: block;
          color: #282c34;
          font-size: 1rem;
          margin: 3px 0 0 0;
          opacity: 0.80;
          word-break: break-word;
        }
        .todo-due {
          display: block;
          font-size: 0.96rem;
          color: #ff9800;
          letter-spacing: 0.08rem;
          margin-top: 3px;
        }
        .todo-due-date {
          font-weight: 500;
        }
        .todo-actions {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 56px;
        }
        .todo-icon-btn {
          background: #fff;
          color: #1976d2;
          border: 1px solid #e9ecef;
          box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.04);
          border-radius: 5px;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.18rem 0.3rem;
          transition: background 0.13s, color 0.13s;
        }
        .todo-icon-btn:hover {
          background: #e3ebf9;
          color: #9c27b0;
        }
        .todo-empty {
          color: #9c27b0;
          text-align: center;
          opacity: 0.82;
          margin: 2.2rem 0;
          font-size: 1.1rem;
        }
        @media (max-width: 750px) {
          .todo-list-wrapper {
            margin: 1.5rem;
            padding: 1.3rem 0.7rem;
          }
        }
        @media (max-width: 500px) {
          .todo-list-header h1 {
            font-size: 1.22rem;
          }
        }
      `}</style>
    </div>
  );
}

export default TodoList;
