// Main Container

// Section 1: React/Redux low level imports
import React from "react";
// import { connect, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
// Section 2: internal imports
import SignIn from "components/SignIn/SignIn";

// Section 3: Selectors
// import {

// } from "redux/selectors/data/xxx";

// Section 4: Container
const SignInContainer = ({}) => {
    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Required"),
            password: Yup.string()
                .min(6, "Password should be longer than 6 characters")
                .required(),
        }),
        onSubmit: ({ email, password }) => {
            alert(`Login: ${email}, password: ${password}`);
        },
    });

    return (
        <SignIn
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
        />
    );
};

// Section 5: Export
export default SignInContainer;
