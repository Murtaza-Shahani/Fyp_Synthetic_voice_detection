"use client";

import { useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import SelectField from "../components/ui/SelectField";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const occupations = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "businessman", label: "Businessman" },
    { value: "researcher", label: "Researcher" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              placeholder="First Name"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <InputField
              label="Last Name"
              placeholder="Last Name"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <InputField
            label="Email"
            placeholder="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <SelectField
            label="Occupation"
            placeholder="Select your occupation"
            value={formData.occupation}
            options={occupations}
            onChange={(e) =>
              setFormData({
                ...formData,
                occupation: e.target.value.toLowerCase(),
              })
            }
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <InputField
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
