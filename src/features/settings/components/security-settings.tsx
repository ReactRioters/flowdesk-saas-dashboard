import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormField } from "../../../components/ui/form-field";
import { SettingsSection } from "../../../components/ui/settings-section";

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
        <SettingsSection
            title="Security Settings"
            description="Update your password and keep your account secure."
        >

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    label="Current Password"
                    error={errors.currentPassword?.message}
                >
                    <Input type="password" {...register("currentPassword")} />
                </FormField>

                <FormField
                    label="New Password"
                    error={errors.newPassword?.message}
                >
                    <Input type="password" {...register("newPassword")} />
                </FormField>

                <FormField
                    label="Confirm Password"
                    error={errors.confirmPassword?.message}
                >
                    <Input type="password" {...register("confirmPassword")} />
                </FormField>
                <Button type="submit">Update Password</Button>
            </form>
        </SettingsSection>
    );
}