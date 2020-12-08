import { Role } from './role';
import { Userprofile } from './userprofile';

export class User {

  constructor(
    public id: number = null,
    public username: string = null,
    public password: string = null,
    public email: string = null,
    public name: string = null,
    public roles: Array<Role> = [],
    public userProfile: Userprofile = null
    ){}


}
