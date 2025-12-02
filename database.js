import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return SQLite.openDatabase('meubanco.db');
};

export const createTable = async (db) => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS clientes (

id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
email TEXT
);`
        );
    });
};