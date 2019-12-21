import { IUserModel } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(id: string): Promise<IUserModel>;

    /**
     * @param {string} email
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IUserModel>;
}
