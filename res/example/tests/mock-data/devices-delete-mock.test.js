/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import deleteDevice from "../../src/devices-delete";
import { selectById, deleteData } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes();

describe("devices-delete TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`204: 正常`, async () => {
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

    deleteData.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
      params: { id: 1 },
    });

    await deleteDevice(req, res);

    // 200 - DB results: id,name,type
    expect(res.status.mock.calls[0][0]).toBe(204);
    expect(res.send.mock.calls[0][0]).toBe("Success");
  });

  it(`400(Bad request): No id`, async () => {
    const req = getMockReq();

    await deleteDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): Bad id`, async () => {
    const req = getMockReq({
      params: { id: "Bad id" },
    });

    await deleteDevice(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`404(Not Found): No User`, async () => {
    // Mock Select Results
    selectById.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
      params: { id: 321321 },
    });

    await deleteDevice(req, res);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});
