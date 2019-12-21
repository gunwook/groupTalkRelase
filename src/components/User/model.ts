import * as bcrypt from 'bcrypt';
import * as connections from '../../config/db/connection';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    socketRoom : string;
    fcm_token: string;

    name : string;
    profile_img : string;
    comparePassword: (password: string) => Promise < boolean > ;
    gravatar: (size: number) => string;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *        - socketRoom
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        socketRoom:
 *          type: string
 *        password:
 *          type: string
 *        fcm_token:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 */
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true
    },
    socketRoom : {
        type: String,
        unique : true,
        trim : true
    },
    password: String,
    fcm_token: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    name : String,
    profile_img : String
}, {
    collection: 'usermodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

export default mongoose.model < IUserModel > ('UserModel', UserSchema);
