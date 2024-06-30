import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getAllTaskList, deleteTask } from "../../apiService/taskServices";
import authActions from "../../Redux/auth/actions";
import navigationAction from "../../Redux/navigation/actions";
import TaskForm from "./TaskForm";
import { Edit3, Trash2 } from "react-feather";
import { Modal, Button } from "react-bootstrap";
import formikEnhancer from "./enhancer/taskEnhancer";
import moment from "moment";
import Header from "../Header/Header";

const { logout } = authActions;
const { success, error } = navigationAction;

const ReadMore = ({ children }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  if (children.length <= 200) {
    return <p className="text">{children}</p>;
  }

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? children.slice(0, 200) : children}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "blue", cursor: "pointer" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Task = (props) => {
  const {
    token,
    values,
    setValues,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    logout,
    setFieldValue,
    isValid,
    resetForm,
  } = props;

  const [taskList, setTaskList] = useState([]);
  const [taskDeleteId, setTaskDeleteId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const getTasks = async () => {
    await getAllTaskList(token)
      .then((res) => {
        if (res.success) {
          setTaskList(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTask = (task) => {
    setValues(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(token, id)
      .then((res) => {
        if (res.success) {
          success(res.message);
          getTasks();
        } else {
          error(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
  };

  return (
    <div className="main-bg">
      <Header token={token} logout={logout} />
      <div className="task-list">
        <div className="my-4 row align-items-center justify-content-between w-50">
          <div className="col-auto mb-2 me-auto">
            Total: {taskList?.length > 0 ? taskList?.length : 0}
          </div>
          <div className="col-auto ">
            <Button
              variant="primary"
              onClick={handleShowModal}
              style={{
                width: "fit-content",
              }}
            >
              Add Todo
            </Button>
          </div>
        </div>
        {taskList && taskList.length > 0 ? (
          taskList.map((task) => (
            <div
              key={task._id}
              style={{
                // color: "whitesmoke",
                backgroundColor:
                  task.status === "Pending"
                    ? "yellowgreen"
                    : task.status === "In Process"
                    ? "skyblue"
                    : task.status === "Review"
                    ? "orange"
                    : task.status === "Overdue"
                    ? "orangered"
                    : task.status === "Completed"
                    ? "greenyellow"
                    : "gray",
              }}
              className="task-card"
            >
              <div className="row">
                <h3>{task.title}</h3>
                <div className="col-10">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-12 col-sm-6">
                      Due date: {moment(task.dueDate).format("DD MMM YYYY")}
                    </div>
                    <div className="col-12 col-sm-6">Status: {task.status}</div>
                  </div>
                  <ReadMore>{task.description}</ReadMore>
                </div>
                <div className="col-2">
                  <span
                    className="cursor-pointer edit edit-delete-icon me-2"
                    onClick={() => editTask(task)}
                  >
                    <Edit3 />
                  </span>
                  <span
                    className="cursor-pointer delete edit-delete-icon"
                    onClick={() => {
                      handleShow();
                      setTaskDeleteId(task._id);
                    }}
                  >
                    <Trash2 />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="task-card">
            <div className="row">
              <h3>No Todo List</h3>
            </div>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {values?._id ? "Update" : "Create"} Todo List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            getTasks={getTasks}
            token={token}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            submitCount={submitCount}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            isValid={isValid}
            onClose={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
      <Modal centered show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Modal.Title>Delete Todo</Modal.Title>
          <p>Are you sure you want to Delete?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            style={{ width: "130px" }}
            variant="secondary"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            style={{ width: "130px" }}
            variant="primary"
            onClick={() => {
              handleClose();
              handleDeleteTask(taskDeleteId);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.accessToken,
});

export default compose(
  formikEnhancer,
  connect(mapStateToProps, { logout })
)(Task);
