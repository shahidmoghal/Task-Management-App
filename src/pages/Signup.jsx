import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-3">
        <input className="p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
