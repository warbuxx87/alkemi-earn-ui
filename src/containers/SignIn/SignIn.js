// Main Container

// Section 1: React/Redux low level imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
// Section 2: internal imports
import SignIn from "components/SignIn/SignIn";

import { signIn } from "redux/actions/status/auth";

// Section 3: Selectors
// import {

// } from "redux/selectors/data/xxx";

import { walletNetworkName } from "redux/selectors/data/onboard";

// Section 4: Container
const SignInContainer = () => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            Yup.object({
                email: Yup.string().email().required("Required"),
                password: Yup.string()
                    .min(6, "Password should be longer than 6 characters")
                    .required(),
            })
        ),
    });

    const onSubmit = (data) => {
        dispatch(signIn({ ...data, strategy: "local", currentNetworkName }));
    };

    return (
        <SignIn
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
        />
    );
};

// Section 5: Export
export default SignInContainer;
