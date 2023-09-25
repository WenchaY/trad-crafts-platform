import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";

import getDevicesByQuery from "./devices-get-query";
import postDevices from "./devices-post";
import getDevicesByPath from "./devices-get-path";
import putDevice from "./devices-put";
import deleteDevice from "./devices-delete";
import registerUser from "./user-register";
import loginUser from "./user-login";
import logoutUser from "./user-logout";
import auth from "./middleware-auth";
dotenv.config();

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// request bodyのjson文解析
app.use(express.json());

// requestでcookieを解析できるよう
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // HTTPだけCookieを使える
      httpOnly: true,
      domain: process.env.SESSION_DOMAIN,
      // 時間単位はms、有効期限を一日に設定
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

/**
 * API Key認証ミドルウェア
 */
app.use("/api", auth.authApiKey);

/**
 * Cookie認証ミドルウェア
 */
app.use("/api/httpmanage/devices", auth.authCookie);

/**
 * JWT認証ミドルウェア
 */
app.use("/api/httpdevice/devices", auth.authJWT);

/**
 * ユーザ登録
 */
app.post("/api/httpmanage/register", registerUser);

/**
 * ユーザログイン認証、Cookieを発行
 */
app.post("/api/httpmanage/login", loginUser);

/**
 * ユーザログアウト、Cookieを削除
 */
app.post("/api/httpmanage/logout", logoutUser);

/**
 * Tokenでデバイスデータを検索
 */
app.get("/api/httpdevice/devices", getDevicesByPath);

/**
 * Getクエリパラメータリクエストでデータを検索
 */
app.get("/api/httpmanage/devices", getDevicesByQuery);

/**
 * Postリクエストでデバイスデータを作成
 */
app.post("/api/httpmanage/devices", postDevices);

/**
 * Getパスパラメータリクエストでデータを検索
 */
app.get("/api/httpmanage/devices/:id", getDevicesByPath);

/**
 * Putリクエストでデバイスデータを編集
 */
app.put("/api/httpmanage/devices/:id", putDevice);

/**
 * Deleteリクエストでデバイスデータを削除
 */
app.delete("/api/httpmanage/devices/:id", deleteDevice);
