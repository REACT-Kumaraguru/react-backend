import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LogOut,
  UserCheck,
  FileText,
  FolderKanban,
  Tags,
  Clock,
  CheckCircle2,
  XCircle,
  Shield,
  ShieldAlert,
  GraduationCap,
} from 'lucide-react';
import { getSession, logoutAdmin, fetchActiveUsersCount } from '../api/workplaceApi';
import WorkplaceLogo from '../components/WorkplaceLogo';

const linkBase =
  'flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition';

export default function AdminWorkplaceLayout() {
  const navigate = useNavigate();
  const [activeCount, setActiveCount] = useState(null);
  const [isPrimaryAdmin, setIsPrimaryAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getSession();
      if (cancelled) return;
      if (!s?.role || s.role !== 'admin') {
        navigate('/workplace/login', { replace: true });
        return;
      }
      if (!cancelled) {
        setIsPrimaryAdmin(!!(s.canManageWorkplaceRoles || s.canManageAdmins));
      }
      try {
        const c = await fetchActiveUsersCount();
        if (!cancelled) setActiveCount(c);
      } catch {
        if (!cancelled) setActiveCount(0);
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
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white min-h-screen pt-8 pb-6 px-4">
        <div className="mb-8 px-2">
          <WorkplaceLogo />
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Workplace</p>
        </div>

        <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">Users</p>
        <nav className="flex flex-col gap-1 mb-6">
          <NavLink
            to="/workplace/admin/users/pending"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <Clock className="h-4 w-4 shrink-0" aria-hidden />
            Pending approval
          </NavLink>
          <NavLink
            to="/workplace/admin/users/approved"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            Approved
          </NavLink>
          <NavLink
            to="/workplace/admin/users/rejected"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
            }
          >
            <XCircle className="h-4 w-4 shrink-0" aria-hidden />
            Rejected
          </NavLink>
        </nav>

        <NavLink
          to="/workplace/admin/active-users"
          className={({ isActive }) =>
            `${linkBase} mb-2 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
          }
        >
          <UserCheck className="h-4 w-4 shrink-0" aria-hidden />
          Active users
          {activeCount != null ? (
            <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {activeCount}
            </span>
          ) : null}
        </NavLink>

        <NavLink
          to="/workplace/admin/od"
          className={({ isActive }) =>
            `${linkBase} mb-2 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
          }
        >
          <FileText className="h-4 w-4 shrink-0" aria-hidden />
          OD submissions
        </NavLink>

        <NavLink
          to="/workplace/admin/riskm/admin"
          className={({ isActive }) =>
            `${linkBase} mb-2 ${isActive ? 'bg-orange-600 text-white' : 'text-[#2D334A]/80 hover:bg-orange-50'}`
          }
        >
          <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden />
          Risk management
        </NavLink>

        {isPrimaryAdmin ? (
          <>
            <NavLink
              to="/workplace/admin/manage-admins"
              className={({ isActive }) =>
                `${linkBase} mb-2 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
              }
            >
              <Shield className="h-4 w-4 shrink-0" aria-hidden />
              Admin accounts
            </NavLink>
            <NavLink
              to="/workplace/admin/registration-roles"
              className={({ isActive }) =>
                `${linkBase} mb-2 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
              }
            >
              <Tags className="h-4 w-4 shrink-0" aria-hidden />
              Registration roles
            </NavLink>
          </>
        ) : null}

        <NavLink
          to="/workplace/admin/projects"
          className={({ isActive }) =>
            `${linkBase} mb-2 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
          }
        >
          <FolderKanban className="h-4 w-4 shrink-0" aria-hidden />
          Projects
        </NavLink>

        <NavLink
          to="/workplace/admin/programmes"
          className={({ isActive }) =>
            `${linkBase} mb-6 ${isActive ? 'bg-[#2D334A] text-white' : 'text-[#2D334A]/80 hover:bg-gray-100'}`
          }
        >
          <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
          Programmes
        </NavLink>

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
        <div className="md:hidden flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <WorkplaceLogo className="h-6 max-w-[6.5rem]" />
          <button
            type="button"
            onClick={logout}
            className="text-sm font-semibold text-[#2D334A]"
          >
            Log out
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
