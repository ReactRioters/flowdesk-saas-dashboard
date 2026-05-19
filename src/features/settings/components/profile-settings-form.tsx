import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormField } from "../../../components/ui/form-field";
import { SettingsSection } from "../../../components/ui/settings-section";

const profileSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    company: z.string().min(1, "Company is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileSettingsForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "Vijay Patil",
            email: "vijay@example.com",
            company: "FlowDesk",
        },
    });

    const onSubmit = (values: ProfileFormValues) => {
        console.log(values);
        toast.success("Profile settings updated");
    };

    return (
        <SettingsSection
            title="Profile Settings"
            description="Update your personal information."
        >

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField label="Full Name" error={errors.fullName?.message}>
                    <Input {...register("fullName")} />
                </FormField>

                <FormField label="Email" error={errors.email?.message}>
                    <Input {...register("email")} />
                </FormField>

                <FormField label="Company" error={errors.company?.message}>
                    <Input {...register("company")} />
                </FormField>

                <Button type="submit">Save Changes</Button>
            </form>
        </SettingsSection>
    );
}