import {IConnection, IError} from "mysql";
import {MySqlDatabase} from "./mysql-database";

export class Storage {

    public static executeSql(sql: string): Promise<any | IError> {
        return new Promise((resolve, reject) => {
            MySqlDatabase.getConnection().then((connection: IConnection) => {
                connection.query(sql, (error: IError, result: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }

    public static beginTransaction(): Promise<any | IError> {
        return new Promise((resolve, reject) => {
            MySqlDatabase.getConnection().then((connection: IConnection) => {
                connection.beginTransaction((error: IError) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                })
            })
        })
    }

    public static commit(): Promise<any | IError> {
        return new Promise((resolve, reject) => {
            MySqlDatabase.getConnection().then((connection: IConnection) => {
                connection.commit((error: IError) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                })
            })
        })
    }

    public static rollback(): Promise<any | IError> {
        return new Promise((resolve, reject) => {
            MySqlDatabase.getConnection().then((connection: IConnection) => {
                connection.rollback(() => {
                    resolve();
                })
            })
        })
    }

}