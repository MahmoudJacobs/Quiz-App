import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { QuizzCreateInterface } from '../../../../InterFaces/InterFaces';
import { Link, useNavigate } from "react-router-dom";


export default function QuizzDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [quizDetails, setQuizDetails] = useState({});


  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg3MTg1OGM4NWYxZWNkYmMyOTYwZTQiLCJlbWFpbCI6Im1haG1vdWQ3emVyb0B5YWhvby5jb20iLCJyb2xlIjoiSW5zdHJ1Y3RvciIsImlhdCI6MTcyMDIzMDczNywiZXhwIjoxNzIzODMwNzM3fQ.AlvPte15moOgcL_GrQPlqk5UwtEdyUxjTlMp3DrTroE";

  const getQuizzDetails = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3005/api/quiz/${id}`,
        {
          headers: {
            authorization: token
          }
        }
      )
      console.log(response.data);
      setQuizDetails(response.data);
      
    } catch(error) {
      console.log(error);
      
    }
  }



  useEffect(() => {
    getQuizzDetails();
  }, [id])
    
  return (
    <>
      <nav className="flex p-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link to={'/dashboard/Quizzes'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              quizzes
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <p className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">quizz details</p>
            </div>
          </li>
        </ol>
      </nav>

      <div className="sm:w-6/12 container p-5 ">
        <div className="p-5 border border border-gray-300 rounded-lg h-full">
          <h1 className="font-bold text-2xl text-center container sm:text-left">{quizDetails.title}</h1>
          <p className="font-semibold mt-3 mb-5 text-center sm:text-left">{new Date(quizDetails.schadule).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</p>
          <div className="flex flex-row mb-5 border border-gray-300 w-8/12 h-10 rounded-lg">
            <p className="p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">Duration</p>
            <p className="p-2 font-semibold ml-2">{quizDetails.duration}</p>
          </div>
          <div className="flex flex-row mb-5  border border-gray-300 w-8/12 h-10 rounded-lg">
            <p className="flex flex-grow p-2 bg-orange-100 font-bold w-vw h-full rounded-lg">Number of questions</p>
            <p className="p-2 font-semibold ml-2">{quizDetails.questions_number}</p>
          </div>
          <div className="flex flex-row mb-5  border border-gray-300 w-8/12 h-10 rounded-lg">
            <p className="flex flex-grow p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">Score per question</p>
            <p className="p-2 font-semibold ml-2">{quizDetails.score_per_question}</p>
          </div>
          <div className="flex flex-col mb-5  border border-gray-300 w-8/12 h-full rounded-lg">
            <p className="p-2 bg-orange-100 font-bold w-full h-full rounded-lg">Description</p>
            <p className="p-2 font-semibold ml-2">{quizDetails.description}</p>
          </div>
          {/* <div className="flex flex-row mb-5  border border-gray-300 w-8/12 h-10 rounded-lg">
            <p className="p-2 bg-orange-100 font-bold w-7/12 h-full rounded-lg">Question bank used</p>
            <p className="p-2 font-semibold ml-2">{quizDetails}</p>
          </div> */}
          <div className="flex justify-end font-bold">
            <button className="flex p-2 border rounded-full bg-black items-center justify-around w-24 text-white">
              <i className="fa-solid fa-pencil"></i>
              <p>Edit</p>
            </button>
          </div>
        </div>
      </div>
    </>
    )
}
