'use client'
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


export default function RegisterPage(){
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try{
            const res = await api.post('/auth/register', data);
            console.log(res)
            localStorage.setItem('token', res.data.acess_token);
            router.push('/login');
        }catch(err){
            alert('Erro ao registrar'+err);
        }
    }

    return (
        <main className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
            <h2 className="text-2xl font-bold text-black mb-6">Criar Conta</h2>
            <input className="w-full p-2 mb-4 rounded border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nome" {...register('name')} />
            <input className="w-full p-2 mb-4 rounded border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" {...register('email')} />
            <input className="w-full p-2 mb-4 rounded border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Senha" type="password" {...register('password')} />
            <button className="bg-blue-500 text-white w-full p-2 rounded">Registrar</button>
        </form>
        </main>
    );
}