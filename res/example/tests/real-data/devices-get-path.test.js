/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-real";
import getDevicesByPath from "../../src/devices-get-path";

const { res, mockClear } = getMockRes();

beforeAll(() => {
  init.testInit();
});

describe("devices-get-path TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, async () => {
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
    const req = getMockReq({
      id: 123123,
    });

    await getDevicesByPath(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
