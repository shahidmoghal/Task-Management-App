import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; 
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import Login from './pages/Login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1 className='ml-150 pt-10 mb-0 text-4xl'>Task Management App</h1>
      <div className="w-6xl ml-50 mt-10 min-h-screen bg-gray-100">
        {user ? <KanbanBoard /> : <Login />}
      </div>
    </>
  );
};

export default App;
