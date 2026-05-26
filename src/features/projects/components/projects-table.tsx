import { Users } from "lucide-react";
import { StatusBadge } from "../../../components/ui/status-badge";
import { Button } from "../../../components/ui/button";
import type { Project } from "../../../services/projects-service";

type ProjectsTableProps = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
};

export function ProjectsTable({ projects, onEdit, onDelete }: ProjectsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
          <tr>
            <th className="px-6 py-4 font-medium">Project</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Members</th>
            <th className="px-6 py-4 font-medium">Progress</th>
            <th className="px-6 py-4 font-medium">Due Date</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-slate-900 dark:text-white">
                  {project.name}
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-400 line-clamp-1">
                  {project.description}
                </p>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={project.status} />
              </td>
              <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{project.membersCount}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                {project.progress}%
              </td>
              <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                {project.dueDate}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onDelete(project.id)}
                    className="rounded-xl bg-rose-600 text-white hover:bg-rose-700"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
