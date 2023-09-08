'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  count?: number;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
}

export const Pagination = ({ count, setSkip, skip }: PaginationProps) => {
  const totalRegistries = count || 0;
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextSkipValue = itemsPerPage * selected;
    setSkip(nextSkipValue);
  };

  const currentPage = skip / itemsPerPage;

  return (
    <div className="w-full flex items-center justify-center gap-2 mt-2">
      <ReactPaginate
        breakLabel="..."
        pageCount={Math.ceil(totalRegistries / 10)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="flex items-center gap-2 h-8 "
        pageClassName="flex items-center justify-center lg:w-[20px] lg:h-[20px] xl:w-[26px] xl:h-[26px] rounded-full text-white bg-slate-600 hover:bg-blue-500"
        pageLinkClassName="text-white lg:text-xs xl:text-sm flex justify-center items-center lg:w-[20px] lg:h-[20px] xl:w-[26px] xl:h-[26px] rounded-full"
        activeLinkClassName="bg-blue-500"
        nextLabel=""
        previousLabel=""
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </div>
  );
};
