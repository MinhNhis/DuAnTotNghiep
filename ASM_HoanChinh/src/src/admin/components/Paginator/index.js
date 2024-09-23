import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = ({ paginator, onDataChange, initialPage = 1, pageSize = 10 }) => {
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        initData(page);
    }, [page]);

    const initData = async (page) => {
        const result = await paginator(page, pageSize);
        setTotalPages(result.pagination.totalPages);
        onDataChange(result);
    };

    return (
        <div className="mb-3 mt-3">
            <Stack spacing={2}>
                <Pagination sx={{'& .MuiPaginationItem-root': { fontSize: '20px', padding: '10px', minWidth: '40px', height: '48px',border: '1px solid gray', borderRadius: '8px', margin: '0 8px'}, }} 
                count={totalPages} shape="rounded" page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
}

export default PaginationRounded;
