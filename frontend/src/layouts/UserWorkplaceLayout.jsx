import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, FileText, Menu, X, ShieldAlert, Plus } from 'lucide-react';
import { getSession, logoutAdmin } from '../api/workplaceApi';
import WorkplaceLogo from '../components/WorkplaceLogo';

const linkBase =
  'flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition';

export default function UserWorkplaceLayout() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getSession();
      if (cancelled) return;
      if (!s?.role) {
        navigate('/workplace/login', { replace: true });
        return;
      }
      if (s.role === 'admin') {
        navigate('/workplace/admin/users/pending', { replace: true });
        return;
      }
      if (s.role !== 'user') {
        navigate('/workplace/login', { replace: true });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function logout() {
    try {
      await logoutAdmin();
    } catch {
      /* */
    }
    navigate('/workplace/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans flex">
      <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-gray-200 bg-white min-h-screen pt-8 pb-6 px-4">
        <div className="mb-8 px-2">
          <WorkplaceLogo />
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Workplace</p>
        </div>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/workplace/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
            Dashboard
          </NavLink>
          <NavLink
            to="/workplace/od"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden />
            On-duty (OD)
          </NavLink>
          <NavLink
            to="/workplace/riskm/submissions"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <ShieldAlert className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
            Risk management
          </NavLink>
          <NavLink
            to="/workplace/riskm/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-500/10 text-orange-800 hover:bg-orange-500/20'}`
            }
          >
            <Plus className="h-4 w-4 shrink-0" aria-hidden />
            New risk submission
          </NavLink>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#2D334A] hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-lg p-2 text-[#2D334A] hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <WorkplaceLogo className="h-6 max-w-[6.5rem]" />
          <button type="button" onClick={logout} className="text-sm font-semibold text-[#2D334A]">
            Log out
          </button>
        </div>
        {mobileNavOpen ? (
          <div className="fixed inset-0 z-[200] md:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute left-0 top-0 flex h-full w-[min(100%,280px)] flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <WorkplaceLogo className="h-6 max-w-[6.5rem]" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg p-2 text-[#2D334A] hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                <NavLink
                  to="/workplace/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
                  }
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/workplace/od"
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
                  }
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden />
                  On-duty (OD)
                </NavLink>
                <NavLink
                  to="/workplace/riskm/submissions"
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
                  }
                >
                  <ShieldAlert className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                  Risk management
                </NavLink>
                <NavLink
                  to="/workplace/riskm/new"
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? 'bg-orange-500 text-white' : 'bg-orange-500/10 text-orange-800'}`
                  }
                >
                  <Plus className="h-4 w-4 shrink-0" aria-hidden />
                  New risk submission
                </NavLink>
              </nav>
            </div>
          </div>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}
