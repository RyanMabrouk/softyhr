import { Pagination } from '@nextui-org/react';
import React from 'react'

interface PaginationPropsType {
  page: number;
  pages:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Paggination({ page, pages, setPage }: PaginationPropsType) {
  return page > 0 ? (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={1}
        total={pages}
        onChange={(page: number) => setPage(page)}
      />
    </div>
  ) : null;
}

export default Paggination