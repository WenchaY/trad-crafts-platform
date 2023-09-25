import { selectAll } from "./data-process";
import type express from "express";

/**
 * Getクエリパラメータリクエストでデータを検索
 * @param req
 * @param res
 */
async function getDevicesByQuery(req: express.Request, res: express.Response) {
  try {
    const results: any = await selectAll();

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

export default getDevicesByQuery;
