import { NavLink, Outlet } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const linkBase =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition';

export default function AdminUsersLayout() {
  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
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
      </div>
      <Outlet />
    </div>
  );
}
