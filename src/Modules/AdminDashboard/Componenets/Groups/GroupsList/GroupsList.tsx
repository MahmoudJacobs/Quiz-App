import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import {
  GroupFormData,
  GroupInterface,
  StudentsInterface,
} from "../../../../../InterFaces/InterFaces";
import NoData from "../../../../SharedModules/Components/NoData/NoData";
import style from "../Groups.module.css";
import { getBaseUrl } from "../../../../../Utils/Utils";
import { useSelector } from "react-redux";

const GroupsList = () => {
  const { token } = useSelector(
    (state: { user: { token: string } }) => state.user
  );
  console.log(token);
  const animatedComponents = makeAnimated();
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
    },
  ]);
  const [groups, setGroups] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState<{
    name: string;
    _id: string;
  }>({
    name: "",
    _id: "",
  });

  // get all students array
  const getAllStudents = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllStudents(
        res.data.map((student: StudentsInterface) => ({
          value: student._id,
          label: student.first_name,
        }))
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail signin");
      }
    }
  }, [token]);

  // get all groups to display
  const getAllGroups = useCallback(async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(res.data);
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  }, [token]);

  // vaiable submmition for add , delete and edit
  const onSubmit = async (formData: GroupFormData) => {
    if (openDeleteModal) {
      await handleDelete();
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
    setSelectedGroup({ _id: "", name: "" });
  };

  // delete the selected group
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${getBaseUrl()}/api/group/${selectedGroup._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllGroups();
      handleClose();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  // add a new group
  const handleAdd = async (formData: GroupFormData) => {
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/group`,
        {
          name: formData.groupName,
          students: selectedStudents.map(
            (student: { value: string }) => student.value
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllGroups();
      handleClose();
      setSelectedGroup({ _id: "", name: "" });
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // edit the selected group
  const handleEdit = async (formData: GroupFormData) => {
    console.log(selectedGroup);
    try {
      const res = await axios.put(
        `${getBaseUrl()}/api/group/${selectedGroup._id}`,
        {
          name: formData.groupName,
          students: selectedStudents.map(
            (student: { value: string }) => student.value
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllGroups();
      handleClose();
      setSelectedGroup({ _id: "", name: "" });
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    token && getAllStudents();
    token && getAllGroups();
  }, [getAllStudents, getAllGroups, token]);

  // re-ender the app when the selected group changes to avoid the delay of changing the name of group
  useEffect(() => {
    reset();
    setSelectedStudents(
      allStudents.filter((student) =>
        selectedGroup.students?.includes(student.value)
      )
    );
  }, [selectedGroup, reset, allStudents]);

  return (
    <div className="m-auto flex justify-center">
      <div className="project-body head-bg mt-5 container rounded-4 shadow px-4 py-5">
        <div>
          <div className="flex items-center justify-end">
            {/*add btn */}
            <button
              className="border border-gray-600 rounded-2xl px-4 py-2"
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              <i className="fa-solid fa-plus"></i> Add To Group
            </button>
          </div>
          <section className="my-4">
            <h1 className="mb-3 text-bold text-xl">Groups List</h1>
            <ul className={`${style.responsiveTableProjects}`}>
              {groups.length > 0 ? (
                groups.map((group: GroupInterface) => (
                  <li
                    key={group._id}
                    className={`${style.tableRow} flex flex-col sm:flex-row items-center justify-between`}
                  >
                    <div
                      className={`${style.col} flex flex-col gap-2`}
                      data-label="Name :"
                    >
                      <span> {group?.name} </span>
                      <span className="text-gray-500 text-[15px] flex items-center justify-start gap-2">
                        <span>no of students :</span>
                        {group?.students.map((studentId: string, index) => {
                          const student: { label: string } = allStudents.find(
                            (s) => s.value === studentId
                          );

                          return (
                            <span
                              key={index}
                              className={`${style.studentCircle}`}
                              title={student?.label}
                            >
                              {student?.label.charAt(0)}
                            </span>
                          );
                        })}
                      </span>
                    </div>
                    <div
                      className={`${style.col} p-0 flex items-between justify-start sm:justify-end`}
                      data-label="Actions :"
                    >
                      <ul className="flex items-center justify-center m-0 p-0 gap-3">
                        {/* Delete button */}
                        <button
                          role="button"
                          className="mb-0"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectedGroup(group);
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
                                group.students.includes(student.value)
                            );
                            setSelectedStudents(filteredStudents);
                            setSelectedGroup(group);
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
                      defaultValue={selectedGroup.name || ""}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Group Name"
                    />
                  </div>
                  <div className="mb-4">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={allStudents}
                      value={selectedStudents}
                      onChange={(e) => setSelectedStudents(e)}
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
