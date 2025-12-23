import { ReactSVG } from 'react-svg';
import { useUser } from '../context';
import { useLogout } from '../hooks';

type HeaderProps = {
    className?: string;
};

export default function Header({ className }: HeaderProps) {
    const { currentUser } = useUser();
    const { logout } = useLogout();

    return (
        <section className={`${className} flex justify-between`}>
            <div className="mb-10 lg:mb-0">
                <p className="text-secondary-500 w-50 truncate text-2xl font-semibold lg:w-80">
                    Hi, {currentUser && currentUser?.name}
                </p>
                <p className="font-semilight text-secondary-400 truncate">Let's finish your task today!</p>
            </div>

            <button onClick={logout} title="log out">
                <ReactSVG
                    src="/static/logoutIcon.svg"
                    className="hover:text-secondary-600 text-error hidden cursor-pointer transition duration-500 hover:scale-115 lg:block"
                />
            </button>
        </section>
    );
}
