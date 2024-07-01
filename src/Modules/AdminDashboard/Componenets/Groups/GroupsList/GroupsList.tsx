import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import { getBaseUrl } from "../../../../../Utils/Utils";
import style from "../Groups.module.css";

const GroupsList = () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNTVlNmM4NWYxZWNkYmMyNmY1YzIiLCJlbWFpbCI6Im9tYXJiYXplZWRAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MTk2NzE4NzUsImV4cCI6MTcyMzI3MTg3NX0.HQjkFkOkJDB1pr01-_4YgK5DcKs--7k8jSvXP4IP8rE";
  const animatedComponents = makeAnimated();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [studentsIDS, setStudentsIDS] = useState([]);
  const [groups, setGroups] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const getAllStudents = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://upskilling-egypt.com:3005/api/student`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStudentsIDS(
        res.data.map((student) => ({
          value: student._id,
          label: student.first_name,
        }))
      );
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  }, [token]);

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
    getAllStudents();
    getAllGroups();
  }, [getAllStudents, getAllGroups]);

  const onSubmit = async (formData) => {
    if (openDeleteModal) {
      await handleDelete();
    } else if (openEditModal) {
      await handleEdit(formData);
    } else if (openAddModal) {
      await handleAdd(formData);
    }
  };

  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    reset(); // Reset form fields on modal close
  };

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
      handleClose();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleAdd = async (formData) => {
    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3005/api/group`,
        {
          name: formData.groupName,
          students: selectedStudents.map((student) => student.value),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      getAllGroups();
      handleClose();
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error adding group:", error);
    }
  };

  const handleEdit = async (formData) => {
    // Implement edit functionality if needed
    console.log("Edit functionality not implemented");
    handleClose();
  };

  return (
    <div>
      <div className="project-body head-bg mt-5 container rounded-4 shadow px-4 py-5">
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
                      className={`${style.col} p-0 flex items-between justify-center sm:justify-end`}
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

        <DialogPanel className="relative w-full max-w-md sm:max-w-lg m-auto mt-20 rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="p-4 sm:p-6">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {openDeleteModal
                ? "Delete Group"
                : openEditModal
                ? "Edit Group"
                : "Add Group"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              {openDeleteModal ? (
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete this group?
                </p>
              ) : (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      {...register("groupName")}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Group Name"
                    />
                  </div>
                  <div className="mb-4">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={studentsIDS}
                      value={selectedStudents}
                      onChange={(selectedOptions) =>
                        setSelectedStudents(selectedOptions)
                      }
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </div>
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
    </div>
  );
};

export default GroupsList;
