'use client';

import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { SignUpFormProps } from '@/lib/definitions';

export default function SignUpForm({ panelActive, register, handleSubmit, onSubmit }: SignUpFormProps) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 opacity-0 z-[1] transition-all duration-500 ${
        panelActive ? 'translate-x-full opacity-100 z-[5]' : ''
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center"
      >
        <h1 className="font-bold text-black text-2xl">Criar Conta</h1>
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
        <span className="text-sm text-black mb-2">ou use seu e-mail para registrar</span>
        <input {...register('name')} type="text" placeholder="Name" className="bg-gray-200 text-black p-3 my-2 w-full" />
        <input {...register('email')} type="email" placeholder="Email" className="bg-gray-200 text-black p-3 my-2 w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="bg-gray-200 text-black p-3 my-2 w-full" />
        <button type="submit"
          className="bg-[#FF4B2B] text-white font-bold text-xs py-3 px-12 rounded-full uppercase mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}