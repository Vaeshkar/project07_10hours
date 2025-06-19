import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, progress: 0 }]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((prevToasts) => {
        return prevToasts
          .map((toast) => ({
            ...toast,
            progress: toast.progress + 2, // increase progress by 2% every 60ms → ~3s total
          }))
          .filter((toast) => toast.progress <= 100); // remove after progress reaches 100
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(({ id, message, type, progress }) => (
          <div
            key={id}
            className={`toast p-2 rounded shadow relative overflow-hidden ${
              type === 'error' ? 'bg-red-800' : 'bg-green-800'
            } text-white`}
            style={{ minWidth: '200px' }}
          >
            {message}
            <div
              className="absolute bottom-0 left-0 h-1 bg-white opacity-50"
              style={{ width: `${progress}%`, transition: 'width 0.06s linear' }}
            />
          </div>
        ))}
      </div>
      {/* <button
        // This button is just for testing purposes, you can remove it later
        onClick={() => addToast('Test toast message')}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg z-60"
      >
        Show Toast
      </button> */}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);