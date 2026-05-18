import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Profile Settings
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Update your personal information.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Full Name
                    </label>
                    <Input {...register("fullName")} className="mt-2" />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <Input {...register("email")} className="mt-2" />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Company
                    </label>
                    <Input {...register("company")} className="mt-2" />
                    {errors.company && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.company.message}
                        </p>
                    )}
                </div>

                <Button type="submit">Save Changes</Button>
            </form>
        </div>
    );
}