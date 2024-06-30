import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().trim().required("Please enter title"),
    description: Yup.string().trim().required("Please enter description"),
    dueDate: Yup.date().required("Please enter due date"),
    status: Yup.string().trim(),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    title: "",
    description: "",
    dueDate: null,
    status: "Pending",
  }),
  handleSubmit: () => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
