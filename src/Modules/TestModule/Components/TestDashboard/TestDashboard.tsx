import quizImg from "../../../../assets/images/quizImg.png";
import studentImg from "../../../../assets/images/studentImg.png";
import { Link } from "react-router-dom";

export default function TestDashboard() {
  return (
    <>
      <div className="container w-full mt-4 flex items-start justify-center">
        <div className="flex items-center justify-around w-full gap-2 flex-wrap lg:flex-nowrap mx-3 mt-10">
          {/*left side */}
          <div className="left border border-gray-300 w-full p-4">
            <div className="header flex items-center justify-between p-4">
              <h4>Upcoming 5 quizzes</h4>
              <Link to="/test/quizzes">
                <p className="flex items-center justify-center">
                  see all quizzes
                  <i className="fa-solid fa-arrow-right-long mx-1"></i>
                </p>
              </Link>
            </div>
            <hr />
            <div className="list p-2">
              <div className="flex items-center w-full gap-3 border border-gray-300 rounded-md my-4">
                <div className="quizImg">
                  <img src={quizImg} alt="..." className="size-24" />
                </div>
                <div className="content w-full flex flex-col gap-1 p-2">
                  <h1 className="font-semibold text-xl">learn js</h1>
                  <div className="flex items-start justify-start">
                    <p className="me-3">14-07-2024</p> |
                    <p className="ms-3">8:30 pm</p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p> No. of student’s enrolled: 10</p>
                    <p className="flex items-center justify-center">
                      <span className="hidden sm:block">open</span>
                      <i className="fa fa-arrow-alt-circle-right mx-1"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*right side */}
          <div className="left border border-gray-300 w-full p-4">
            <div className="header flex items-center justify-between p-4">
              <h4>Top 5 Results</h4>
              
            </div>
            <hr />
            <div className="list p-2">
              <div className="flex items-center w-full gap-3 border border-gray-300 rounded-md my-4">
                <div className="quizImg">
                  <img src={studentImg} alt="..." className="size-24" />
                </div>
                <div className="content w-full flex flex-col gap-4 p-2">
                  <h1 className="font-semibold text-xl">omar bazeed</h1>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start justify-start">
                      <p className="me-3">omarbazeed@gmail.com</p> |
                      <p className="ms-3">active</p>
                    </div>
                    <div>
                      <i className="fa fa-arrow-alt-circle-right mx-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
