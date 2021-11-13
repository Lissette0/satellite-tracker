import "./Sidebar.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function Page({ addSat }) {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://alanyu108-satellite-backend.herokuapp.com/api/satellites/page=1/`
      );
      const data = await res.json();
      setItems(data);

      const res1 = await fetch(
        `https://alanyu108-satellite-backend.herokuapp.com/api/satellites/`
      );
      const data1 = await res1.json();
      const total = data1.length;
      setpageCount(Math.ceil(total / 5));
      //console.log(total/5)
    };
    getComments();
  }, []);

  //console.log(items);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://alanyu108-satellite-backend.herokuapp.com/api/satellites/page=${currentPage}/`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    //console.log(data.selected);

    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  return (
    <>
      <div id="page">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount} //get max pages
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <hr />

      <div className="content">
        <div id="content1">
          {items.map((item) => {
            return (
              <div key={item.name}>
                <div className="inner-content">
                  <p className="sat-label">
                    {" "}
                    <b className="name">{item.name}</b>{" "}
                  </p>
                  <p className="sat-label">
                    <b> Classification: </b> {item.classification}
                  </p>
                  <p className="sat-label">
                    {" "}
                    <b>International designation: </b>{" "}
                    {item.international_designation}{" "}
                  </p>
                  <p className="sat-label">
                    {" "}
                    <b>Description:</b> {item.description}{" "}
                  </p>

                  {/* add display satelitte and show path buttons */}
                  {/*
                   */}
                  <button
                    onClick={() => addSat(item)}
                    className="pl-2 pr-2 mr-2 border-2 border-white-600 "
                  >
                    Display Satellite
                  </button>
                  <button className="pl-2 pr-2 mr-2 border-2 border-white-600">
                    Show Path
                  </button>
                  <button className="pl-2 pr-2 mr-2 border-2 border-white-600">
                    Check Visibility
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Page;
