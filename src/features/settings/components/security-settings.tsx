import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const securitySchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "New password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Confirm password is required"),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SecurityFormValues = z.infer<typeof securitySchema>;

export function SecuritySettings() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SecurityFormValues>({
        resolver: zodResolver(securitySchema),
    });

    const onSubmit = (values: SecurityFormValues) => {
        console.log(values);
        toast.success("Password updated successfully");
        reset();
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <Shield className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Security Settings
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Update your password and keep your account secure.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Current Password
                    </label>
                    <Input type="password" {...register("currentPassword")} className="mt-2" />
                    {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        New Password
                    </label>
                    <Input type="password" {...register("newPassword")} className="mt-2" />
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Confirm Password
                    </label>
                    <Input type="password" {...register("confirmPassword")} className="mt-2" />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button type="submit">Update Password</Button>
            </form>
        </div>
    );
}