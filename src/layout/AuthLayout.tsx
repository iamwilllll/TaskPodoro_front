import { Link, Outlet } from 'react-router';
import { ReactSVG } from 'react-svg';
import AppLayout from './AppLayout';
type AuthLayoutProps = {
    message?: string;
};

export default function AuthLayout({ message }: AuthLayoutProps) {
    return (
        <AppLayout>
            <section className="flex h-full">
                <section
                    className={
                        'bg-secondary-500 relative hidden w-6/10 flex-col justify-between overflow-hidden lg:flex ' +
                        'before:absolute before:bottom-[-40%] before:left-[-30%] before:h-150 before:w-150 before:rounded-full before:bg-white/20 before:blur-[200px] ' +
                        'after:absolute after:top-[-40%] after:right-[-30%] after:h-150 after:w-150 after:rounded-full after:bg-white/20 after:blur-[200px]'
                    }
                >
                    <Link to="/">
                        <ReactSVG src="/pomodoro_icon.svg" className="p-8 text-white" />
                    </Link>

                    <h2 className="p-8 text-7xl font-extralight text-white">
                        {message ?? (
                            <>
                                Welcome.
                                <br />
                                Start your journey now with our management system.
                            </>
                        )}
                    </h2>
                </section>
                <section className="h-full w-full lg:w-4/10">
                    <Outlet />
                </section>
            </section>
        </AppLayout>
    );
}
