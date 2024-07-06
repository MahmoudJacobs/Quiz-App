import axios from "axios";

import { useEffect } from "react";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function Dashboard() {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
  const getTop5Quizzes = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/quiz`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTop5Quizzes();
  }, []);
  return (
    <div className="container w-full my-4">
      <div
        className="flex items-center justify-around w-full gap-3 flex-wrap"
        style={{ boxSizing: "content-box" }}
      >
        <div className="left border border-gray-300 w-1/2 p-3">
          <div className="header">
            <h4>Upcoming 5 quizzes</h4>
            <p>see all quizzes</p>
            <span></span>
          </div>
          <hr />
          <div className="list">
            <div className="card">1</div>
            <div className="card">1</div>
            <div className="card">1</div>
          </div>
        </div>
        <div className="right border border-gray-300 w-1/2 p-3">
          <div className="header">
            <h4>Upcoming 5 quizzes</h4>
            <p>see all quizzes</p>
          </div>
          <div className="list">
            <div className="card">1</div>
            <div className="card">1</div>
            <div className="card">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
