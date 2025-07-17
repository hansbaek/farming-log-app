import { NextResponse } from 'next/server';
import { getLogs, createLog } from '@/services/logService';

export async function GET() {
  try {
    const logs = await getLogs();
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ message: 'Error fetching logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newLogData = await request.json();
    const createdLog = await createLog(newLogData);
    return NextResponse.json(createdLog, { status: 201 });
  } catch (error) {
    console.error('Error creating log:', error);
    return NextResponse.json({ message: 'Error creating log' }, { status: 500 });
  }
}
