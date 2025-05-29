import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div
      className="h-full bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg?semt=ais_hybrid&w=740')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Or{' '}
          <a href="/register" className="font-medium text-yellow-400 hover:text-yellow-300">
            create a new account
          </a>
        </p>
      </div>

      {/* Form container */}
      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
