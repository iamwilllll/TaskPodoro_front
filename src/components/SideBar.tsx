import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useLogout } from '../hooks';

type SideBarProps = {
    className?: string;
};

export default function SideBar({ className }: SideBarProps) {
    const Links = [
        { label: 'Overview', src: '/static/overviewIcon.svg', to: '/overview' },
        { label: 'Groups', src: '/static/groupsIcon.svg', to: '/groups' },
        { label: 'Settings', src: '/static/settingsIcon.svg', to: '/settings' },
    ];

    const [modalActive, setModalActive] = useState(false);
    const { logout } = useLogout();

    return (
        <nav className={`fixed z-1000  top-4 right-4 flex-col lg:static ${className}`}>
            <Link to="overview  h-15">
                <ReactSVG src="/pomodoro_icon.svg" className="hidden w-full text-black lg:block" />
            </Link>

            <button
                title="open modal"
                className="hover:text-secondary-600 text-secondary-400 cursor-pointer transition duration-500 hover:scale-115 focus:scale-115"
                onClick={() => setModalActive(true)}
            >
                <ReactSVG src="/static/menuIcon.svg" className="lg:hidden" />
            </button>

            <ul
                className={`bg-sidebar fixed right-0 flex size-full flex-col items-center justify-center gap-5 transition-all duration-500 lg:static lg:justify-start lg:bg-transparent ${modalActive ? 'top-0' : '-top-500'}`}
            >
                {Links.map((link, index) => (
                    <li key={index} className="flex h-15 w-full">
                        <NavLink
                            to={link.to}
                            className={`flex size-full items-center justify-center gap-2 pl-2 text-xl transition duration-500 hover:scale-105 lg:justify-start`}
                        >
                            {({ isActive }) => {
                                const focusRouteStyle = isActive
                                    ? 'lg:text-secondary-600  text-white'
                                    : 'lg:text-secondary-400  text-secondary-400';

                                return (
                                    <>
                                        <ReactSVG src={link.src} className={focusRouteStyle} />
                                        <p className={focusRouteStyle}>{link.label}</p>
                                    </>
                                );
                            }}
                        </NavLink>
                    </li>
                ))}

                <li>
                    <button
                        title="close modal"
                        className="cursor-pointer text-white transition duration-500 hover:scale-115 focus:scale-115"
                        onClick={() => setModalActive(false)}
                    >
                        <ReactSVG src="/static/closeIcon.svg" className="lg:hidden" />
                    </button>
                </li>

                <li className="lg:hidden">
                    <button onClick={logout} title="log out">
                        <ReactSVG
                            src="/static/logoutIcon.svg"
                            className="hover:text-secondary-600 text-error cursor-pointer transition duration-500 hover:scale-115"
                        />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
