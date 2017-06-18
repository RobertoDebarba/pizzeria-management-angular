import {Storage} from "./storage";
import {User} from "../model/user.model";

export class UserDao {

    public static get(username: string, password: string): Promise<User> {
        let sql: string = `SELECT ID 'id', NAME 'name', PASSWORD 'password' 
            FROM USERS
            WHERE NAME = '${username}'
                AND PASSWORD = SHA1('${password}')`;

        return Storage.executeSql(sql).then((users: User[]) => {
            return users[0];
        })
    }

}