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
    <div className="container mx-auto mt-2 relative border border-gray-400 p-4 ">
      <div className="data-header flex justify-between items-center">
        <h2 className="font-bold text-xl">Bank Of Questions</h2>
        <button
          type="button"
          className="border border-black p-3 rounded-lg"
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
                  <ul className="flex items-center justify-center m-0 p-0">
                    <li
                      role="button"
                      className="px-3 py-1 pt-2 "
                      onClick={() => {
                        setOpenViewModal(true);
                        setSelectedQuestion(quest);
                      }}
                    >
                      <div className="dropdown-div flex flex-col items-center gap-1 ">
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
                        className="dropdown-div flex flex-col items-center gap-1"
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
                        className="dropdown-div flex flex-col items-center gap-1"
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

        <DialogPanel className="relative w-full max-w-md sm:max-w-lg m-auto mt-20 rounded-lg overflow-hidden bg-white shadow-lg">
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
                    <div className="mb-4 flex flex-col gap-5 items-center formBody">
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
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-16 sm:pl-20 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
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
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-32 sm:pl-36 h-full"
                          data-attr="description"
                        />
                      </div>
                      <div className="answers w-full flex items-center justify-center gap-4">
                        <div className="flex items-center flex-col w-full gap-2">
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
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-10 sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-10 sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="b"
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-col gap-2 w-full">
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
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-10 sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-10 sm:pl-16 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              data-attr="d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="correct_answer w-full flex items-center justify-center gap-4">
                        <div className="relative w-full flex-1">
                          <span className="absolute top-0 left-0 h-full flex items-center px-3  pr-4 sm:pr-8 text-md font-bold bg-[#FFEDDF]  rounded-lg">
                            Answer
                          </span>
                          <input
                            type="text"
                            {...register("answer")}
                            defaultValue={
                              openEditModal ? selectedQuestion.answer : ""
                            }
                            className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none pl-24 sm:pl-28 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            data-attr="answer"
                          />
                        </div>
                        <div className="relative w-full flex-2">
                          <span className="absolute top-0 left-0 h-full flex items-center pl-2 text-md font-bold bg-[#FFEDDF] pr-1 sm:pr-8 rounded-lg">
                            Type
                          </span>
                          <select
                            {...register("type")}
                            className="border border-gray-400 p-2 rounded-md pl-11 sm:pl-20 w-full"
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
                    className="mr-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
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
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-center"
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
                        <p className="font-bold text-lg">Title</p>
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
                        <p className="font-bold text-lg">Description</p>
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
                        <p className="font-bold text-lg">Difficulty</p>
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
                        <p className="font-bold text-lg">Type</p>
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
                        <p className="font-bold text-lg">instructor</p>
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
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-center"
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
