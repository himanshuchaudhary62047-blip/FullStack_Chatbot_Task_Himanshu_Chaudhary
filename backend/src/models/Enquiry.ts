import mongoose, { Schema, Document } from 'mongoose';

export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
  service_or_course: string;
  message: string;
  status: EnquiryStatus;
  created_at: Date;
  updated_at: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    user_type: {
      type: String,
      required: true,
      enum: ['Student', 'Customer', 'Other'],
    },
    service_or_course: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacted', 'In Progress', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Map _id to virtual id property for clean JSON responses
EnquirySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    if (ret._id) {
      ret.id = (ret._id as any).toString();
    }
    delete ret._id;
  },
});

export const EnquiryModel = mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export default EnquiryModel;
