/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-mock";
import postDevices from "../../src/devices-post";
import { insertData, selectById } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes();

describe("devices-post TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`201: 正常`, async () => {
    // Mock Select Results
    insertData.mockReturnValue([{ insertId: 1 }]);
    selectById.mockReturnValue([
      {
        id: 1,
        login_id: "1",
        name: "Jest Device Test",
        state: 1,
        type: 1,
      },
    ]);

    const req = getMockReq({
      session: init.SESSION,
      body: { name: "Jest Device Test", type: 1 },
    });

    await postDevices(req, res);

    // 201 - DB results[0]: name,type
    expect(res.status.mock.calls[0][0]).toBe(201);
    expect(res.send.mock.calls[0][0][0].name).toBe("Jest Device Test");
    expect(res.send.mock.calls[0][0][0].type).toBe(1);
  });

  it(`400(Bad request): No name`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { type: 1 },
    });

    await postDevices(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): No type`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { name: "Jest Device Test" },
    });

    await postDevices(req, res);

    // 400 - Bad type
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad type): No type`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { name: "Jest Device Test", type: "Bad type" },
    });

    await postDevices(req, res);

    // 400 - Bad type
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad type");
  });
});
