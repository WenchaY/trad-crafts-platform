import { getMockRes } from "@jest-mock/express";
import dotenv from "dotenv";
dotenv.config();

// MySQL Connection Host - Local
process.env.DB_HOST = "127.0.0.1";

// テスト変数定義
const APIKEY = process.env.API_KEY;

const SESSION = {
  cookie: {
    path: "/",
    _expires: "2025-10-15T06:56:37.157Z",
    originalMaxAge: 86400000,
    httpOnly: true,
    domain: "localhost",
  },
  userId: 1,
  loginId: "1",
  isLogin: true,
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJKZXN0IERldmljZSBUZXN0IiwidHlwZSI6MSwiaWF0IjoxNjY1NzMxNzQ4fQ.GPulYelz9DNcqIJPx_pAFWLr8v_IGEU9wFMAufd-J4U";

const COOKIE = "connect.sid=s%3AAUWRQHkKHvRKodyc-hNEpGjfEC99qILQ.Duk3KFvgo282vPH%2FgzplzYf7tkuryw%2BJ%2B4JLv6QQht4";

function testInit() {
  getMockRes().mockClear();
}

export { APIKEY, SESSION, TOKEN, COOKIE, testInit };
