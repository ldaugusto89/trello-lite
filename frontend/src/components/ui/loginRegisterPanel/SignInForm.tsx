'use client';

import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { SignInFormProps } from '@/lib/definitions';

export default function SignInForm({ panelActive, register, handleSubmit, onSubmit }: SignInFormProps) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 left-0 z-[2] transition-all duration-500 ${
        panelActive ? 'translate-x-full' : ''
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center"
      >
        <h1 className="font-bold text-black text-2xl">Sign in</h1>
        <div className="my-5 flex space-x-2">
          <a className="border border-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center">
            <FaFacebookF />
          </a>
          <a className="border border-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center">
            <FaGooglePlusG />
          </a>
          <a className="border border-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center">
            <FaLinkedinIn />
          </a>
        </div>
        <span className="text-sm text-black mb-2">ou use sua conta</span>
        <input {...register('email')} type="email" placeholder="Email" className="bg-gray-200 text-black p-3 my-2 w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="bg-gray-200 text-black p-3 my-2 w-full" />
        <a href="#" className="text-sm text-gray-700 mt-2">
          Esqueci minha senha
        </a>
        <button
          type="submit"
          className="bg-[#FF4B2B] text-white font-bold text-xs py-3 px-12 rounded-full uppercase mt-4"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}