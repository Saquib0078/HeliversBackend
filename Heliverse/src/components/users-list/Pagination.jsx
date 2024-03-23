import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../app/slices/usersSlice";
const Pagination = () => {
  const { page, totalPages } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>

      <h5 id="pageNumber">{`${page} of Pages ${totalPages}`}</h5>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
