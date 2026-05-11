import React, { useState } from "react";
import PrimaryButton from "../ResuableComponents/PrimaryButton";
import InputField from "../ResuableComponents/InputField";

const LoginForm = ({ onSwitch }) => {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Login Success", { phone });
    }
  };
  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-md bg-[#f7f7f7]"
        noValidate
      >
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold text-black sm:text-5xl">Login</h1>

            <p className="mt-3 text-lg">
              or{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="font-semibold text-orange-500 hover:underline cursor-pointer"
              >
                create an account
              </button>
            </p>

            <div className="mt-6 h-0.5 w-12 bg-black" />
          </div>

          {/* Image Placeholder */}
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
            {/* Replace with your local image */}
            <img
              src="../../../public/images/login.avif"
              alt="Food illustration"
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <InputField
            label=""
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            type="tel"
          />

          <PrimaryButton type="submit">Login</PrimaryButton>

          <p className="text-sm font-medium leading-6 text-gray-800">
            By clicking on Login, I accept the{" "}
            <span className="font-bold">Terms & Conditions</span> &{" "}
            <span className="font-bold">Privacy Policy</span>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
