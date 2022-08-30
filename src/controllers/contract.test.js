const { contractServices } = require("../services/contract");
const { contractController } = require("./contract");

jest.mock("../services/contract");

const buildRes = (overrides) => {
  const res = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    ...overrides,
  };

  return res;
};

const buildReq = (overrides) => {
  const req = {
    body: {},
    params: {},
    ...overrides,
  };
  return req;
};

describe("contractController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should response with 404 ", async () => {
    const spy = jest
      .spyOn(contractServices, "get")
      .mockImplementation(() => Promise.resolve({ abc: 121 }));

    const req = buildReq({
      headers: {
        profile_id: 1,
      },
    });
    const res = buildRes();
    const next = jest.fn();

    await contractController.getAllContracts(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
