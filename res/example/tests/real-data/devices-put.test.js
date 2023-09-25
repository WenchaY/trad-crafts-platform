/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-real";
import putDevice from "../../src/devices-put";

const { res, mockClear } = getMockRes();

beforeAll(() => {
  init.testInit();
});

describe("devices-get-query TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`201: 正常`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: 1 },
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 200 - DB results: id,name,type
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.send.mock.calls[0][0][0].id).toBe(1);
    expect(res.send.mock.calls[0][0][0].name).toBe("Jest Device Test-Put");
    expect(res.send.mock.calls[0][0][0].type).toBe(2);
  });

  it(`400(Bad request): No id`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): Bad id`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: "Bad id" },
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): No name`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: 1 },
      body: { type: 2 },
    });

    await putDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): No type`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: 1 },
      body: { name: "Jest Device Test-Put" },
    });

    await putDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): Bad type`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: 1 },
      body: { name: "Jest Device Test-Put", type: "Bad type" },
    });

    await putDevice(req, res);

    // 400 - Bad type
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad type");
  });

  it(`404(Not Found): No User`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      params: { id: 321321 },
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
