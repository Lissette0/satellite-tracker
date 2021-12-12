import "./Sidebar.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
// import SideBarButton from "./SideBarButton";
// import { MdDescription } from "react-icons/md";
// import { FiChevronDown } from "react-icons/fi";
// import { FiChevronUp } from "react-icons/fi";

function Page({ addSat, visibilityHandler }) {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://alanyu108-satellite-backend.herokuapp.com/api/debris/page=1/`
      );
      const data = await res.json();
      setItems(data);
      setIsLoading(false);


      const res1 = await fetch(
        `https://alanyu108-satellite-backend.herokuapp.com/api/debris/all/`
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
      `https://alanyu108-satellite-backend.herokuapp.com/api/debris/page=${currentPage}/`
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
          marginPagesDisplayed={2}
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
          activeClassName={"pagination__link--active"}
        />
      </div>
      <hr />

      <div className="content">
        <div id="content1">
          {isLoading && <p style={{ color: 'white', margin: "20px" }}>LOADING...</p>}
          {items.map((item) => {
            return (
              <div key={item.norad}>
                <div class="justify-center items-center">
                  <div class=" rounded overflow-hidden shadow-lg ">
                    <div class="px-6 py-4 ">
                      <div class="font-bold text-xl mb-2">{item.name}</div>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Inclination:</b>{" "}
                        <span class="text-gray-400">{item.inclination}</span>
                      </p>

                      <p class="text-gray-300 text-base  mr-2">
                        <b>Raan:</b>{" "}
                        <span class="text-gray-400">{item.raan}</span>
                      </p>

                      <p class="text-gray-300 text-base  mr-2">
                        <b>Eccentricity:</b>{" "}
                        <span class="text-gray-400">{item.eccentricity}</span>
                      </p>

                      <p class="text-gray-400 text-base"></p>

                      {/* drop down for description  */}

                      {/* <div>
                        <div className="labels labels1" id="clear">
                          <MdDescription id="clearIcon1" /> Description
                          <button
                            style={{ float: "right" }}
                            onClick={() => setShow((s) => !s)}
                          >
                            <FiChevronDown
                              style={{ display: show ? "block" : "none" }}
                              id="dropIcon"
                            />
                            <FiChevronUp
                              style={{ display: show ? "none" : "block" }}
                              id="dropIcon"
                            />
                          </button>
                        </div>

                        <div style={{ display: show ? "none" : "block" }}>
                          <p
                            class="text-gray-400 text-base"
                            style={{ padding: "10px 0px 0px 0px" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div> */}

                      {/* end of drop down for description  */}
                    </div>


                    <div class="px-6 py-4">
                      {/* <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <SideBarButton
                          label="Satellite"
                          clickHandler={addSat}
                          obj={item}
                          dispStyle={"font-semibold"}
                        />
                      </span>
                      <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <SideBarButton
                          label="Path"
                          clickHandler={console.log}
                          obj={null}
                          dispStyle={"font-semibold"}
                        />
                      </span> */}
                      <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <button
                          className="font-semibold"
                        >
                          Show Debris
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        {/* <p style={{ color: 'white', margin: "20px"}}>LOADING...</p> */}
      </div>
    </>
  );
}
export default Page;
