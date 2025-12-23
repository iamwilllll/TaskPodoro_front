import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

type SideBarProps = {
    className?: string;
};

export default function SideBar({ className }: SideBarProps) {
    const Links = [
        { label: 'Overview', src: '/static/overviewIcon.svg', to: '/overview' },
        { label: 'Groups', src: '/static/groupsIcon.svg', to: '/groups' },
        { label: 'Settings', src: '/static/settingsIcon.svg', to: '/settings' },
    ];

    return (
        <nav className={`fixed top-4 right-4 flex-col lg:static ${className}`}>
            <ReactSVG src="/pomodoro_icon.svg" className="hidden h-15 w-full text-black lg:block" />

            <button className='hover:scale-115 focus:scale-115 transition duration-500 cursor-pointer hover:text-secondary-600 text-secondary-400'>
                <ReactSVG src="/static/menuIcon.svg" className="lg:hidden" />
            </button>


            <ul className="hidden flex-col items-center gap-5 lg:flex">
                {Links.map((link, index) => (
                    <li key={index} className="flex h-15 w-full">
                        <NavLink
                            to={link.to}
                            className={`flex size-full items-center gap-2 pl-2 text-xl transition duration-500 hover:scale-105`}
                        >
                            {({ isActive }) => {
                                const focusRouteStyle = isActive ? 'text-secondary-600' : 'text-secondary-400';

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
            </ul>
        </nav>
    );
}
