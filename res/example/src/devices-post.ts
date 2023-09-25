import { insertData, selectById } from "./data-process";
import type express from "express";
import { sign } from "jsonwebtoken";

/**
 * Postリクエストでデバイスデータを作成
 * @param req
 * @param res
 */
async function postDevices(req: express.Request, res: express.Response) {
  try {
    const { name, type } = req.body;
    // @ts-expect-error
    const userId = req.session.userId;

    // 不正なパスパラメータを拒否
    if (!name || !type) {
      res.status(400).send("Bad request");
      return;
    }

    // 不正なTypeを拒否
    const regexp = /^[1,2,9]$/;
    if (!regexp.test(type)) {
      res.status(400).send("Bad type");
      return;
    }

    // ユーザ認証JWTを発行
    const payload = {
      userId,
      name,
      type,
    };
    const token = sign(payload, process.env.SECRET_KEY || "");

    const insertResult: any = await insertData(userId, name, type, token);
    const results = await selectById(insertResult.insertId);

    res.status(201).send(results);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
}

export default postDevices;
