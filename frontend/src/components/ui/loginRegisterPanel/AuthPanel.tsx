'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from "@/lib/api";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Overlay from './Overlay';
import { DataLogin, DataRegister } from '@/lib/definitions';

export default function AuthPanel() {
  const [panelActive, setPanelActive] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onLoginSubmit = async (data: DataLogin) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.acess_token);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Erro ao fazer login');
    }
  };

  const onRegisterSubmit = async (data: DataRegister) => {
    try {
      await api.post('/auth/register', data);
      alert('Cadastro realizado com sucesso! Um e-mail de verificação foi enviado para seu e-mail.');
      setPanelActive(false); // volta pro login
    } catch (err) {
      console.log(err);
      alert('Erro ao registrar');
    }
  };

  return (
    <div
      className={`relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden transition-all duration-500 ${
        panelActive ? 'right-panel-active' : ''
      }`}
    >
      <SignUpForm
        panelActive={panelActive}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onRegisterSubmit}
      />
      <SignInForm
        panelActive={panelActive}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onLoginSubmit}
      />
      <Overlay panelActive={panelActive} onClick={setPanelActive} />
    </div>
  );
}