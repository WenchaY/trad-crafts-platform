import { loginUser } from "./data-process";
import type express from "express";

/**
 * ユーザログイン認証
 * @param req
 * @param res
 */
async function login(req: express.Request, res: express.Response) {
  try {
    const { loginId, password } = req.body;

    // 不正なパスパラメータを拒否
    if (!loginId || !password) {
      res.status(400).send("Bad request");
      return;
    }

    const results: any = await loginUser(loginId, password);

    if (Object.keys(results).length === 0) {
      res.status(401).send("Authentication failed");
      return;
    }

    // ユーザ認証Cookieを発行
    // @ts-expect-error
    req.session.userId = results[0].id;
    // @ts-expect-error
    req.session.loginId = loginId;
    // @ts-expect-error
    req.session.isLogin = true;

    res.status(200).send("Create cookie");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
}

export default login;
