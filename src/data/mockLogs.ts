import { Log } from '../types/Log';

export const mockLogs: Log[] = [
  {
    id: '1',
    date: '2024-07-15',
    title: '고추밭 물주기 및 병해충 확인',
    content: '오전 9시경 고추밭에 물을 주었다. 잎 뒷면을 확인해보니 진딧물 흔적은 없었으나, 일부 잎에 흰가루병 초기 증상이 보였다. 친환경 살균제를 살포할 예정이다.',
    weather: '맑음',
    temperature: '28°C',
    crop: '고추',
    tasks: ['물주기', '병해충 확인', '살균제 살포 예정'],
  },
  {
    id: '2',
    date: '2024-07-14',
    title: '상추 수확 및 씨앗 파종',
    content: '오전에 자란 상추를 수확하고, 새로운 상추 씨앗을 파종했다. 흙을 고르게 덮고 물을 충분히 주었다.',
    weather: '흐림',
    temperature: '25°C',
    crop: '상추',
    tasks: ['수확', '씨앗 파종', '물주기'],
  },
  {
    id: '3',
    date: '2024-07-13',
    title: '토마토 지지대 설치 및 곁순 제거',
    content: '토마토가 많이 자라 지지대가 필요하여 설치해주었다. 곁순을 제거하여 영양분이 열매에 집중되도록 했다.',
    weather: '비',
    temperature: '22°C',
    crop: '토마토',
    tasks: ['지지대 설치', '곁순 제거'],
  },
];
