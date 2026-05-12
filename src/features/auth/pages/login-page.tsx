import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { AuthLayout } from "../components/auth-layout";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth-store";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (values: LoginFormValues) => {
        console.log(values);
        login();
        navigate("/");
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Sign in to continue to your FlowDesk dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email address
                        </label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            className="mt-2"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Password
                        </label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="mt-2"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}