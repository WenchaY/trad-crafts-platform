import type express from "express";

/**
 * ユーザログアウト
 * @param req
 * @param res
 */
function logout(req: express.Request, res: express.Response) {
  try {
    // 現在はログイン状態をチェック
    // @ts-expect-error
    if (req.session.isLogin !== true) {
      res.status(401).send("Please login : /api/httpmanage/login");
      return;
    }

    // Cookieを削除し、ログイン状態をFalse
    req.session.cookie.maxAge = 0;
    // @ts-expect-error
    req.session.isLogin = false;
    // @ts-expect-error
    res.status(200).send("User logout - userId:" + req.session.userId);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
}

export default logout;
