'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import LogForm from '../../../components/LogForm';
import { Log } from '../../../../types/Log';

export default function EditLogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [log, setLog] = useState<Log | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            router.push('/logs'); // Log not found, redirect to logs list
            return;
          }
          throw new Error('Failed to fetch log');
        }
        const data: Log = await res.json();
        setLog(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching log for edit:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [id, router]);

  const handleSubmit = async (data: Log) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push(`/logs/${data.id}`);
      } else {
        console.error('Failed to update log');
        alert('일지 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error updating log:', err);
      alert('일지 수정 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  if (!log) {
    return <p>일지를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[color:var(--primary)] mb-8 tracking-tight">영농일지 수정</h1>
      <LogForm initialData={log} onSubmit={handleSubmit} isEdit={true} />
    </div>
  );
}