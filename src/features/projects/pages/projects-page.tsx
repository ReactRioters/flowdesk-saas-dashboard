import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderGit2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "../../../components/ui/page-header";
import { EmptyState } from "../../../components/ui/empty-state";
import { ErrorState } from "../../../components/ui/error-state";
import { Pagination } from "../../../components/ui/pagination";
import { downloadCSV } from "../../../utils/download-csv";
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
import { ProjectsTable } from "../components/projects-table";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
  } = useProjectsFilter(projects);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>(["projects"], (prevProjects) =>
        prevProjects ? [newProject, ...prevProjects] : [newProject]
      );
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
      queryClient.setQueryData<Project[]>(["projects"], (prevProjects) =>
        prevProjects?.map((proj) => (proj.id === updatedProj.id ? updatedProj : proj)) ?? []
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
      queryClient.setQueryData<Project[]>(["projects"], (prevProjects) =>
        prevProjects?.filter((proj) => proj.id !== deletedId) ?? []
      );
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

  const handleExport = () => {
    const rows = filteredProjects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      progress: `${project.progress}%`,
      membersCount: project.membersCount,
      dueDate: project.dueDate,
    }));

    downloadCSV("projects.csv", rows, [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status" },
      { key: "progress", label: "Progress" },
      { key: "membersCount", label: "Members" },
      { key: "dueDate", label: "Due Date" },
    ]);
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
        onExport={handleExport}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
          description={
            hasActiveFilters
              ? "Try resetting your filters or adjust your search."
              : "Try adjusting your filters or add a new project to get started."
          }
          actionLabel={hasActiveFilters ? "Reset filters" : undefined}
          onAction={hasActiveFilters ? resetFilters : undefined}
        />
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={setSelectedProject}
                  onDelete={(projectId) => {
                    const projectToDelete = projects.find(
                      (project) => project.id === projectId
                    );
                    if (projectToDelete) {
                      setProjectToDelete(projectToDelete);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <ProjectsTable
              projects={paginatedProjects}
              onEdit={setSelectedProject}
              onDelete={(projectId) => {
                const projectToDelete = projects.find(
                  (project) => project.id === projectId
                );
                if (projectToDelete) {
                  setProjectToDelete(projectToDelete);
                }
              }}
            />
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
