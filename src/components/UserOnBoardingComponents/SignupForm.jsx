import React, { useState } from "react";
import PrimaryButton from "../ResuableComponents/PrimaryButton";
import InputField from "../ResuableComponents/InputField";

const SignupForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Signup Success", formData);
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
            <h1 className="text-4xl font-bold text-black sm:text-5xl">
              Sign up
            </h1>

            <p className="mt-3 text-lg">
              or{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="font-semibold text-orange-500 hover:underline cursor-pointer"
              >
                login to your account
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
        <div className="space-y-5">
          <InputField
            label=""
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            type="tel"
          />

          <InputField
            label=""
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            label=""
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            type="email"
          />

          <button
            type="button"
            className="text-lg font-semibold text-blue-500 hover:underline"
          >
            Have a referral code?
          </button>

          <PrimaryButton type="submit">Continue</PrimaryButton>

          <p className="text-sm font-medium leading-6 text-gray-800">
            By creating an account, I accept the{" "}
            <span className="font-bold">Terms & Conditions</span> &{" "}
            <span className="font-bold">Privacy Policy</span>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignupForm;
