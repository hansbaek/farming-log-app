import { NextResponse } from 'next/server';
import { getLogById, updateLog, deleteLog } from '@/services/logService';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const log = await getLogById(id);
    if (log) {
      return NextResponse.json(log);
    } else {
      return NextResponse.json({ message: 'Log not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching log by ID:', error);
    return NextResponse.json({ message: 'Error fetching log' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updatedLogData = await request.json();
    const log = await updateLog({ ...updatedLogData, id });
    if (log) {
      return NextResponse.json(log);
    } else {
      return NextResponse.json({ message: 'Log not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating log:', error);
    return NextResponse.json({ message: 'Error updating log' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteLog(id);
    if (success) {
      return NextResponse.json({ message: 'Log deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Log not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting log:', error);
    return NextResponse.json({ message: 'Error deleting log' }, { status: 500 });
  }
}
