import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import type { Project } from "../../../services/projects-service";

type DeleteProjectModalProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onConfirm: (projectId: string) => void;
  isLoading?: boolean;
};

export function DeleteProjectModal({
  open,
  project,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteProjectModalProps) {
  if (!project) return null;

  return (
    <Modal open={open} title="Delete Project" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {project.name}
          </span>
          ? This action cannot be undone and will delete all associated project information.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => onConfirm(project.id)}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
