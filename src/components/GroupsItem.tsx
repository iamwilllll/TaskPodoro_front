import { useNavigate } from 'react-router';

type GroupsItemProps = {
    img?: string;
    name: string;
    description?: string;
    className?: string;
    id: string;
};

export default function GroupsItem({ img, name, description, className, id }: GroupsItemProps) {
    const navigate = useNavigate();

    const after =
        'after:-top-30 after:absolute after:-left-30 after:size-50 after:rounded-full after:bg-secondary-600 after:outline-2 after:opacity-50';
    const before =
        'before:-bottom-30 before:absolute before:-right-30 before:size-50 before:rounded-full before:bg-secondary-600 before:outline-2 before:opacity-50';

    return (
        <button
            onClick={() => navigate(`/group/${id}`)}
            className={`bg-secondary-500 relative flex  cursor-pointer flex-col items-center justify-center gap-5 overflow-hidden rounded text-white transition duration-500 hover:scale-105 lg:w-50 ${after} ${before} ${className}`}
        >
            <img
                src={img ? img : '/static/interrogationIcon.svg'}
                alt="Group img"
                className="size-15 rounded-full p-1 outline-3"
            />
            <h2 className="w-[calc(100%-30px)] truncate text-center font-semibold">{name}</h2>
            <p className="line-clamp-3 w-[calc(100%-30px)] text-center">{description}</p>
        </button>
    );
}
