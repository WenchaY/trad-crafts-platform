import { selectUserById, registerUser } from "./data-process";
import type express from "express";

/**
 * ユーザ登録
 * @param req
 * @param res
 */
async function register(req: express.Request, res: express.Response) {
  try {
    const { loginId, password, type, displayName } = req.body;

    // 不正なパスパラメータを拒否
    if (!loginId || !password || !type || !displayName) {
      res.status(400).send("Bad request");
      return;
    }

    // 不正なTypeを拒否
    const regexp = /^[0-2]$/;
    if (!regexp.test(type)) {
      res.status(400).send("Bad type");
      return;
    }

    // loginIdが重複された場合を拒否
    const results: any = await selectUserById(loginId);
    if (Object.keys(results).length !== 0) {
      res.status(400).send("Duplicate loginId");
      return;
    }

    // ユーザ情報を登録
    registerUser(loginId, password, type, displayName);
    res.status(200).send("Success");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
}

export default register;
