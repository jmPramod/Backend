import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { timeStamp } from 'console';

const emailRejexPattern: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface IUser extends Document {
  email: string;

  name: string;

  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, require: [true, 'Please enter your name!!'] },

    email: {
      type: String,
      require: [true, 'Please enter  Email'],
      validator: {
        validator: function (value: string) {
          return emailRejexPattern.test(value);
        },
        message: 'Please enter valid Email!!',
      },
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please enter your password'],
      minlength: [6, 'password must be at least of 6 charecter '],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: { type: String, default: 'user' },
    isVerified: { type: Boolean, default: false },
    courses: [{ courseId: String }],
  },
  { timestamps: true }
);

//Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model('User', userSchema);
export default userModel;
