import { createConnection } from "mysql2";

import dotenv from "dotenv";
dotenv.config();

let sql;

/**
 * MySQLと接続する
 * @returns Mysql Connection
 */
function connectMysql() {
  // MySQLリンクを作成
  const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // MySQLと接続する
  connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
  });

  return connection;
}

/**
 * SQLを入力、結果を取得
 * @param sql
 * @param sqlParams
 * @returns  SQL実行結果
 */
function runSql(sql: string, sqlParams?: Array<string | number>) {
  const query = new Promise((resolve, reject) => {
    const connection = connectMysql();
    connection.execute(sql, sqlParams, (err, results) => {
      connection.end();
      if (err) throw err;

      resolve(results);
    });
  });

  return query;
}

/**
 * デバイスデータをMySQLに書き込むメソッド
 * @param userId
 * @param name
 * @param type
 * @param token
 * @returns 入れたデバイスデータ
 */
async function insertData(userId: number, name: string, type: number, token: string) {
  sql = `INSERT INTO devices (user_id, device_group_id, name, state, type, token) VALUES (?, 1, ?, 1, ?, ?);`;
  const sqlParams = [userId, `${name}`, type, `${token}`];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * MySQLから全てのデータを取り出すメソッド
 * @returns 取得された結果
 */
async function selectAll() {
  sql = `SELECT * FROM devices;`;

  const results = await runSql(sql);
  return results;
}

/**
 * デバイスIDによってデータを取り出すメソッド
 * @param id
 * @returns 取得された結果
 */
async function selectById(id: number) {
  sql = `SELECT * FROM devices WHERE id=?;`;
  const sqlParams = [id];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * デバイス名とTypeによってデータを取り出すメソッド
 * @param name
 * @param type
 * @returns 取得された結果
 */
async function selectByName(name: string, type: number) {
  sql = `SELECT * FROM devices WHERE name=? AND type=?;`;
  const sqlParams = [`${name}`, type];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * デバイスIDによってデータを取り出すメソッド
 * @param token
 * @returns 取得された結果
 */
async function selectByToken(token: string) {
  sql = `SELECT * FROM devices WHERE token=?;`;
  const sqlParams = [`${token}`];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * IDによって、デバイス名とTypeを修正
 * @param name
 * @param type
 * @param id
 * @returns
 */
async function updateData(name: string, type: number, id: number) {
  sql = `UPDATE devices SET name=?, type=? WHERE id=?;`;
  const sqlParams = [`${name}`, type, id];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * IDによって、デバイスデータを削除
 * @param id
 */
function deleteData(id: number) {
  sql = `DELETE FROM devices WHERE id=${id};`;
  const sqlParams = [id];

  runSql(sql, sqlParams);
}

/**
 * ユーザ情報を登録
 * @param loginId
 * @param password
 * @param type
 * @param displayName
 */
function registerUser(loginId: string, password: string, type: number, displayName: string) {
  sql = `INSERT INTO users (login_id, password, type, display_name) VALUES (?, ?, ?, ?);`;
  const sqlParams = [`${loginId}`, `${password}`, type, `${displayName}`];

  runSql(sql, sqlParams);
}

/**
 * 重複したユーザID認証
 * @param loginId
 * @returns 結果あれば重複
 */
async function selectUserById(loginId: string) {
  sql = `SELECT * FROM users WHERE login_id=?;`;
  const sqlParams = [`${loginId}`];

  const results = await runSql(sql, sqlParams);
  return results;
}

/**
 * ユーザIDとパスワード認証
 * @param loginId
 * @param password
 * @returns 結果あれば認証成功、なければ認証失敗
 */
async function loginUser(loginId: string, password: string) {
  sql = `SELECT * FROM users WHERE login_id=? AND password=?;`;
  const sqlParams = [`${loginId}`, `${password}`];

  const results = await runSql(sql, sqlParams);
  return results;
}

export {
  insertData,
  selectAll,
  selectById,
  selectByName,
  selectByToken,
  updateData,
  deleteData,
  registerUser,
  selectUserById,
  loginUser,
};
