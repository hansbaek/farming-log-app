'use client';

import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  logId: string;
}

export default function DeleteButton({ logId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    console.log('Delete button clicked for logId:', logId); // 디버깅용 로그
    if (confirm('정말로 이 영농일지를 삭제하시겠습니까?')) {
      console.log('Confirmation accepted.'); // 디버깅용 로그
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${logId}`, {
          method: 'DELETE',
        });

        console.log('API response status:', res.status); // 디버깅용 로그

        if (res.ok) {
          console.log('Log deleted successfully.'); // 디버깅용 로그
          router.push('/logs');
        } else {
          const errorData = await res.json(); // 에러 응답 본문 확인
          console.error('Failed to delete log:', errorData); // 디버깅용 로그
          alert('일지 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting log:', error); // 디버깅용 로그
        alert('일지 삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.log('Confirmation cancelled.'); // 디버깅용 로그
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
    >
      삭제
    </button>
  );
}