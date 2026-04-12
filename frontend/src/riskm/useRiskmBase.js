import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RiskM lives under workplace only:
 * - Users: /workplace/riskm/...
 * - Admins: /workplace/admin/riskm/...
 */
export function useRiskmBase() {
  const { pathname } = useLocation();
  return useMemo(
    () => (pathname.startsWith('/workplace/admin') ? '/workplace/admin/riskm' : '/workplace/riskm'),
    [pathname],
  );
}
