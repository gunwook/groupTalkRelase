import * as Joi from 'joi';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';
import { Types } from 'mongoose';
import CError from '../../utils/CError';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = UserValidation.getUser({
                id
            });

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            return await UserModel.findOne({
                _id :  Types.ObjectId(id)
            });
        } catch (error) {
            throw new CError(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = UserValidation.removeUser({
                id
            });

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOneAndRemove({
                _id:  Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new CError(error.message);
        }
    }
};

export default UserService;
