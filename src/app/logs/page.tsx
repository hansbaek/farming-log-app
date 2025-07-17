import Link from 'next/link';

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

export default async function LogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs`, { cache: 'no-store' });
  const logs: Log[] = await res.json();

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-[color:var(--primary)] mb-10 tracking-tight">
        영농일지 목록
      </h1>
      <div className="mb-8">
        <Link href="/logs/new" className="inline-block bg-[color:var(--primary)] hover:bg-[color:var(--primary-dark)] text-white font-bold py-3 px-7 rounded-xl shadow-lg transition">
          + 새 일지 작성
        </Link>
      </div>
      {
        logs.length === 0 ? (
          <p className="text-gray-500 text-lg">등록된 영농일지가 없습니다. 새로운 일지를 작성해보세요!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logs.map((log) => (
              <div key={log.id} className="bg-white/90 p-7 rounded-2xl shadow-2xl border border-[color:var(--border)] hover:shadow-[0_8px_32px_0_rgba(34,197,94,0.10)] transition-shadow duration-200 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-[color:var(--primary)] mb-2">
                  <Link href={`/logs/${log.id}`} className="hover:underline">
                    {log.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                  <span><span className="font-semibold">날짜:</span> {log.date}</span>
                  <span><span className="font-semibold">작물:</span> {log.crop}</span>
                </div>
                {log.tasks && log.tasks.length > 0 && (
                  <p className="text-gray-500 text-xs mb-2"><span className="font-semibold">수행작업:</span> {log.tasks.join(', ')}</p>
                )}
                <p className="text-gray-700 leading-relaxed line-clamp-3 flex-1">{log.content}</p>
                <Link href={`/logs/${log.id}`} className="mt-2 inline-block text-[color:var(--secondary)] hover:underline font-semibold text-sm">상세보기 →</Link>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}