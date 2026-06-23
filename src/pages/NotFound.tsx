import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-center">
        <p className="text-slate-500 text-6xl font-black">404</p>
        <p className="text-white font-semibold text-xl mt-2">Page not found</p>
        <p className="text-slate-400 mt-1">SAI isn't sure where that leads.</p>
      </div>
      <button
        onClick={() => navigate('/sai-home')}
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Go home
      </button>
    </main>
  );
}
