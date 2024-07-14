import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";
import { useSelector } from "react-redux";
import { QuizzCreateInterface } from "../../../../InterFaces/InterFaces";

export default function QuizzDetails() {
  const animatedComponents = makeAnimated();
  const { id } = useParams<{ id: string }>();
  const [quizDetails, setQuizDetails] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedScore, setSelectedScore] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);

  const handleClose = () => {
    setOpenEditModal(false);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      title: data.title,
      description: data.description,
      questions_number: selectedQuestions.value,
      difficulty: selectedDifficulty.value,
      schadule: data.schadule,
      duration: selectedDuration.value,
      score_per_question: selectedScore.value,
    };

    if (openEditModal) {
      await updateQuizz(formData);
    }
  };

  const durations = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
    { value: "60", label: "60" },
  ];
  // const questions = [
  //   {value: 1, label: 1},
  //   {value: 5, label: 5},
  //   {value: 10, label: 10},
  //   {value: 15, label: 15},
  //   {value: 20, label: 20},
  //   {value: 25, label: 25},
  // ]
  const score = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  // const difficulty = [
  //   {value: 'easy', label: 'easy'},
  //   {value: 'medium', label: 'medium'},
  //   {value: 'hard', label: 'hard'},
  // ]
  // const type = [
  //   {value: 'FE', label: 'FE'},
  //   {value: 'BE', label: 'BE'},
  //   {value: 'DO', label: 'DO'},
  // ]

  const { token } = useSelector(
    (state: { user: { token: string } }) => state.user
  );
  

  const getQuizzDetails = async () => {
    try {
      const response = await axios.get(
        `${getBaseUrl()}/api/quiz/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setQuizDetails(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message[0]);
      }
    }
  };

  const updateQuizz = async (formData: QuizzCreateInterface) => {
    try {
      const response = await axios.put(
        `${getBaseUrl()}/api/quiz/${id}`,
        {
          title: formData.title,
          description: formData.description,
          // questions_number: formData.questions_number,
          // difficulty: formData.difficulty,
          schadule: formData.schadule,
          score_per_question: formData.score_per_question,
          duration: formData.duration,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      toast.success(response.data.message);
      getQuizzDetails();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message[0]);
      }
    }
  };

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getQuizzDetails();
  }, [id]);

  return (
    <>
      <nav className="flex p-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/dashboard/Quizzes"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              quizzes
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <p className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                quizz details
              </p>
            </div>
          </li>
        </ol>
      </nav>

      <div className="sm:w-6/12 container p-5 ">
        <div className="p-5 border  border-gray-300 rounded-lg h-full">
          <h1 className="font-bold text-2xl text-center container sm:text-left">
            {quizDetails.title}
          </h1>
          <p className="font-semibold mt-3 mb-5 text-center sm:text-left">
            {new Date(quizDetails.schadule).toLocaleString("en-US", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <div className="flex flex-row mb-5 border border-gray-300 container h-10 rounded-lg lg:w-8/12">
            <p className="p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">
              Duration
            </p>
            <p className="p-2 font-semibold ml-2">{quizDetails.duration}</p>
          </div>
          <div className="flex flex-row mb-5 border border-gray-300 container h-10 rounded-lg lg:w-8/12">
            <p className="flex p-2 bg-orange-100 font-bold w-full h-full rounded-lg">
              Number of questions
            </p>
            <p className="p-2 font-semibold ml-2">
              {quizDetails.questions_number}
            </p>
          </div>
          <div className="flex flex-row mb-5  border border-gray-300 container h-10 rounded-lg lg:w-8/12">
            <p className="flex flex-grow p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">
              Score per question
            </p>
            <p className="p-2 font-semibold ml-2">
              {quizDetails.score_per_question}
            </p>
          </div>
          <div className="flex flex-col mb-5  border border-gray-300 container h-full rounded-lg lg:w-8/12">
            <p className="p-2 bg-orange-100 font-bold w-full h-full rounded-lg">
              Description
            </p>
            <p className="p-2 font-semibold ml-2">{quizDetails.description}</p>
          </div>
          {/* <div className="flex flex-row mb-5  border border-gray-300 w-8/12 h-10 rounded-lg">
            <p className="p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">Question bank used</p>
            <p className="p-2 font-semibold ml-2">{quizDetails}</p>
          </div> */}
          <div className="flex justify-end font-bold">
            <button
              onClick={() => {
                setOpenEditModal(true);
              }}
              className="flex p-2 border rounded-full bg-black items-center justify-around w-24 text-white"
            >
              <i className="fa-solid fa-pencil"></i>
              <p>Edit</p>
            </button>
          </div>
        </div>
      </div>

      <Dialog
        className="fixed inset-0 z-50 overflow-y-auto"
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />

        <DialogPanel className="relative w-full max-w-md sm:max-w-lg m-auto mt-20 rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="p-4 sm:p-6">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Edit Quizz
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <input
                  type="text"
                  {...register("title")}
                  defaultValue={quizDetails.title}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Quiz Title"
                />
              </div>

              <label className="font-bold">Description</label>
              <div className="mb-4">
                <input
                  type="text"
                  {...register("description")}
                  defaultValue={quizDetails.description}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe the Quiz"
                />
              </div>

              {/* <div className="flex justify-between font-bold">
                <label className="ml-7">No. of questions</label>
                <label className="mr-20">Difficulty</label>
              </div> */}

              {/* <div className="mb-4 flex w-full justify-between">
                    
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={questions}
                      value={selectedQuestions}
                      onChange={(e) => setSelectedQuestions(e)}
                      menuPortalTarget={document.body}
                      className="container mr-4"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,
                        }),
                      }}
                    />
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={difficulty}
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e)}
                      menuPortalTarget={document.body}
                      className="container mr-4"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </div> */}

              <label className="font-bold">Schedule</label>
              <div className="mb-4">
                <input
                  type="datetime-local"
                  {...register("schadule")}
                  defaultValue={""}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex font-bold">
                <label>Score per question</label>
                <label className="ml-24">Duration</label>
              </div>

              <div className="mb-4 flex w-full justify-between">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={score}
                  value={selectedScore}
                  onChange={(e) => setSelectedScore(e)}
                  menuPortalTarget={document.body}
                  className="container mr-4"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={durations}
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e)}
                  menuPortalTarget={document.body}
                  className="container mr-4"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
