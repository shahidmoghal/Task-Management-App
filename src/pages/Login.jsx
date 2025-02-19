import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully!");
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.message); 
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">{isRegistering ? "Register" : "Login"} to Continue...</h2>

      {error && <p className="text-red-500">{error}</p>}

      
      <form className="flex flex-col items-center gap-3">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="px-3 py-2 border rounded w-64"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="px-3 py-2 border rounded w-64"
          required
        />

        {isRegistering ? (
          <button onClick={handleRegister} className="px-4 py-2 bg-green-600 text-white rounded w-64">
            Register
          </button>
        ) : (
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded w-64">
            Login
          </button>
        )}
      </form>

     
      <p className="mt-2 cursor-pointer text-blue-500" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>

     
      <button 
        onClick={handleGoogleLogin} 
        className="px-4 py-2 mt-4 bg-red-600 text-white rounded w-64">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
