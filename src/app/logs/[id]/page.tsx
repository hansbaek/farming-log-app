import Link from 'next/link';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton'; // 클라이언트 컴포넌트로 분리

interface Log {
  id: string;
  date: string;
  title: string;
  content: string;
  weather: string;
  temperature: string;
  crop: string;
  tasks: string[];
}

export default async function LogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch log');
  }

  const log: Log = await res.json();

  return (
    <div className="bg-white/90 p-12 rounded-2xl shadow-2xl border border-[color:var(--border)] max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[color:var(--primary)] mb-8 tracking-tight">영농일지 상세</h1>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[color:var(--primary)] mb-3">제목: {log.title}</h2>
        <div className="flex flex-wrap gap-6 text-lg text-gray-500 mb-2">
          <span><span className="font-semibold">날짜:</span> {log.date}</span>
          <span><span className="font-semibold">작물:</span> {log.crop}</span>
          <span><span className="font-semibold">날씨:</span> {log.weather}</span>
          <span><span className="font-semibold">온도:</span> {log.temperature}</span>
        </div>
        <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap border-t border-b border-[color:var(--border)] py-6 mb-4">{log.content}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">수행 작업</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
          {log.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 mt-6">
        <Link href="/logs" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl shadow transition">목록으로 돌아가기</Link>
        <Link href={`/logs/${log.id}/edit`} className="bg-[color:var(--secondary)] hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow transition">수정</Link>
        <DeleteButton logId={log.id} />
      </div>
    </div>
  );
}