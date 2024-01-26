import { PAGE_SIZE } from "@/constants/filesConstants";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

const P = styled.p`
  font-size: 1rem;
  margin-left: 1rem;

  & span {
    font-weight: 500;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: #527a01;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.8;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover:not(:disabled) {
    background-color: #599d15;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

function Pagination({ count, page, handlePage }) {
  const currentPage = page;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    handlePage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    handlePage(prev);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P className="text-gray-25">
        Showing
        <span className="mx-0.5  text-color-primary-8">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>
        to
        <span className="mx-0.5  text-color-primary-8">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        of <span className="mx-0.5  text-color-primary-8">{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
