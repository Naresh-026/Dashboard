'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [height, setHeight] = useState(400); // Default height
  const minHeight = 100;
  const maxHeight = 800;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleResize = (e: React.MouseEvent, startHeight: number, startY: number) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="space-y-2">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-700 
            bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500
            text-white placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-lg
            transition-colors duration-200"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-1.5">
        <AnimatePresence>
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-800/50 to-blue-900/40 
                rounded-lg group text-sm hover:from-gray-800/60 hover:to-blue-900/50 
                transition-all duration-200 shadow-sm hover:shadow border border-white/5"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${todo.completed ? 'border-green-500 bg-green-500' : 'border-gray-500'}`}
              >
                {todo.completed && <CheckIcon className="w-2 h-2 text-white" />}
              </button>
              <span className={`flex-1 text-gray-100
                ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300
                  transition-opacity duration-200"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 