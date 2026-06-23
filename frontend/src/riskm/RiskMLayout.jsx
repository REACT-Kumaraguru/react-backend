import { Outlet } from 'react-router-dom';

/**
 * Thin shell for RiskM routes nested under `/workplace` or `/workplace/admin`.
 * Primary navigation lives in UserWorkplaceLayout / AdminWorkplaceLayout.
 */
export default function RiskMLayout() {
  return (
    <div className="min-h-[min(70vh,720px)]">
      <Outlet />
    </div>
  );
}
