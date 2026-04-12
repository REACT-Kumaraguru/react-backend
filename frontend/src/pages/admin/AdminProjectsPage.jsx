import AdminProgrammeGuard from '../../components/programmes/AdminProgrammeGuard';
import ProjectsAdmin from '../../components/projects/ProjectsAdmin';

export default function AdminProjectsPage() {
  return (
    <AdminProgrammeGuard loginReturnPath="/workplace/admin/projects">
      <ProjectsAdmin />
    </AdminProgrammeGuard>
  );
}
