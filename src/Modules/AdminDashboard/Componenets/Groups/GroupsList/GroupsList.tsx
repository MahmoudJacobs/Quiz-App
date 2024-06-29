import ResponsivePagination from "react-responsive-pagination";
import style from "../Groups.module.css";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../../Utils/Utils";
export default function GroupsList() {
  const [groups, setGroups] = useState<string | number[]>([]);

  const getAllGroups = useCallback(async () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
    try {
      const res = await axios.get(`${getBaseUrl()}/api/group`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      setGroups(res.data);
    } catch (error) {
      // const errMsg =
      //   axios.isAxiosError(error) && error.response?.data?.message
      //     ? error.response.data.message
      //     : "An unexpected error occurred";
      // toast.error(errMsg);
      console.log("bad");
    }
  }, []);

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  return (
    <div>
      <div
        className={`project-body head-bg mt-5 container rounded-4 shadow px-4 py-5`}
      >
        <ul className={`${style.responsiveTableProjects} text-white`}>
          <li className={`${style.tableHeader}`}>
            <div className={`${style.col} ${style.col1}`}>ID</div>
            <div className={`${style.col} ${style.col2}`}>UserName</div>
            <div className={`${style.col} ${style.col3}`}>Image</div>
            <div className={`${style.col} ${style.col4}`}>Creation Date</div>
            <div className={`${style.col} ${style.col5}`}>Actions</div>
            <div className={`${style.col} ${style.col6}`}>Status</div>
          </li>
        </ul>

        <ul className={`${style.responsiveTableProjects}`}>
          <h1>Groups</h1>
          {groups.length > 0 ? (
            groups.map(
              (group: { _id: string; name: string; max_students: number }) => (
                <li
                  key={group._id}
                  className={`${style.tableRow} bg-theme text-theme`}
                >
                  <div className={`${style.col} ${style.col1}`} data-label="ID">
                    {group._id}
                  </div>
                  <div
                    className={`${style.col} ${style.col2}`}
                    data-label="Name :"
                  >
                    {group.name}
                  </div>

                  <div
                    className={`${style.col} ${style.col4}`}
                    data-label="max_students :"
                  >
                    {group.max_students}
                  </div>
                  {/* <div
                  className={`${style.col} ${style.col5}`}
                  data-label="Actions :"
                >
                  <div className="btn-group">
                    {window.innerWidth < 650 ? (
                      ""
                    ) : (
                      <i
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="fa-solid fa-ellipsis"
                      ></i>
                    )}
                    <ul
                      className={`${
                        window.innerWidth < 650
                          ? "d-flex align-items-center justify-content-center "
                          : "dropdown-menu dropdown-menu-end"
                      } m-0 p-0`}
                    >
                      <li
                        role="button"
                        className="px-3 py-1 pt-2 "
                        onClick={() => handleShowUser(group)}
                      >
                        <div className="dropdown-div ">
                          <i className="m-2 fa-regular fa-eye"></i>
                          {window.innerWidth < 650 ? "" : <span>View</span>}
                        </div>
                      </li>
                      <li role="button" className="px-3 py-1">
                        <div role="button" className="dropdown-div">
                          <i className="m-2 fa-regular fa-pen-to-square "></i>
                          {window.innerWidth < 650 ? "" : <span>Edit</span>}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div> */}
                </li>
              )
            )
          ) : (
            <NoData />
          )}
        </ul>

        {/*Pagination*/}
        <div className="mt-5">
          <ResponsivePagination
            current={1}
            total={10}
            onPageChange={(page) => {
              setPageNumber(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}
