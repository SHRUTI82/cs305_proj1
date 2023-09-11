const jwt = require("jsonwebtoken");
const verify = require("../verification");

describe("verify function", () => {
  it("should return 401 status and 'You are not authenticated!' message if no token is provided", () => {
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

    verify(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
  });

  it("should return 403 status and 'Token is not valid!' message if invalid token is provided", () => {
    const req = {
      headers: {
        token: "Bearer invalidToken",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();
    const verifyMock = jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    verify(req, res, next);

    expect(verifyMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Token is not valid!");

    verifyMock.mockRestore();
  });

  it("should call next with user object if valid token is provided", () => {
    const req = {
      headers: {
        token: "Bearer validToken",
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    const verifyMock = jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, name: "John Doe" });
    });

    verify(req, res, next);

    expect(verifyMock).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1, name: "John Doe" });
    expect(next).toHaveBeenCalled();

    verifyMock.mockRestore();
  });
});