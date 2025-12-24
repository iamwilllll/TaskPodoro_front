import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePagination(groups: any) {
    const [page, setPage] = useState(1);

    const itemsPerPage = 4;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleGroups = groups.slice(start, end);
    const totalPages = Math.ceil(groups.length / itemsPerPage);

    return { page, setPage, totalPages, visibleGroups };
}
