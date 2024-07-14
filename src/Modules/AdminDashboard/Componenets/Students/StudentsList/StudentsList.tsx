import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  StudentFormData,
  StudentsInterface,
} from "../../../../../InterFaces/InterFaces";
import { getBaseUrl } from "../../../../../Utils/Utils";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import studentImg from "../../../../../assets/images/studentImg.jpg"
import style from "../Students.module.css";

const StudentsList = () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setopenViewModal] = useState(false);
  const { handleSubmit, reset } = useForm();

  const [studentsList, setStudentsList] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [showView, setShowView] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudentFirstName, setSelectedStudentFirstName] = useState("");
  const [selectedStudentLastName, setSelectedStudentLastName] = useState("");
  const [selectedStudentEmail, setSelectedStudentEmail] = useState("");
  const [selectedStudentRole, setSelectedStudentRole] = useState("");

  // get all groups to display
  const getAllStudents = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/student`, {
        headers: {
          Authorization: token,
        },
      });
      setStudentsList(res.data);
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  }, [token]);

  // variable submmition for add , delete and view
  const onSubmit = async (formData: StudentFormData) => {
    if (openDeleteModal) {
      await handleDelete(studentId);
    } else if (openViewModal) {
      await handleShowStudent(studentId);
    } else if (openAddModal) {
      await handleAdd(formData);
    }
  };

  // close the modal for all
  const handleClose = () => {
    setOpenAddModal(false);
    setopenViewModal(false);
    setOpenDeleteModal(false);
    reset();
  };

  // view selected student
  const handleShowStudent = (student: StudentsInterface) => {
    setSelectedStudentFirstName(student.first_name);
    setSelectedStudentLastName(student.last_name);
    setSelectedStudentEmail(student.email);
    setSelectedStudentRole(student.role);
    setShowView(true);
  };

  // delete the selected student
  const handleDelete = async (studentId: number) => {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3005/api/student/${studentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleClose();
      getAllStudents();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  
  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className="flex justify-center m-auto">
      <div className="container px-4 py-5 mt-5 shadow project-body head-bg rounded-4">
        <div>
          <section className="my-4">
            <h1 className="mb-3 text-xl text-bold">Students List</h1>
            <ul className={`${style.groups}`}>
              <li>Group 1</li>
              <li>Group 2</li>
              <li>Group 3</li>
            </ul>
            <ul className={`${style.responsiveTableProjects}`}>
              {studentsList.length > 0 ? (
                studentsList.map((student: StudentsInterface) => (
                  <li
                    key={student._id}
                    className={`${style.tableRow} flex flex-col sm:flex-row items-center justify-between`}
                  >
                    <div
                      className={`${style.col} flex justify-items-center`}
                      data-label="Name :"
                    >
                      <img style={{width: "40px"}} src={studentImg} alt="student image" />
                      <span style={{display: "flex", alignItems: "center"}}> {student?.first_name} {student?.last_name} </span>
                    </div>
                    <div
                      className={`${style.col} p-0 flex items-between justify-start sm:justify-end`}
                      data-label="Actions :"
                    >
                      <ul className="flex items-center justify-center gap-3 p-0 m-0">

                        {/* View button */}
                        <button
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setopenViewModal(true);
                            handleShowStudent(student)
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fas fa-eye"></i>
                            <span className="hidden sm:inline">View</span>
                          </div>
                        </button>
                        {/* Delete button */}
                        <button
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            // setSelectedStudent(studentId);
                            // handleDelete(student._id);
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fa-regular fa-trash-can"></i>
                            <span className="hidden sm:inline">Delete</span>
                          </div>
                        </button>
                      </ul>
                    </div>
                  </li>
                ))
              ) : (
                <NoData />
              )}
            </ul>
          </section>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        className="fixed inset-0 z-50 overflow-y-auto"
        open={openAddModal || openDeleteModal || openViewModal}
        onClose={() => {
          setOpenAddModal(false);
          setopenViewModal(false);
          setOpenDeleteModal(false);
          reset();
        }}
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />

        <DialogPanel className="relative w-full max-w-md m-auto mt-20 overflow-hidden bg-white rounded-lg shadow-lg sm:max-w-lg">
          <div className="p-4 sm:p-6">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {openDeleteModal
                ? "Delete Student"
                : openViewModal
                  ? "Student Details"
                  : "Add Student"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              {openDeleteModal ? (
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete this student?
                </p>
              ) : (
                <>
                  <div>
                    <p className="">{`Name: ${selectedStudentFirstName} ${selectedStudentLastName}`}</p>
                    <p className="">{`Email: ${selectedStudentEmail}`}</p>
                    <p className="">{`Role: ${selectedStudentRole}`}</p>
                  </div>

                </>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 mr-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handleDelete(student._id)}
                >
                  {openDeleteModal ? "Delete" : openViewModal ? "View" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
};

export default StudentsList;
