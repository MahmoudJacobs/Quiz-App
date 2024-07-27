import { useEffect, useState } from "react";
import newQuizzPic from "../../../../assets/images/new quiz icon.svg";
import axios from "axios";
import { toast } from "react-toastify";
import quizzpic from "../../../../assets/images/Quiz img span.svg";
import vector from "../../../../assets/images/Vector2.svg";
import { QuizzJoinInterface } from "../../../../InterFaces/InterFaces";
import success from "../../../../assets/images/success.svg";
import { getBaseUrl } from "../../../../Utils/Utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function TestQuizzes() {
  const navigate = useNavigate();
  const [upcomingQuizList, setUpcomingQuizList] = useState([]);
  const [completedQuizList, setCompletedQuizList] = useState([]);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => {
    setOpenJoinModal(false);
  };

  const handleOpenQuiz = (quizId: string) => {
    navigate(`/dashboard/quizzes/${quizId}`);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      code: data.code,
    };

    if (openJoinModal) {
      await JoinQuizSubmit(formData);
    }
  };

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg3MTg1OGM4NWYxZWNkYmMyOTYwZTQiLCJlbWFpbCI6Im1haG1vdWQ3emVyb0B5YWhvby5jb20iLCJyb2xlIjoiSW5zdHJ1Y3RvciIsImlhdCI6MTcyMDIzMDczNywiZXhwIjoxNzIzODMwNzM3fQ.AlvPte15moOgcL_GrQPlqk5UwtEdyUxjTlMp3DrTroE";

  const tokenStudent =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg3MWEyNWM4NWYxZWNkYmMyOTYxMWEiLCJlbWFpbCI6Im1haG1vdWRnaW42QGdtYWlsLmNvbSIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzIwOTQ3NTU3LCJleHAiOjE3MjQ1NDc1NTd9.NiZdrcyDF1b3KiGzrVTemCTgdSCacPjC-DMPmzz2caY";

  const getUpcomingQuizz = async () => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/quiz/incomming`, {
        headers: {
          Authorization: token,
        },
      });
      setUpcomingQuizList(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message[0]);
      }
    }
  };

  const getCompletedQuizz = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3005/api/quiz/completed",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const quizzes = response.data;
      setCompletedQuizList(quizzes);
    } catch (error) {}
  };

  const JoinQuizSubmit = async (formData: QuizzJoinInterface) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/quiz/join`,
        {
          code: formData.code,
        },
        {
          headers: {
            Authorization: tokenStudent,
          },
        }
      );
      toast.success(response.data.message);
      handleClose();
      setOpenSuccessModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message[0]);
      }
    }
  };

  useEffect(() => {
    getCompletedQuizz();
    getUpcomingQuizz();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex md:flex-row p-5 md:container">
          <div className="p-5 xs:container">
            <button
              onClick={() => {
                setOpenJoinModal(true);
              }}
              className="w-full border border-gray-300 rounded-md flex flex-col items-center hover:bg-gray-300"
            >
              <img className="mt-6" src={newQuizzPic} />
              <p className="text-xl font-bold px-10 py-5">Join Quizz</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col p-10">
          <div className="border border-gray-300 lg:w-6/12 rounded-lg">
            <p className="font-bold text-left p-5">Upcoming quizzes</p>
            <div className="p-5">
              
                <div
                  className="border border-gray-300 rounded-lg p-5 flex flex-row text-left mb-5"
                >
                  <img src={quizzpic} />
                  <div className="flex-col p-3">
                    <p className="font-bold mb-2">Introduction to SQL Databases</p>
                    <p>
                      28/02/2025
                    </p>
                    <div className="flex flex-row justify-between mt-4 font-bold">
                      <p>No. of student's enrolled: 2</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          

          <Dialog
            className="fixed inset-0 z-50 overflow-y-auto"
            open={openJoinModal}
            onClose={() => {
              setOpenJoinModal(false);
              reset();
            }}
          >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />

            <DialogPanel className="relative w-full max-w-md sm:max-w-lg m-auto mt-20 rounded-lg overflow-hidden bg-white shadow-lg">
              <div className="p-4 sm:p-6">
                <DialogTitle className="text-xl font-bold text-gray-800 text-center">
                  Join Quizz
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <p className="font-semibold text-center mb-3">
                    Input the code recieved for the quiz below to join
                  </p>
                  <div className="mb-4">
                    <input
                      type="text"
                      {...register("code")}
                      defaultValue={""}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Quizz Code"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Join
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

          <Dialog
            className="fixed inset-0 z-50 overflow-y-auto"
            open={openSuccessModal}
            onClose={() => {
              setOpenSuccessModal(false);
            }}
          >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />

            <DialogPanel className="relative w-full max-w-md sm:max-w-lg m-auto mt-20 rounded-lg overflow-hidden bg-white shadow-lg">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <img className="w-2/12 mb-5" src={success} />
                  <p className="font-bold text-2xl mb-5">
                    Quiz Joined Successfully
                  </p>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </>
  );
}
