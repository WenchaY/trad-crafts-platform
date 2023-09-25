/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-mock";
import login from "../../src/user-login";
import { loginUser } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes({
  locals: {
    status: "init",
  },
});

describe("user-login TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, async () => {
    // Mock Select Results
    loginUser.mockReturnValue([
      {
        id: 1,
        login_id: "1",
        password: "123",
        type: 0,
        display_name: "Tanaka",
      },
    ]);

    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "1", password: "123" },
    });

    await login(req, res);

    // 200 - Create cookie
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.send.mock.calls[0][0]).toBe("Create cookie");
  });

  it(`400(Bad request): No loginID`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { password: "123" },
    });

    await login(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): No PassWord`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "1" },
    });

    await login(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`401(Authentication failed): 認証失敗`, async () => {
    // Mock Select Results: No data
    loginUser.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "Bad Id", password: "Bad PW" },
    });

    await login(req, res);

    // 401 - "Authentication failed"
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Authentication failed");
  });
});
