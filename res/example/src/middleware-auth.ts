import type express from "express";
import { verify } from "jsonwebtoken";
import { selectByToken } from "./data-process";

/**
 * API Key 認証
 * @param req
 * @param res
 * @param next
 */
function authApiKey(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.header("x-api-key") !== process.env.API_KEY) {
    res.status(401).send("Authentication failed");
    return;
  }
  next();
}

/**
 * JWT 認証
 * @param req
 * @param res
 * @param next
 */
async function authJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
  // リクエストヘッダーからトークンの取得
  let token = "";
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(401).send("Bad token");
  }

  // Tokenの検証
  // @ts-expect-error
  verify(token, process.env.SECRET_KEY, async (err) => {
    // 認証NGの場合
    if (err) {
      res.status(401).send("Bad token");
      return;
    }

    // 認証OKの場合
    const results: any = await selectByToken(token);

    // 対象デバイスが存在しない場合、404 Not Found
    if (Object.keys(results).length === 0) {
      res.status(404).send("Not Found");
      return;
    }

    // @ts-expect-error
    req.id = results[0].id;
    next();
  });
}

/**
 * Cookie 認証
 * @param req
 * @param res
 * @param next
 */
function authCookie(req: express.Request, res: express.Response, next: express.NextFunction) {
  // @ts-expect-error
  if (req.session.isLogin !== true) {
    res.status(401).send("Please login : /api/httpmanage/login");
    return;
  }
  next();
}

export default {
  authApiKey,
  authJWT,
  authCookie,
};
