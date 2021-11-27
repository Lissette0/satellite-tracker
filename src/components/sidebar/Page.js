import "./Sidebar.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import SideBarButton from "./SideBarButton";

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
          {items.map((item) => {
            return (
              <div key={item.name}>
                <div class="flex justify-center items-center">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                    <div class="px-6 py-4 ">
                      <div class="font-bold text-xl mb-2">{item.name}</div>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Country :</b>{" "}
                        <span class="text-gray-400">{item.country}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Status :</b>{" "}
                        <span class="text-gray-400">{item.object_status}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Date :</b>{" "}
                        <span class="text-gray-400">{item.launch_date}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Site :</b>{" "}
                        <span class="text-gray-400">{item.launch_site}</span>
                      </p>
                      <p class="text-gray-400 text-base"></p>
                      <p
                        class="text-gray-400 text-base"
                        style={{ padding: "10px 0px 0px 0px" }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div class="px-6 py-4">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <button
                          onClick={() => addSat(item)}
                          className="pl-2 pr-2 mr-2 border-2 border-white-600 "
                          class="font-semibold"
                        >
                          Display Satellite
                        </button>
                      </span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <SideBarButton
                          label="Satellite"
                          clickHandler={addSat}
                          obj={item}
                          dispStyle={"font-semibold"}
                        />
                      </span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <SideBarButton
                          label="Path"
                          clickHandler={console.log}
                          obj={null}
                          dispStyle={"font-semibold"}
                        />
                      </span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <SideBarButton
                          label="Visibility"
                          clickHandler={console.log}
                          obj={null}
                          dispStyle={"font-semibold"}
                        />
                      </span>
                    </div>
                  </div>
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
