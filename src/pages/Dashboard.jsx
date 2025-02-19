import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold">Welcome, {user?.displayName || "User"}</h2>
      <p>Email: {user?.email}</p>
      <img src={user?.photoURL} alt="Profile" className="w-20 h-20 rounded-full mt-3" />
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
