import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Modal } from "../../../components/ui/modal";
import { Select } from "../../../components/ui/select";
import type { User } from "../../../services/users-service";

type EditUserModalProps = {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
};

type EditUserFormValues = {
    name: string;
    email: string;
    role: User["role"];
};

export function EditUserModal({
    open,
    user,
    onClose,
    onSave,
}: EditUserModalProps) {
    const { register, handleSubmit, reset } =
        useForm<EditUserFormValues>();

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
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                    </label>
                    <Input {...register("name")} className="mt-2" />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <Input {...register("email")} className="mt-2" />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Role
                    </label>
                    <Select {...register("role")} className="mt-2 w-full">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Member">Member</option>
                    </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
                    >
                        Cancel
                    </Button>

                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </Modal>
    );
}