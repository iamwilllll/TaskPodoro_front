import GroupsItem from '../components/GroupsItem';
import { usePagination } from '../hooks';

const groups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Groups() {
    //! temporal
    const { setPage, page, totalPages, visibleGroups } = usePagination(groups);
    const buttonStyles = 'rounded border px-4 py-2 disabled:opacity-50';

    return (
        <div className="max-h-screen gap-10 lg:size-full">
            <section className="grid h-full grid-rows-[(1fr_5fr_5fr_5fr_fr5)] gap-5 lg:grid lg:h-[calc(100%-20px)] lg:grid-cols-2 lg:grid-rows-2">

                <div className="col-start-1 col-end-3 flex justify-end lg:row-start-3 lg:row-end-3 lg:h-10 lg:w-full">
                    <button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className={buttonStyles}>
                        Last
                    </button>

                    <span className="text-center">
                        {page} / {totalPages} {}
                    </span>

                    <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className={buttonStyles}>
                        Next
                    </button>
                </div>

                {visibleGroups.map((group, index) => (
                    <GroupsItem
                        key={index}
                        name={group.toString()}
                        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                        description=""
                        id="694b583274d448760590de7d"
                        className="line-clamp-3 h-55 lg:h-full lg:w-full"
                    />
                ))}
            </section>
        </div>
    );
}
