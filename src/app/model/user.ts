import { Role } from './role';
import { Userprofile } from './userprofile';

export class User {

  constructor(
    public id: Number = null,
    public username: String = null,
    public password: String = null,
    public email: String = null,
    public name: String = null,
    public roles: Array<Role> = [],
    public userProfile: Userprofile = null
    ){}


}
