import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class UserController {

    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.name && req.body.name.firstName && req.body.name.middleName && req.body.name.lastName &&
            req.body.email &&
            req.body.phoneNumber &&
            req.body.gender) {
            const user_params: IUser = {
                name: {
                    firstName: req.body.name.firstName,
                    middleName: req.body.name.middleName,
                    lastName: req.body.name.lastName
                },
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                gender: req.body.gender,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New user created'
                }]
            };
            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create user successfull', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Records successfully fetched', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public getAllUsers(req: Request, res: Response) {
        this.user_service.getAllUser({}, (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Records successfully fetched', user_data, res);
            }
        });

    }
    public update_user(req: Request, res: Response) {
        if (req.params.id &&
            req.body.name || req.body.name.firstName || req.body.name.middleName || req.body.name.lastName ||
            req.body.email ||
            req.body.phoneNumber ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User data updated'
                    });
                    const user_params: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            firstName: req.body.name.firstName ? req.body.name.firstName : user_data.name.firstName,
                            middleName: req.body.name.firstName ? req.body.name.middleName : user_data.name.middleName,
                            lastName: req.body.name.firstName ? req.body.name.lastName : user_data.name.lastName
                        } : user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : user_data.phoneNumber,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_notes: user_data.modification_notes
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('User updated successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('Invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('Invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}