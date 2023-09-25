/* eslint-disable no-undef */
import { getMockReq, getMockRes } from "@jest-mock/express";
import * as init from "./test-init-mock";
import auth from "../../src/middleware-auth";
import { selectByToken } from "../../src/data-process";

jest.mock("../../src/data-process");

const { res, next, mockClear } = getMockRes();

describe("devices-get-token TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: Tokenによって検索`, async () => {
    // Mock Select Results
    selectByToken.mockReturnValue([
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
      headers: { authorization: init.TOKEN },
      id: "mock id",
    });

    await auth.authJWT(req, res, next);

    // next が呼ばれたのをチェック
    expect(req.id).toBe(1);
    expect(next).toBeCalled();
  });

  it(`401(Bad token): Bad token`, async () => {
    const req = getMockReq({
      headers: { authorization: "Bad Token" },
    });

    await auth.authJWT(req, res, next);

    // 401 - Bad token
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Bad token");
  });

  it(`401(Bad token): Bad secret key token`, async () => {
    const req = getMockReq({
      headers: { authorization: init.BAD_KEY_TOKEN },
    });

    await auth.authJWT(req, res, next);

    // 401 - Bad token
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Bad token");
  });

  it(`404(Not Found): No User`, async () => {
    // Mock Select Results
    selectByToken.mockReturnValue([]);

    // Mock Request
    const req = getMockReq({
      headers: { authorization: init.TOKEN },
    });

    await auth.authJWT(req, res, next);

    // 404 - Not Found
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls[0][0]).toBe("Not Found");
  });
});

describe("authCookie TEST", () => {
  beforeEach(() => {
    mockClear();
  });

  it(`200: 正常`, () => {
    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
    });

    auth.authCookie(req, res, next);

    // next が呼ばれたのをチェック
    expect(next).toBeCalled();
  });

  it(`401(Please login): No login`, () => {
    // Mock Request
    const req = getMockReq({
      session: init.SESSION,
    });
    // No login
    req.session.isLogin = false;

    auth.authCookie(req, res, next);

    // 401 - Please login
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.send.mock.calls[0][0]).toBe("Please login : /api/httpmanage/login");
  });
});
