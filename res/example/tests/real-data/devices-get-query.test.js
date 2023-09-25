/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-real";
import getDevicesByQuery from "../../src/devices-get-query";

const { res, mockClear } = getMockRes();

beforeAll(() => {
  init.testInit();
});

describe("devices-get-query TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: デバイス一覧`, async () => {
    const req = getMockReq();

    await getDevicesByQuery(req, res);

    // 200 - DB results have: id, user_id, name, state, type
    expect(res.status.mock.calls[0][0]).toBe(200);

    for (let deviceNum = 0; deviceNum < res.send.mock.calls[0][0].length; deviceNum++) {
      expect(res.send.mock.calls[0][0][deviceNum]).toHaveProperty("id");
      expect(res.send.mock.calls[0][0][deviceNum]).toHaveProperty("user_id");
      expect(res.send.mock.calls[0][0][deviceNum]).toHaveProperty("name");
      expect(res.send.mock.calls[0][0][deviceNum]).toHaveProperty("state");
      expect(res.send.mock.calls[0][0][deviceNum]).toHaveProperty("type");
    }
  });
});
