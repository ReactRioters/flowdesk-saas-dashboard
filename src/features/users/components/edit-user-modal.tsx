import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Modal } from "../../../components/ui/modal";
import { Select } from "../../../components/ui/select";
import type { User } from "../../../services/users-service";
import { FormField } from "../../../components/ui/form-field";

type EditUserModalProps = {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
    isLoading?: boolean;
};

const editUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    role: z.enum(["Admin", "Manager", "Member"]),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export function EditUserModal({
    open,
    user,
    onClose,
    onSave,
    isLoading = false,
}: EditUserModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
    }, [user, reset]);

    const onSubmit = (values: EditUserFormValues) => {
        if (!user) return;

        onSave({
            ...user,
            ...values,
        });
        onClose();
    };

    if (!user) return null;

    return (
        <Modal open={open} title="Edit User" onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="Name" error={errors.name?.message}>
                    <Input {...register("name")} />
                </FormField>

                <FormField label="Email" error={errors.email?.message}>
                    <Input {...register("email")} />
                </FormField>

                <FormField label="Role" error={errors.role?.message}>
                    <Select {...register("role")} className="mt-2 w-full">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Member">Member</option>
                    </Select>
                </FormField>
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
