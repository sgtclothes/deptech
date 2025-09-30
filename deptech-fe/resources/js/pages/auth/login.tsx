import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
    return (
        <AuthLayout
            title="Welcome back to DepTech Stock Management"
            description="Sign in to manage and monitor your stock efficiently"
        >
            <Head title="DepTech | Log in" />

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@deptech.id"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="mt-4 w-full bg-[#f53003] text-white hover:bg-[#d72a00] dark:bg-[#FF4433] dark:hover:bg-[#e63b2c]"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Log in
                        </Button>
                    </div>
                )}
            </Form>

            {/* Status */}
            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-[#706f6c] dark:text-[#A1A09A]">
                © {new Date().getFullYear()} DepTech Stock Management. All
                rights reserved.
            </div>
        </AuthLayout>
    );
}
