import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome | DepTech Stock Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#fdfdfc] via-[#f6f6f5] to-[#eaeaea] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:via-[#111] dark:to-[#161615]">
                {/* Navbar */}
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-5xl">
                    <nav className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold tracking-wide text-[#1b1b18] dark:text-[#EDEDEC]">
                            DepTech
                            <span className="ml-1 text-[#f53003] dark:text-[#FF4433]">
                                Stock Management
                            </span>
                        </h1>
                        <div>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-md border border-[#19140035] px-5 py-2 text-sm font-medium text-[#1b1b18] transition hover:border-[#1915014a] hover:bg-[#f6f6f5] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#1a1a1a]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="inline-block rounded-md bg-[#f53003] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#d72a00] dark:bg-[#FF4433] dark:hover:bg-[#e63b2c]"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex w-full max-w-[335px] flex-col items-center text-center lg:max-w-5xl lg:flex-row lg:text-left">
                    <div className="flex-1 p-6 lg:p-12">
                        <h2 className="mb-4 text-3xl leading-tight font-bold text-[#1b1b18] sm:text-4xl lg:text-5xl dark:text-[#EDEDEC]">
                            Manage Your Stock <br className="hidden sm:block" />{' '}
                            With{' '}
                            <span className="text-[#f53003] dark:text-[#FF4433]">
                                Ease & Confidence
                            </span>
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-[#706f6c] sm:text-base dark:text-[#A1A09A]">
                            DepTech Stock Management membantu Anda memantau,
                            mengontrol, dan mengelola inventori dengan lebih
                            cepat dan efisien. Didesain untuk bisnis modern yang
                            butuh kecepatan dan akurasi.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-md bg-[#f53003] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#d72a00] dark:bg-[#FF4433] dark:hover:bg-[#e63b2c]"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="rounded-md bg-[#f53003] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#d72a00] dark:bg-[#FF4433] dark:hover:bg-[#e63b2c]"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center lg:p-12">
                        <img
                            src="https://cdn.botpenguin.com/assets/website/Inventory_Management_7424602b6c.png"
                            alt="DepTech Stock Management Illustration"
                            className="w-full max-w-md rounded-lg shadow-lg dark:shadow-[0px_0px_10px_#111]"
                        />
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-10 text-center text-xs text-[#706f6c] dark:text-[#A1A09A]">
                    © {new Date().getFullYear()} DepTech Stock Management. All
                    rights reserved.
                </footer>
            </div>
        </>
    );
}
