import axios from "axios";
import { getBaseUrl } from "../../../../../Utils/Utils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import style from "./Questions.module.css";
import { QuestionsInterface } from "../../../../../InterFaces/InterFaces";

export default function QuestionsList() {
  const { token } = useSelector(
    (state: { user: { token: string } }) => state.user
  );
  const [questions, setQuestions] = useState();
  const getAllQuestions = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/question`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);
  return (
    <div className="">
      <div
        className={`project-body  mt-5 container rounded-4 shadow px-4 py-5 borer border-slate-900`}
      >
        <ul className={`${style.responsiveTableProjects}  bg-black`}>
          <li className={`${style.tableHeader} text-white`}>
            <div className={`${style.col} ${style.col4}`}>Question Title</div>
            <div className={`${style.col} ${style.col2}`}>Question Desc</div>
            <div className={`${style.col} ${style.col5}`}>
              Question difficulty level
            </div>
            <div className={`${style.col} ${style.col2}`}>Date</div>
            <div className={`${style.col} ${style.col3}`}>Actions</div>
          </li>
        </ul>
        {
          <ul className={`${style.responsiveTableProjects}`}>
            {questions && questions.length > 0 ? (
              questions.map((quest: QuestionsInterface) => (
                <li key={quest._id} className={`${style.tableRow} py-0 px-2`}>
                  <div
                    className={`${style.col} ${style.col4}`}
                    data-label="Title"
                  >
                    {quest.title}
                  </div>
                  <div
                    className={`${style.col} ${style.col2}`}
                    data-label="Description :"
                  >
                    {quest.description}
                  </div>

                  <div
                    className={`${style.col} ${style.col5}`}
                    data-label="Difficulty :"
                  >
                    {quest.difficulty}
                  </div>
                  <div
                    className={`${style.col} ${style.col2}`}
                    data-label="Type :"
                  >
                    {quest.type}
                  </div>
                  <div
                    className={`${style.col} ${style.col3}`}
                    data-label="Actions :"
                  >
                    <div className="btn-group">
                      {/* {window.innerWidth < 650 ? (
                        ""
                      ) : (
                        <i
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="fa-solid fa-ellipsis"
                        ></i>
                      )} */}
                      <ul className="flex items-center justify-center m-0 p-0">
                        <li
                          role="button"
                          className="px-3 py-1 pt-2 "
                          onClick={() => {}}
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
                  </div>
                </li>
              ))
            ) : (
              <NoData />
            )}
          </ul>
        }
      </div>
    </div>
  );
}
