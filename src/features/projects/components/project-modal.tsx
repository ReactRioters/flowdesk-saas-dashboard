import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Modal } from "../../../components/ui/modal";
import { Select } from "../../../components/ui/select";
import type { Project } from "../../../services/projects-service";
import { FormField } from "../../../components/ui/form-field";

type ProjectModalProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Omit<Project, "id"> & { id?: string }) => void;
  isLoading?: boolean;
};

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["Active", "Completed", "On Hold"] as const),
  progress: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0, "Progress must be at least 0").max(100, "Progress cannot exceed 100")
  ),
  membersCount: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0, "Members count must be at least 0")
  ),
  dueDate: z.string().min(1, "Due date is required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectModal({
  open,
  project,
  onClose,
  onSave,
  isLoading = false,
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as Resolver<ProjectFormValues>,
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
        status: project.status,
        progress: project.progress,
        membersCount: project.membersCount,
        dueDate: project.dueDate,
      });
    } else {
      reset({
        name: "",
        description: "",
        status: "Active",
        progress: 0,
        membersCount: 1,
        dueDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [project, reset, open]);

  const onSubmit = (values: ProjectFormValues) => {
    onSave({
      ...(project ? { id: project.id } : {}),
      ...values,
    });
    onClose();
  };

  return (
    <Modal open={open} title={project ? "Edit Project" : "Create Project"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Project Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Enter project name" />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <textarea
            {...register("description")}
            placeholder="Describe the project goal..."
            className="w-full min-h-[80px] rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Status" error={errors.status?.message}>
            <Select {...register("status")} className="mt-2 w-full">
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </Select>
          </FormField>

          <FormField label="Due Date" error={errors.dueDate?.message}>
            <Input type="date" {...register("dueDate")} />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Progress (%)" error={errors.progress?.message}>
            <Input type="number" min="0" max="100" {...register("progress")} />
          </FormField>

          <FormField label="Members Count" error={errors.membersCount?.message}>
            <Input type="number" min="0" {...register("membersCount")} />
          </FormField>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : project ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
