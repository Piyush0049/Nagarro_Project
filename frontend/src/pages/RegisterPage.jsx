import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div
      className="h-full bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg?semt=ais_hybrid&w=740')" }}
    >
      <div className="absolute h-full inset-0 bg-black opacity-50"></div>
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Or{' '}
          <a href="/login" className="font-medium text-green-400 hover:text-green-300">
            sign in to your existing account
          </a>
        </p>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
