/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import getDevicesByPath from "../../src/devices-get-path";
import { selectById } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes();

describe("devices-get-path TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, async () => {
    // Mock Select Results
    selectById.mockReturnValue([
      {
        id: 1,
        user_id: "1",
        name: "Jest Device Test",
        state: 1,
        type: 1,
      },
    ]);

    // Mock Request
    const req = getMockReq({
      id: 1,
    });

    await getDevicesByPath(req, res);

    // 200 - DB result: id=1
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.send.mock.calls[0][0][0].id).toBe(1);
  });

  it(`400(Bad request): Bad path-id`, async () => {
    const req = getMockReq({
      id: "Bad id",
    });

    await getDevicesByPath(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`404(Not Found): No User`, async () => {
    // Mock Select Results: No data
    selectById.mockReturnValue([]);

    const req = getMockReq({
      id: 123123,
    });

    await getDevicesByPath(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
