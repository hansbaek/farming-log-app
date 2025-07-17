'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Log } from '../../types/Log';

interface LogFormProps {
  initialData?: Log;
  onSubmit: (data: Omit<Log, 'id'> | Log) => void | Promise<void>;
  isEdit?: boolean;
}

export default function LogForm({ initialData, onSubmit, isEdit = false }: LogFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [weather, setWeather] = useState(initialData?.weather || '');
  const [temperature, setTemperature] = useState(initialData?.temperature || '');
  const [crop, setCrop] = useState(initialData?.crop || '');
  const [tasks, setTasks] = useState<string[]>(initialData?.tasks || ['']);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date);
      setContent(initialData.content);
      setWeather(initialData.weather);
      setTemperature(initialData.temperature);
      setCrop(initialData.crop);
      setTasks(initialData.tasks.length > 0 ? initialData.tasks : ['']);
    }
  }, [initialData]);

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks.length > 0 ? newTasks : ['']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit: Omit<Log, 'id'> | Log = {
      title,
      date,
      content,
      weather,
      temperature,
      crop,
      tasks: tasks.filter(task => task.trim() !== ''),
    };

    if (isEdit && initialData) {
      (dataToSubmit as Log).id = initialData.id;
    }

    onSubmit(dataToSubmit);
    router.push('/logs');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-2xl shadow-2xl space-y-8 border border-[color:var(--border)] max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-[color:var(--primary)] mb-8 tracking-tight flex items-center gap-2">
        <span>{isEdit ? '영농일지 수정' : '새 영농일지 작성'}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">날짜</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="crop" className="block text-gray-700 text-sm font-semibold mb-2">작물</label>
          <input
            type="text"
            id="crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="weather" className="block text-gray-700 text-sm font-semibold mb-2">날씨</label>
            <input
              type="text"
              id="weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="temperature" className="block text-gray-700 text-sm font-semibold mb-2">온도</label>
            <input
              type="text"
              id="temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={7}
          className="w-full"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">수행 작업</label>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                className="flex-1"
              />
              {tasks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTask(index)}
                  className="bg-[color:var(--danger)] hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-sm transition"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddTask}
          className="mt-3 bg-[color:var(--secondary)] hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition shadow-sm"
        >
          작업 추가
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-dark)] text-white font-bold py-3 px-4 rounded-xl transition text-lg shadow-lg mt-4"
      >
        {isEdit ? '일지 수정' : '일지 작성'}
      </button>
    </form>
  );
}
