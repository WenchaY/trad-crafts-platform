/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import putDevice from "../../src/devices-put";
import { selectById, updateData } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes();

describe("devices-put TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`201: 正常`, async () => {
    // Mock Select Results
    selectById.mockReturnValue([
      {
        id: 1,
        user_id: "1",
        name: "Jest Device Test-Put",
        state: 1,
        type: 2,
      },
    ]);

    updateData.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
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
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): Bad id`, async () => {
    const req = getMockReq({
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
      params: { id: 1 },
      body: { name: "Jest Device Test-Put", type: "Bad type" },
    });

    await putDevice(req, res);

    // 400 - Bad type
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad type");
  });

  it(`404(Not Found): No User`, async () => {
    // Mock Select Results
    selectById.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
      params: { id: 321321 },
      body: { name: "Jest Device Test-Put", type: 2 },
    });

    await putDevice(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
