'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const activeTodos = todos.filter(todo => !todo.completed).length
  const completedTodos = todos.filter(todo => todo.completed).length

  return (
    <div className={styles.container}>
      <div className={styles.todoApp}>
        <h1 className={styles.title}>TODOリスト</h1>

        <div className={styles.stats}>
          <span className={styles.statItem}>
            未完了: <strong>{activeTodos}</strong>
          </span>
          <span className={styles.statItem}>
            完了: <strong>{completedTodos}</strong>
          </span>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいタスクを入力..."
            className={styles.input}
          />
          <button onClick={addTodo} className={styles.addButton}>
            追加
          </button>
        </div>

        <ul className={styles.todoList}>
          {todos.length === 0 ? (
            <li className={styles.emptyMessage}>
              タスクがありません。新しいタスクを追加してください。
            </li>
          ) : (
            todos.map(todo => (
              <li
                key={todo.id}
                className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
              >
                <div className={styles.todoContent}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={styles.checkbox}
                  />
                  <span className={styles.todoText}>{todo.text}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  削除
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
