import { selectById } from "./data-process";
import type express from "express";

/**
 * Getパスパラメータリクエストでデータを検索
 * @param req
 * @param res
 */
async function getDevicesByPath(req: express.Request, res: express.Response) {
  try {
    // @ts-expect-error
    const id = req.id ? req.id : req.params.id;

    // 不正なパスパラメータを拒否
    const regexp = /^[-]?([1-9]\d*|0)$/;
    if (!regexp.test(id)) {
      res.status(400).send("Bad request");
      return;
    }

    const idNum = parseInt(id);
    const results: any = await selectById(idNum);

    // 対象デバイスが存在しない場合、404 Not Found
    if (Object.keys(results).length === 0) {
      res.status(404).send("Not Found");
      return;
    }

    // 対象デバイスが存在する場合、200 データ返信
    res.status(200).send(results);
  } catch (e) {
    res.status(500).send("Server error");
  }
}

export default getDevicesByPath;
