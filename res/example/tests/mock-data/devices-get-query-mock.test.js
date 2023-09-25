/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import getDevicesByQuery from "../../src/devices-get-query";
import { selectAll } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes();

describe("devices-get-query TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: デバイス一覧`, async () => {
    // Mock Select Results
    selectAll.mockReturnValue([
      {
        id: 1,
        user_id: "1",
        name: "Jest Device Test1",
        state: 1,
        type: 1,
      },
      {
        id: 2,
        user_id: "1",
        name: "Jest Device Test2",
        state: 1,
        type: 1,
      },
    ]);

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

  it(`404(Not Found): No User`, async () => {
    // Mock Select Results
    selectAll.mockReturnValue([]);

    const req = getMockReq();

    await getDevicesByQuery(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
