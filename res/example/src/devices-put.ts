import { selectById, updateData } from "./data-process";
import type express from "express";

/**
 *
 * @param req
 * @param res
 */
async function putDevice(req: express.Request, res: express.Response) {
  try {
    const { name, type } = req.body;
    const { id } = req.params;

    // 不正なパスパラメータを拒否（path parameter検証）
    const regexp1 = /^[-]?([1-9]\d*|0)$/;
    if (!regexp1.test(id)) {
      res.status(400).send("Bad request");
      return;
    }

    const idNum = parseInt(id);

    // 不正なパスパラメータを拒否（request body検証）
    if (!name || !type) {
      res.status(400).send("Bad request");
      return;
    }

    // 不正なTypeを拒否
    const regexp2 = /^[1,2,9]$/;
    if (!regexp2.test(type)) {
      res.status(400).send("Bad type");
      return;
    }

    // 受け取ったIDを検証
    const detectionResults: any = await selectById(idNum);

    // 対象デバイスが存在しない場合、404 Not Found
    if (Object.keys(detectionResults).length === 0) {
      res.status(404).send("Not Found");
      return;
    }

    // 対象デバイスが存在する場合、データを修正し、200 返信
    await updateData(name, type, idNum);
    const results = await selectById(idNum);
    res.status(200).send(results);
  } catch (e) {
    res.status(500).send("Server error");
  }
}

export default putDevice;
