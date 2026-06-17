import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";




export default function Topbar() {

  const navigate = useNavigate();

const setToken =
  useAuthStore(
    (state) => state.setToken
  );

const handleLogout = () => {
  setToken("");

  navigate("/");
};
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between">

     <div>
  <h2 className="text-2xl font-bold text-white">
    Welcome Back 👋
  </h2>

  <p className="text-zinc-400 text-sm mt-1">
    Stay organized and productive
  </p>
</div>

     <button
  onClick={handleLogout}
  className="
    flex
    items-center
    gap-2
    text-zinc-400
    hover:text-red-400
    transition
  "
>
  <LogOut size={18} />
  Logout
</button>

    </header>
  );
}