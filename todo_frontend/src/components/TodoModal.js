import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for adding/editing todo items.
 * @param {object} props
 * @param {boolean} props.open - Modal visibility
 * @param {function} props.onClose - Called to close modal
 * @param {function} props.onSubmit - Called with (todo)
 * @param {object} [props.todo] - Todo item to edit (optional)
 * @param {boolean} props.isEdit - Is editing or adding
 */
function TodoModal({ open, onClose, onSubmit, todo, isEdit }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [desc, setDesc] = useState(todo?.description || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate || "");
  // handle controlled input state: re-initialize when editing a different todo
  useEffect(() => {
    if (isEdit && todo) {
      setTitle(todo.title || "");
      setDesc(todo.description || "");
      setDueDate(todo.dueDate || "");
    } else {
      setTitle("");
      setDesc("");
      setDueDate("");
    }
  }, [open, isEdit, todo]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const ret = {
      ...(todo || {}),
      title: title.trim(),
      description: desc.trim(),
      dueDate: dueDate || null,
    };
    onSubmit(ret);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dialog" tabIndex={-1} role="dialog">
        <form className="modal-form" onSubmit={handleSubmit}>
          <h2>{isEdit ? "Edit Task" : "New Task"}</h2>
          <label>
            Title <span className="required">*</span>
            <input
              autoFocus
              type="text"
              value={title}
              maxLength={60}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What needs to be done?"
            />
          </label>
          <label>
            Description
            <textarea
              value={desc}
              maxLength={200}
              rows={2}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Optional: add details"
            />
          </label>
          <label>
            Due Date
            <input
              type="date"
              value={dueDate || ""}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button
              type="submit"
              className="btn-modal"
              style={{ background: "#1976d2", color: "#fff" }}
            >
              {isEdit ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn-modal"
              style={{ background: "#fff", color: "#1976d2", border: "1px solid #1976d2" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(30,26,80,0.18);
          z-index: 19;
          animation: fadeInModalBg 0.14s;
        }
        .modal-dialog {
          position: fixed;
          left: 50%;
          top: 50%;
          z-index: 20;
          transform: translate(-50%,-50%);
          background: var(--bg-primary,#fff);
          border-radius: 14px;
          box-shadow: 0 2px 30px 0 rgba(25,118,210,0.14);
          padding: 2.3rem 2.1rem 1.5rem;
          max-width: 370px;
          width: 100vw;
          animation: popInModal 0.18s cubic-bezier(0.7,0.1,0.25,1);
        }
        @keyframes popInModal {
          from { opacity: 0; transform:translate(-50%,-57%) scale(0.95);}
          to { opacity: 1; transform:translate(-50%,-50%) scale(1);}
        }
        @keyframes fadeInModalBg {
          from {opacity: 0;} to {opacity: 1;}
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .modal-form h2 {
          font-size: 1.16rem;
          margin: 0 0 0.2rem 0;
          color: #1976d2;
        }
        .modal-form label {
          font-size: 0.98rem;
          color: #6a37a5;
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }
        .required {
          color: #ff9800;
          margin-left: 4px;
          vertical-align: text-top;
        }
        .modal-form input,
        .modal-form textarea {
          border-radius: 6px;
          border: 1px solid var(--border-color,#e9ecef);
          font-size: 1rem;
          padding: 0.44rem 0.7rem;
          resize: none;
        }
        .modal-form textarea {
          min-height: 38px;
          max-height: 110px;
        }
        .modal-actions {
          display: flex;
          flex-direction: row;
          gap: 1.4rem;
          margin-top: 0.5rem;
        }
        .btn-modal {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.56rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 6px 0 rgba(25,118,210,0.09);
          transition: filter 0.13s;
        }
        .btn-modal:hover {
          filter: brightness(1.08);
        }
        @media (max-width: 470px) {
          .modal-dialog {
            padding: 1.2rem 0.7rem 1rem;
            max-width: 97vw;
          }
        }
      `}</style>
    </>
  );
}

export default TodoModal;
