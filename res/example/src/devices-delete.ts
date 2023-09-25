import { selectById, deleteData } from "./data-process";
import type express from "express";

/**
 *
 * @param req
 * @param res
 */
async function deleteDevice(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    // 不正なパスパラメータを拒否（path parameter検証）
    const regexp = /^[-]?([1-9]\d*|0)$/;
    if (!regexp.test(id)) {
      res.status(400).send("Bad request");
      return;
    }

    // 受け取ったIDを検証
    const idNum = parseInt(id);
    const results: any = await selectById(idNum);

    // 対象デバイスが存在しない場合、404 Not Found
    if (Object.keys(results).length === 0) {
      res.status(404).send("Not Found");
      return;
    }

    // 対象デバイスが存在する場合、データを削除し、204 返信
    deleteData(idNum);
    res.status(204).send("Success");
  } catch (e) {
    res.status(500).send("Server error");
  }
}

export default deleteDevice;
