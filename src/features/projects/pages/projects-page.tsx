import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderGit2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "../../../components/ui/page-header";
import { EmptyState } from "../../../components/ui/empty-state";
import { ErrorState } from "../../../components/ui/error-state";
import { Pagination } from "../../../components/ui/pagination";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "../../../services/projects-service";
import { ProjectCard } from "../components/project-card";
import { ProjectModal } from "../components/project-modal";
import { DeleteProjectModal } from "../components/delete-project-modal";
import { ProjectsToolbar } from "../components/projects-toolbar";
import { ProjectsSkeleton } from "../components/projects-skeleton";
import { useProjectsFilter } from "../hooks/use-projects-filter";

export function ProjectsPage() {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const [localProjects, setLocalProjects] = useState<Project[]>(projects);

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredProjects,
    paginatedProjects,
    resetFilters,
    hasActiveFilters,
  } = useProjectsFilter(localProjects);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      setLocalProjects((prev) => [newProject, ...prev]);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (updatedProj) => {
      setLocalProjects((prev) =>
        prev.map((proj) => (proj.id === updatedProj.id ? updatedProj : proj))
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (deletedId) => {
      setLocalProjects((prev) => prev.filter((proj) => proj.id !== deletedId));
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const handleSaveProject = (data: Omit<Project, "id"> & { id?: string }) => {
    if (data.id) {
      updateProjectMutation.mutate(data as Project);
    } else {
      createProjectMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Monitor development milestones, project progress, and workspace collaborations."
      />

      <ProjectsToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        onCreateProject={() => setIsCreateOpen(true)}
      />

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {paginatedProjects.length} of {filteredProjects.length} projects
      </p>

      {isLoading ? (
        <ProjectsSkeleton />
      ) : isError ? (
        <ErrorState
          title="Failed to load projects"
          description="There was an error loading your projects. Please try refreshing the page."
        />
      ) : paginatedProjects.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="h-6 w-6" />}
          title="No projects found"
          description="Try adjusting your filters or add a new project to get started."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={setSelectedProject}
              onDelete={setProjectToDelete}
            />
          ))}
        </div>
      )}

      {!isLoading && paginatedProjects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Create Modal */}
      <ProjectModal
        open={isCreateOpen}
        project={null}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleSaveProject}
        isLoading={createProjectMutation.isPending}
      />

      {/* Edit Modal */}
      <ProjectModal
        open={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSave={handleSaveProject}
        isLoading={updateProjectMutation.isPending}
      />

      {/* Delete Modal */}
      <DeleteProjectModal
        open={!!projectToDelete}
        project={projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={(id) => deleteProjectMutation.mutate(id)}
        isLoading={deleteProjectMutation.isPending}
      />
    </div>
  );
}
