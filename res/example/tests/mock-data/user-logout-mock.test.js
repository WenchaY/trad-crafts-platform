/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-mock";
import logout from "../../src/user-logout";

jest.mock("../../src/data-process");

const { res, mockClear } = getMockRes({
  locals: {
    status: "init",
  },
});

describe("user-logout TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, () => {
    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
    });

    logout(req, res);

    // 200 - User logout
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.send.mock.calls[0][0]).toBe("User logout - userId:" + req.session.userId);

    // Session 変更チェック
    expect(req.session.cookie.maxAge).toBe(0);
    expect(req.session.isLogin).toBe(false);
  });

  it(`401(Please login): No login`, () => {
    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
    });
    // No login
    req.session.isLogin = false;

    logout(req, res);

    // 401 - Please login
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Please login : /api/httpmanage/login");
  });
});
