import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    identifier: Yup.string().trim().required("Please enter email or username"),
    password: Yup.string()
      .min(8)
      .max(16)
      .trim()
      .required("Please enter password"),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    identifier: "",
    password: "",
  }),
  handleSubmit: () => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
