import { createTask, editTask } from "../../apiService/taskServices";
import navigationAction from "../../Redux/navigation/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({
  getTasks,
  token,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  submitCount,
  handleSubmit,
  isValid,
  setFieldValue,
  onClose,
}) => {
  const { success, error } = navigationAction;
  const Error = ({ field }) => {
    const errorMessage = errors[field] &&
      (touched[field] || submitCount > 0) && (
        <span className="error-msg">{errors[field]}</span>
      );
    return errorMessage || null;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    handleSubmit();
    if (isValid) {
      values._id
        ? await editTask(token, values._id, values)
            .then((res) => {
              if (res.success) {
                success(res.message);
                onClose();
                getTasks();
              } else {
                error(res.message);
              }
            })
            .catch((error) => {
              console.error(error);
            })
        : await createTask(token, values)
            .then((res) => {
              if (res.success) {
                success(res.message);
                onClose();
                getTasks();
              } else {
                error(res.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitData}>
        <div className="user-box">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Error field="title" />
        </div>
        <div className="user-box">
          <textarea
            className="w-100"
            value={values.description}
            placeholder="Description"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Error field="description" />
        </div>

        <div className="user-box">
          <DatePicker
            selected={Date.parse(values.dueDate)}
            placeholderText="dd/mm/yyyy"
            className="w-100"
            calendarClassName="custom-calender-class"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            onChange={(date) => {
              setFieldValue("dueDate", date);
            }}
          />
          <Error field="dueDate" />
        </div>

        <div className="user-box">
          <select
            className="form-select"
            aria-label="Default select example"
            value={values.status}
            onBlur={handleBlur}
            name="status"
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Process">In Process</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <button type="submit"> {values._id ? "Update" : "Create"} Todo </button>
      </form>
    </div>
  );
};

export default TaskForm;
