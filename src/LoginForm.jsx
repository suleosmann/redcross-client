// LoginForm.js
// LoginForm.js
import React, { useEffect } from 'react'; // Import useEffect
import { FormProvider, useFormContext } from './FormContext';

const LoginFormFields = () => {
  const { formData, handleChange } = useFormContext();
  
  // Use useEffect to log formData whenever it changes
  useEffect(() => {
    console.log(formData);
  }, [formData]); // Dependency array ensures this runs only when formData changes

  return (
    <div className="space-y-4">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Log In
      </button>
    </div>
  );
};

// The rest of your LoginForm and FormProvider components remain unchanged

const LoginForm = () => {
  return (
    <FormProvider>
      <form className="max-w-md mx-auto my-10">
        <LoginFormFields />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
