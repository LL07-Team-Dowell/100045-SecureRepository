import React from "react";
import "./form.css";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./form.css";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  repoURL: yup
    .string()
    .matches(/^https:\/\/\w/i, "Enter correct repo url")
    .required("Please Paste Your Repository URL"),

  repoName: yup
    .string()
    .matches(/^\d{6,}-\w/i, "must start with digits")
    .test({
      name: "match-substring",
      message: "Repository Name should match with Repo Name in the URL",
      test: function (value) {
        const repoURL = this.parent.repoURL;
        if (!repoURL) {
          return false;
        }
        const match = repoURL.match(/\/([^/]+)\.git$/);
        if (!match) {
          return false;
        }
        const repoNameFromURL = match[1];
        return repoNameFromURL.includes(value);
      },
    })
    .required("Please Enter Your Repository Name"),
});

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      repoName: "",
      repoURL: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="form-container">
      <div className="cross-btn">
        {" "}
        <Link to="/">
          <i className="fa-solid fa-xmark"></i>{" "}
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="password"
          name="repoURL"
          label="Repository URL"
          type="text"
          value={formik.values.repoURL}
          onChange={formik.handleChange}
          error={formik.touched.repoURL && Boolean(formik.errors.repoURL)}
          helperText={formik.touched.repoURL && formik.errors.repoURL}
        />
        <TextField
          fullWidth
          id="email"
          name="repoName"
          label="Repository Name"
          type="text"
          value={formik.values.repoName}
          onChange={formik.handleChange}
          error={formik.touched.repoName && Boolean(formik.errors.repoName)}
          helperText={formik.touched.repoName && formik.errors.repoName}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
