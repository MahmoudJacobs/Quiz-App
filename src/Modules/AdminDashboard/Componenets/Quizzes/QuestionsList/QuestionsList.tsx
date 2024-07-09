import axios from "axios";
import { getBaseUrl } from "../../../../../Utils/Utils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import style from "./Questions.module.css";
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
  // const [questType, setQuestType] = useState<string>('');
  const { register, handleSubmit, reset } = useForm();

  const getAllQuestions = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/question`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
      setTotalPages(Math.ceil(res.data.length / pageSize));
    } catch (error) {
      console.log(error);
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
      console.log(data);
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
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setOpenViewModal(false);
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
      {/*Table Data */}
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
                      onClick={() => setOpenViewModal(true)}
                    >
                      <div className="dropdown-div flex flex-col items-center gap-1 ">
                        <i className="fa-solid fa-eye"></i>
                        {window.innerWidth < 650 ? "" : <span>View</span>}
                      </div>
                    </li>
                    <li
                      role="button"
                      className="px-3 py-1"
                      onClick={() => setOpenEditModal(true)}
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
                      onClick={() => setOpenDeleteModal(true)}
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
      {/*overlay and modal */}
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
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              {openDeleteModal ? (
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete this Question?
                </p>
              ) : (
                <>
                  <div className="mb-4 flex flex-col gap-2 items-center formBody">
                    <input
                      type="text"
                      {...register("title")}
                      defaultValue={""}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      data-attr="title"
                    />

                    <input
                      type="text"
                      {...register("description")}
                      defaultValue={""}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-16"
                      data-attr="description"
                    />

                    <div className="answers w-full flex items-center justify-center gap-4">
                      <div className="flex items-center flex-col w-1/2 gap-2">
                        <input
                          type="text"
                          {...register("a")}
                          defaultValue={""}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          data-attr="a"
                        />

                        <input
                          type="text"
                          {...register("b")}
                          defaultValue={""}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          data-attr="b"
                        />
                      </div>
                      <div className="flex items-center flex-col w-1/2 gap-2">
                        <input
                          type="text"
                          {...register("c")}
                          defaultValue={""}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          data-attr="c"
                        />
                        <input
                          type="text"
                          {...register("d")}
                          defaultValue={""}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          data-attr="d"
                        />
                      </div>
                    </div>
                    <div className="correct_answer w-full flex items-center justify-center gap-4">
                      <input
                        type="text"
                        {...register("answer")}
                        defaultValue={""}
                        className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-1/2"
                        data-attr="answer"
                      />
                      <select
                        {...register("type")}
                        className="w-1/2 border border-gray-400 p-2 rounded-md"
                        data-attr="type"
                      >
                        <option value={"FE"} selected>
                          FE
                        </option>
                        <option value={"FE"}>FE</option>
                        <option value={"BE"}>BE</option>
                        <option value={"FS"}>FS</option>
                        <option value={"AE"}>AE</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4"></div>
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {openDeleteModal ? "Delete" : openEditModal ? "Edit" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

// here a small calculate to display the number of questions according to the page number and every click we slice the array of questions
