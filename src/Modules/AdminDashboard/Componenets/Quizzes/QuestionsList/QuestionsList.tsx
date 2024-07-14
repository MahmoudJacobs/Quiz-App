import axios from "axios";
import { getBaseUrl } from "../../../../../Utils/Utils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import style from "../Questions.module.css";
import { QuestionsInterface } from "../../../../../InterFaces/InterFaces";
import ResponsivePaginationComponent from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function QuestionsList() {
  const { token } = useSelector(
    (state: { user: { token: string } }) => state.user
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [questions, setQuestions] = useState<QuestionsInterface[]>([]);
  const pageSize = 8;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionsInterface>({
    _id: "",
    title: "",
    description: "",
    difficulty: "",
    type: "",
    options: { A: "", B: "", C: "", D: "" },
    instructor: "",
    answer: "",
  });
  const { register, handleSubmit, reset } = useForm();

  const getAllQuestions = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/question`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
      setTotalPages(Math.ceil(res.data.length / pageSize));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to book");
      }
    }
  }, [token]);

  const onSubmit = async (data) => {
    const options = {
      A: data.a,
      B: data.b,
      C: data.c,
      D: data.d,
    };
    if (openAddModal) {
      try {
        const res = await axios.post(
          `${getBaseUrl()}/api/question`,
          {
            title: data.title,
            description: data.description,
            options: options,
            answer: data.answer,
            type: data.type,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(res.data.message);
        reset();
        handleClose();
        getAllQuestions();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Failed to book");
        }
      }
    }
    if (openEditModal) {
      try {
        const res = await axios.put(
          `${getBaseUrl()}/api/question/${selectedQuestion._id}`,
          {
            title: data.title,
            description: data.description,
            options: options,
            answer: data.answer,
            type: data.type,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(res.data.message);
        reset();
        handleClose();
        getAllQuestions();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Failed to book");
        }
      }
    }
    if (openDeleteModal) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${getBaseUrl()}/api/question/${selectedQuestion._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      reset();
      handleClose();
      getAllQuestions();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to book");
      }
    }
  };

  const handleClose = () => {
    setOpenAddModal(false);
    setOpenViewModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    reset();
  };

  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);

  // here a small calculate to display the number of questions according to the page number and every click we slice the array of questions
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="container relative p-4 mx-auto mt-2 border border-gray-400 ">
      <div className="flex items-center justify-between data-header">
        <h2 className="text-xl font-bold">Bank Of Questions</h2>
        <button
          type="button"
          className="p-3 border border-black rounded-lg"
          onClick={() => setOpenAddModal(true)}
        >
          + add question
        </button>
      </div>
      {/* Table Data */}
      <div className={`project-body mt-2 container rounded-4 shadow px-4 py-5`}>
        <ul className={`${style.responsiveTableProjects} bg-black`}>
          {/* Table header */}
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

        {/* Table body */}
        <ul className={`${style.responsiveTableProjects}`}>
          {currentQuestions.length > 0 ? (
            currentQuestions.map((quest: QuestionsInterface) => (
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
                  className={`${style.col} ${style.col3} flex items-center justify-between`}
                  data-label="Actions :"
                >
                  <ul className="flex items-center justify-center p-0 m-0">
                    <li
                      role="button"
                      className="px-3 py-1 pt-2 "
                      onClick={() => {
                        setOpenViewModal(true);
                        setSelectedQuestion(quest);
                      }}
                    >
                      <div className="flex flex-col items-center gap-1 dropdown-div ">
                        <i className="fa-solid fa-eye"></i>
                        {window.innerWidth < 650 ? "" : <span>View</span>}
                      </div>
                    </li>
                    <li
                      role="button"
                      className="px-3 py-1"
                      onClick={() => {
                        setOpenEditModal(true);
                        setSelectedQuestion(quest);
                      }}
                    >
                      <div
                        role="button"
                        className="flex flex-col items-center gap-1 dropdown-div"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        {window.innerWidth < 650 ? "" : <span>Edit</span>}
                      </div>
                    </li>
                    <li
                      role="button"
                      className="px-3 py-1"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedQuestion(quest);
                      }}
                    >
                      <div
                        role="button"
                        className="flex flex-col items-center gap-1 dropdown-div"
                      >
                        <i className="fa fa-trash "></i>
                        {window.innerWidth < 650 ? "" : <span>Delete</span>}
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            ))
          ) : (
            <NoData />
          )}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-5">
        <ResponsivePaginationComponent
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {/* Overlay and Modal */}
      <Dialog
        className="fixed inset-0 z-50 overflow-y-auto"
        open={openAddModal || openDeleteModal || openEditModal || openViewModal}
        onClose={handleClose}
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />

        <DialogPanel className="relative w-full max-w-md m-auto mt-20 overflow-hidden bg-white rounded-lg shadow-lg sm:max-w-lg">
          <div className="p-4 sm:p-6">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {openDeleteModal
                ? "Delete question"
                : openEditModal
                ? "Edit question"
                : openViewModal
                ? "View question"
                : "Add question"}
              <hr className="my-3" />
            </DialogTitle>
            {openDeleteModal || openAddModal || openEditModal ? (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                {openDeleteModal ? (
                  <p className="text-sm text-gray-700">
                    Are you sure you want to delete this Question?
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-5 mb-4 formBody">
                      <div className="relative w-full">
                        <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF]  pr-4 sm:pr-8 rounded-lg">
                          Title
                        </span>
                        <input
                          type="text"
                          {...register("title")}
                          defaultValue={
                            openEditModal ? selectedQuestion.title : ""
                          }
                          className="block w-full px-3 py-2 pl-16 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-20 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                          data-attr="title"
                        />
                      </div>
                      <div className="relative w-full h-[100px]">
                        <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF]  pr-4 sm:pr-8 rounded-lg">
                          Description
                        </span>
                        <input
                          type="text"
                          {...register("description")}
                          defaultValue={
                            openEditModal ? selectedQuestion.description : ""
                          }
                          className="block w-full h-full px-3 py-2 pl-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:pl-36"
                          data-attr="description"
                        />
                      </div>
                      <div className="flex items-center justify-center w-full gap-4 answers">
                        <div className="flex flex-col items-center w-full gap-2">
                          <div className="relative w-full">
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF]  pr-4 sm:pr-8 rounded-lg">
                              A
                            </span>
                            <input
                              type="text"
                              {...register("a")}
                              defaultValue={
                                openEditModal ? selectedQuestion.options.A : ""
                              }
                              className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="a"
                            />
                          </div>
                          <div className="relative w-full">
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF]  pr-4 sm:pr-8 rounded-lg">
                              B
                            </span>
                            <input
                              type="text"
                              {...register("b")}
                              defaultValue={
                                openEditModal ? selectedQuestion.options.B : ""
                              }
                              className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="b"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-center w-full gap-2">
                          <div className="relative w-full">
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF]  pr-4 sm:pr-8 rounded-lg">
                              C
                            </span>
                            <input
                              type="text"
                              {...register("c")}
                              defaultValue={
                                openEditModal ? selectedQuestion.options.C : ""
                              }
                              className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="c"
                            />
                          </div>
                          <div className="relative w-full">
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF] pr-4 sm:pr-8 rounded-lg">
                              D
                            </span>
                            <input
                              type="text"
                              {...register("d")}
                              defaultValue={
                                openEditModal ? selectedQuestion.options.D : ""
                              }
                              className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-full gap-4 correct_answer">
                        <div className="relative flex-1 w-full">
                          <span className="absolute top-0 left-0 h-full flex items-center px-3  pr-4 sm:pr-8 text-md font-bold bg-[#FFEDDF]  rounded-lg">
                            Answer
                          </span>
                          <input
                            type="text"
                            {...register("answer")}
                            defaultValue={
                              openEditModal ? selectedQuestion.answer : ""
                            }
                            className="block px-3 py-2 pl-24 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:pl-28 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            data-attr="answer"
                          />
                        </div>
                        <div className="relative w-full flex-2">
                          <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF] pr-1 sm:pr-8 rounded-lg">
                            Type
                          </span>
                          <select
                            {...register("type")}
                            className="w-full p-2 border border-gray-400 rounded-md pl-11 sm:pl-20"
                            data-attr="type"
                          >
                            <option value={"FE"}>FE</option>
                            <option value={"FE"}>FE</option>
                            <option value={"BE"}>BE</option>
                            <option value={"FS"}>FS</option>
                            <option value={"AE"}>AE</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="px-4 py-2 mr-4 text-center text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {openDeleteModal
                      ? "Delete"
                      : openEditModal
                      ? "Edit"
                      : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-center text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="w-full my-4">
                  <div className={`${style.table_container} w-full`}>
                    <div className={`${style.table_row} w-full`}>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3 w-1/4`}
                      >
                        <p className="text-lg font-bold">Title</p>
                      </div>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3 w-3/4`}
                      >
                        <p>{selectedQuestion.title}</p>
                      </div>
                    </div>
                    <div className={`${style.table_row} w-full`}>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p className="text-lg font-bold">Description</p>
                      </div>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p>{selectedQuestion.description}</p>
                      </div>
                    </div>
                    <div className={`${style.table_row} w-full`}>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p className="text-lg font-bold">Difficulty</p>
                      </div>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p>{selectedQuestion.difficulty}</p>
                      </div>
                    </div>
                    <div className={`${style.table_row} w-full`}>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p className="text-lg font-bold">Type</p>
                      </div>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p>{selectedQuestion.type}</p>
                      </div>
                    </div>
                    <div className={`${style.table_row} w-full`}>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p className="text-lg font-bold">instructor</p>
                      </div>
                      <div
                        className={`${style.table_cell} border border-gray-300 p-3`}
                      >
                        <p>{selectedQuestion.instructor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-center text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
