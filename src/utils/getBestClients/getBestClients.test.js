const { getBestClients } = require("./getBestClients");

const mockData = [
  { id: 1, fullName: "Harry Potter", paid: 100 },
  { id: 1, fullName: "Harry Potter", paid: 100 },
  { id: 1, fullName: "Harry Potter", paid: 100 },
  { id: 1, fullName: "Harry Potter", paid: 100 },
  { id: 2, fullName: "Mr Robot", paid: 50 },
  { id: 2, fullName: "Mr Robot", paid: 50 },
  { id: 2, fullName: "Mr Robot", paid: 50 },
  { id: 3, fullName: "John Snow", paid: 200 },
  { id: 4, fullName: "Anna", paid: 20 },
];

describe("getBestClients()", () => {
  it("should return an object with the total of paid and 2 length", () => {
    const bestClients = getBestClients(mockData);
    expect(bestClients).toMatchObject([
      {
        id: 1,
        fullName: "Harry Potter",
        paid: 400,
      },
      {
        id: 3,
        fullName: "John Snow",
        paid: 200,
      },
    ]);
  });

  it("should return an object with the total of paid and 3 length", () => {
    const bestClients = getBestClients(mockData, 3);
    expect(bestClients).toMatchObject([
      {
        id: 1,
        fullName: "Harry Potter",
        paid: 400,
      },
      {
        id: 3,
        fullName: "John Snow",
        paid: 200,
      },
      {
        id: 2,
        fullName: "Mr Robot",
        paid: 150,
      },
    ]);
  });

  it("should return 0 when the data is empty", () => {
    const bestClients = getBestClients([]);
    expect(bestClients.length).toBe(0);
  });
});
