/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-real";
import loginUser from "../../src/user-login";

const { res, mockClear } = getMockRes({
  locals: {
    status: "init",
  },
});

beforeAll(() => {
  init.testInit();
});

describe("user-login TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "1", password: "123" },
    });

    await loginUser(req, res);

    // 200 - Create cookie
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.send.mock.calls[0][0]).toBe("Create cookie");
  });

  it(`400(Bad request): No loginID`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { password: "123" },
    });

    await loginUser(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`400(Bad request): No PassWord`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "1" },
    });

    await loginUser(req, res);

    // 400 - Bad request
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.send.mock.calls[0][0]).toBe("Bad request");
  });

  it(`401(Authentication failed): 認証失敗`, async () => {
    const req = getMockReq({
      session: init.SESSION,
      body: { loginId: "Bad Id", password: "Bad PW" },
    });

    await loginUser(req, res);

    // 401 - "Authentication failed"
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Authentication failed");
  });
});
