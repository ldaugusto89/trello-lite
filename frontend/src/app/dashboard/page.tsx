'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBoards, createBoard } from '@/lib/boardService';

export default function DashboardPage() {
    const { user, loading } = useAuth();
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (loading) return; // ainda carregando, não faz nada

    if (!user) {
      router.push('/login'); // redireciona apenas quando o loading terminou
    } else {
      loadBoards(); // só chama se tiver usuário logado
    }
  }, [loading, user]);

  const loadBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      alert('Erro ao buscar boards');
    }
  };

  const handleCreateBoard = async () => {
    if (!newTitle.trim()) return;
    try {
      const board = await createBoard(newTitle);
      setBoards([board, ...boards]);
      setNewTitle('');
    } catch {
      alert('Erro ao criar board');
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Olá, {user?.email}</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Novo Board"
        />
        <button
          onClick={handleCreateBoard}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Criar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {boards.map((board: any) => (
          <div
            key={board.id}
            onClick={() => router.push(`/dashboard/${board.id}`)}
            className="cursor-pointer bg-white p-4 rounded shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-lg font-semibold">{board.title}</h2>
            <p className="text-sm text-gray-500">Criado em {new Date(board.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}