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
import style from "../Students.module.css";

const StudentsList = () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [allStudents, setAllStudents] = useState<StudentsInterface[]>([
    {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      status: false,
      role: "",
      // students: [],
    },
  ]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    _id: string;
  }>({
    name: "",
    _id: "",
  });

  // get all groups to display
  const getAllStudents = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/student`, {
        headers: {
          Authorization: token,
        },
      });
      setStudents(res.data);
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  }, [token]);

  // variable submmition for add , delete and edit
  const onSubmit = async (formData: StudentFormData) => {
    if (openDeleteModal) {
      await handleDelete(studentId);
    } else if (openEditModal) {
      await handleEdit(formData);
    } else if (openAddModal) {
      await handleAdd(formData);
    }
  };
  // close the modal for all
  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    reset();
    // setSelectedGroup({ _id: "", name: "" });
  };

  // delete the selected student
  const handleDelete = async (studentId: string) => {
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
  // add a new student
  const handleAdd = async (formData: StudentFormData) => {
    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3005/api/student`,
        {
          name: formData.first_name,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // getAllStudents();
      handleClose();
      // setSelectedGroup({ _id: "", name: "" });
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // edit the selected student
  const handleEdit = async (formData: StudentFormData) => {
    try {
      const res = await axios.put(
        `https://upskilling-egypt.com:3005/api/student/${selectedStudent.id}`,
        {
          name: formData.first_name,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAllStudents();
      handleClose();
      // setSelectedGroup({ _id: "", name: "" });
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    // getAllStudents();
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className="flex justify-center m-auto">
      <div className="container px-4 py-5 mt-5 shadow project-body head-bg rounded-4">
        <div>
          <div className="flex items-center justify-end">
            {/*add btn */}
            <button
              className="px-4 py-2 border border-gray-600 rounded-2xl"
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              <i className="fa-solid fa-plus"></i> Add Student
            </button>
          </div>
          <section className="my-4">
            <h1 className="mb-3 text-xl text-bold">Students List</h1>
            <ul className={`${style.responsiveTableProjects}`}>
              {students.length > 0 ? (
                students.map((student: StudentsInterface) => (
                  <li
                    key={student._id}
                    className={`${style.tableRow} flex flex-col sm:flex-row items-center justify-between`}
                  >
                    <div
                      className={`${style.col} flex flex-col gap-2`}
                      data-label="Name :"
                    >
                      <span> {student?.first_name} {student?.last_name} </span>
                    </div>
                    <div
                      className={`${style.col} p-0 flex items-between justify-start sm:justify-end`}
                      data-label="Actions :"
                    >
                      <ul className="flex items-center justify-center gap-3 p-0 m-0">
                        {/* Delete button */}
                        <button
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectedStudent(student);
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fa-regular fa-trash-can"></i>
                            <span className="hidden sm:inline">Delete</span>
                          </div>
                        </button>
                        {/* Edit button */}
                        <button
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setOpenEditModal(true);
                            const filteredStudents = allStudents.filter(
                              (student) =>
                                student.includes(student.value)
                            );
                            setSelectedStudents(filteredStudents);
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fa-regular fa-pen-to-square "></i>
                            <span className="hidden sm:inline">Edit</span>
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
        open={openAddModal || openDeleteModal || openEditModal}
        onClose={() => {
          setOpenAddModal(false);
          setOpenEditModal(false);
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
                : openEditModal
                  ? "Edit Student"
                  : "Add Student"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              {openDeleteModal ? (
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete this student?
                </p>
              ) : (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      {...register("groupName")}
                      // defaultValue={selectedStudent.first_name || ""}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Student Name"
                    />
                  </div>
                    <div className="mb-4">
                      <input
                        type="tel"
                        {...register("groupName")}
                        // defaultValue={selectedStudent.first_name || ""}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Phone"
                      />
                    </div>
                  
                </>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 mr-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handleDelete(studentId)}
                >
                  {openDeleteModal ? "Delete" : openEditModal ? "Edit" : "Add"}
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
