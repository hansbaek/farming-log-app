import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  id: string;
  date: string;
  title: string;
  content: string;
  weather: string;
  temperature: string;
  crop: string;
  tasks: string[];
}

const LogSchema: Schema = new Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  weather: { type: String, required: true },
  temperature: { type: String, required: true },
  crop: { type: String, required: true },
  tasks: [{ type: String, required: true }],
});

const Log = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export default Log;
