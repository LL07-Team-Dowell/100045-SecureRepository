import React, { useState } from "react";
import "./form.css";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import useGetResponse from "../Custom Hooks/useGetResponse";
import { RotatingLines } from "react-loader-spinner";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [repoUrl, setRepoUrl] = useState(null);
  const [repoName, setRepoName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getResponse, status, webHookLink] = useGetResponse();
  const [buttonText, setButtonText] = useState("Copy WebHookLink");

  const formik = useFormik({
    initialValues: {
      repoName: "",
      repoURL: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setRepoUrl(values.repoURL);
      setRepoName(values.repoName);
      setLoading(true);
      getResponse(values.repoName, values.repoURL);
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webHookLink);
  };

  const loaderPopup = (
    <Popup open={loading}>
      <div className="popup-loader">
        {!status && !webHookLink ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        ) : (
          <>
            <div className="response" >
              <div className="status" style={{ textAlign: "left" }}>
                <span>{"Status : " + status}</span>
              </div>
              <div className="web-hook-link" style={{ textAlign: "left" }}>
                <span>{"Web Hook Link : " + webHookLink}</span>
              
              </div>
              <button className="copy-btn" onClick={()=>{
                copyToClipboard();
                setButtonText("Copied");
                setTimeout(() => {
                  setButtonText("Copy WebHookLink");
                }, 3000)
              }}>{buttonText}</button>
            </div>
          </>
        )}
      </div>
    </Popup>
  );

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
      {formik.isSubmitting ? loaderPopup : <></>}
    </div>
  );
};

export default RegisterForm;
