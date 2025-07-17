'use client';

import LogForm from '../../components/LogForm';
import { Log } from '../../../types/Log';
import { useRouter } from 'next/navigation';

export default function NewLogPage() {
  const router = useRouter();

  const handleSubmit = async (data: Omit<Log, 'id'>) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/logs');
      } else {
        console.error('Failed to create log');
        alert('일지 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating log:', error);
      alert('일지 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[color:var(--primary)] mb-8 tracking-tight">새 영농일지 작성</h1>
      <LogForm onSubmit={handleSubmit} />
    </div>
  );
}