import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UpdateTodoArgs } from '../../types/UpdateTodoArgs';
import { EditForm } from '../EditForm/EditForm';

interface Props {
  todo: Todo;
  deleteTodo: (todoId: number) => void;
  completedIds: number[];
  updateTodo: (
    todoId: number,
    data: UpdateTodoArgs,
  ) => void;
  loadingIds: number[];
  isLoading: boolean;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  completedIds,
  updateTodo,
  loadingIds,
  isLoading,
}) => {
  const {
    title,
    id,
    completed,
  } = todo;

  const [isEditField, setIsEditField] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  const updateTodoHandler = async () => {
    await updateTodo(id, { completed: !completed });
  };

  const doubleClickHandler = () => {
    setIsEditField(true);
  };

  const submitButton = () => {
    if (todoTitle.trim()) {
      updateTodo(id, { title: todoTitle });
    }

    if (!todoTitle.trim()) {
      deleteTodo(id);
    }

    setIsEditField(false);
  };

  const cancelButton = () => {
    setTodoTitle(title);
    setIsEditField(false);
  };

  return (
    <div
      className={cn('todo', {
        completed: todo.completed,
      })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={updateTodoHandler}
        />
      </label>

      {isEditField ? (
        <EditForm
          isLoading={isLoading}
          todoTitle={todoTitle}
          onTodoTitle={setTodoTitle}
          submitButton={submitButton}
          onCancel={cancelButton}
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={doubleClickHandler}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        className={cn('modal', 'overlay', {
          'is-active': completedIds.includes(id)
          || loadingIds.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
