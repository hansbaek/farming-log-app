import dbConnect from '../lib/mongodb';
import Log from '../models/Log';
import { Log as ILog } from '../types/Log';

export const getLogs = async (): Promise<ILog[]> => {
  await dbConnect();
  const logs = await Log.find({});
  return logs.map(log => ({ ...log.toObject(), id: log._id.toString() }));
};

export const getLogById = async (id: string): Promise<ILog | undefined> => {
  await dbConnect();
  const log = await Log.findById(id);
  return log ? { ...log.toObject(), id: log._id.toString() } : undefined;
};

export const createLog = async (newLog: Omit<ILog, 'id'>): Promise<ILog> => {
  await dbConnect();
  const createdLog = await Log.create(newLog);
  return { ...createdLog.toObject(), id: createdLog._id.toString() };
};

export const updateLog = async (updatedLog: ILog): Promise<ILog | undefined> => {
  await dbConnect();
  const log = await Log.findByIdAndUpdate(updatedLog.id, updatedLog, { new: true });
  return log ? { ...log.toObject(), id: log._id.toString() } : undefined;
};

export const deleteLog = async (id: string): Promise<boolean> => {
  await dbConnect();
  const result = await Log.deleteOne({ _id: id });
  return result.deletedCount === 1;
};