'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from "@/lib/api";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(token){
            api.get(`/auth/verify-email?token=${token}`)
                .then(() => {
                    setMessage('E-mail verificado com sucesso! Você será redirecionado para o login...');
                    setTimeout(() => router.push('/login'), 3000);
                })
                .catch(() => {
                    setMessage('Token inválido ou expirado.');
                });
        }else {
            setMessage('Token de verificação não encontrado na URL.');
        }
    }, [token, router]);

    return (
        <main className="flex justify-center items-center h-screen">
        <div className="bg-white text-black p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Verificação de E-mail</h2>
            <p>{message}</p>
        </div>
        </main>
    );

}