import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4">
        <span className="text-xl font-bold text-indigo-600">genAI</span>
        <button onClick={logout} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Logout</button>
      </nav>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-indigo-600">Authenticated dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome, {user?.name}!</h1>
          <p className="mt-3 text-slate-600">You are logged in with access-token and refresh-token authentication.</p>
          <p className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Account email: <strong>{user?.email}</strong></p>
        </div>
      </section>
    </main>
  );
}
