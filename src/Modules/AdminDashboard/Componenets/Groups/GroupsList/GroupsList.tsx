import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../../Utils/Utils";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import style from "../Groups.module.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const GroupsList = () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
  const animatedComponents = makeAnimated();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [studentsIDS, setStudentsIDS] = useState<any[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);

  const [groups, setGroups] = useState<
    {
      _id: string;
      name: string;
      students: any[];
    }[]
  >([
    {
      _id: "",
      name: "",
      students: [],
    },
  ]);

  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  const getAllStudents = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/student`, {
        headers: {
          Authorization: token,
        },
      });

      setStudentsIDS(
        res.data.map((student: { _id: string; first_name: string }) => ({
          value: student._id,
          label: student.first_name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3005/api/group/${groupId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      getAllGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3005/api/group`,
        {
          name: "New Group",
          students: selectedStudents,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      getAllGroups();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getAllGroups = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/group`, {
        headers: {
          Authorization: token,
        },
      });
      setGroups(res.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to fetch groups");
    }
  }, [token]);

  useEffect(() => {
    getAllGroups();
    getAllStudents();
  }, [getAllGroups, getAllStudents]);

  return (
    <div>
      <div
        className={`project-body head-bg mt-5 container rounded-4 shadow px-4 py-5`}
      >
        <div>
          <div className="flex items-center justify-end">
            <button
              className="border border-gray-600 rounded-2xl px-4 py-2"
              onClick={() => {
                setOpenAddModal(true);
                setOpenDeleteModal(false);
                setOpenEditModal(false);
              }}
            >
              <i className="fa-solid fa-plus"></i> Add To Group
            </button>
          </div>
          <section className="my-4">
            <h1>Groups List</h1>
            <ul className={`${style.responsiveTableProjects}`}>
              {groups.length > 0 ? (
                groups.map((group) => (
                  <li
                    key={group._id}
                    className={`${style.tableRow} flex flex-col sm:flex-row items-center justify-between`}
                  >
                    <div
                      className={`${style.col} flex flex-col`}
                      data-label="Name :"
                    >
                      <span> {group.name} </span>
                      <span className="text-gray-500 text-[15px]">
                        no of students : {group.students.length}
                      </span>
                    </div>
                    <div
                      className={`${style.col} flex items-center justify-center sm:justify-end`}
                      data-label="Actions :"
                    >
                      <ul className="flex items-center justify-center m-0 p-0">
                        <li
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setGroupId(group._id);
                            setOpenAddModal(false);
                            setOpenEditModal(false);
                            setOpenDeleteModal(true);
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fa-regular fa-trash-can"></i>
                            <span className="hidden sm:inline">Delete</span>
                          </div>
                        </li>
                        <li role="button" className="mb-0" onClick={() => {}}>
                          <div className="flex items-center justify-center">
                            <i className="mx-2 fa-regular fa-pen-to-square "></i>
                            <span className="hidden sm:inline">Edit</span>
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
          </section>
        </div>
        {/* Pagination */}
        {/* <div className="mt-5">
          <ResponsivePagination
            current={1}
            total={10}
            onPageChange={(page) => {
              setPageNumber(page);
            }}
          />
        </div> */}
      </div>
      {/*Modal */}
      <Dialog
        className="relative z-10"
        open={openAddModal || openDeleteModal || openEditModal}
        onClose={() => {
          setOpenAddModal(false);
          setOpenEditModal(false);
          setOpenDeleteModal(false);
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 overflow-y-auto w-full">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
            <DialogPanel
              transition
              className="relative w-[90%] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 min-h-[50vh]"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {openDeleteModal
                        ? "Delete Group"
                        : openEditModal
                        ? "Edit Group"
                        : "Add Group"}
                    </DialogTitle>
                    <div className="mt-2 w-full">
                      <p className="text-sm text-gray-500 w-full">
                        {openDeleteModal ? (
                          "Are you sure you want to delete this group?"
                        ) : openEditModal || openAddModal ? (
                          <form className="flex-col w-full h-100 flex items-start justify-between">
                            <input
                              type="text"
                              className="w-full p-2 bg-slate-200 my-2"
                            />
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              options={studentsIDS}
                              onChange={(e) => {
                                setSelectedStudents(e.map((ele) => ele.value));
                              }}
                              className="my-2 pt-2 w-full"
                            />
                          </form>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    openDeleteModal && handleDelete();
                    openEditModal && handleEdit();
                    openAddModal && handleAdd();
                  }}
                >
                  {openDeleteModal ? "Delete" : openEditModal ? "Edit" : "Add"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => handleClose()}
                  autoFocus
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default GroupsList;
