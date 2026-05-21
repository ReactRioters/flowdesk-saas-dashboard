import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Modal } from "../../../components/ui/modal";
import { Select } from "../../../components/ui/select";
import type { User } from "../../../services/users-service";
import { FormField } from "../../../components/ui/form-field";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id">) => void;
  isLoading?: boolean;
};

const addUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  role: z.enum(["Admin", "Manager", "Member"]),
  status: z.enum(["Active", "Pending", "Inactive"]),
  plan: z.enum(["Free", "Starter", "Pro", "Business"]),
});

type AddUserFormValues = z.infer<typeof addUserSchema>;

export function AddUserModal({
  open,
  onClose,
  onSave,
  isLoading = false,
}: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Member",
      status: "Active",
      plan: "Free",
    },
  });

  const onSubmit = (values: AddUserFormValues) => {
    onSave(values);
    onClose();
    reset();
  };

  return (
    <Modal open={open} title="Add User" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="John Doe" />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <Input {...register("email")} placeholder="john@example.com" />
        </FormField>

        <div className="grid grid-cols-3 gap-4">
          <FormField label="Role" error={errors.role?.message}>
            <Select {...register("role")} className="mt-2 w-full">
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Member">Member</option>
            </Select>
          </FormField>

          <FormField label="Status" error={errors.status?.message}>
            <Select {...register("status")} className="mt-2 w-full">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </FormField>

          <FormField label="Plan" error={errors.plan?.message}>
            <Select {...register("plan")} className="mt-2 w-full">
              <option value="Free">Free</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
              <option value="Business">Business</option>
            </Select>
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
            {isLoading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
