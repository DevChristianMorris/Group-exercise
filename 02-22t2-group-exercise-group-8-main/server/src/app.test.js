const request = require("supertest");
const app = require("./app");

describe("app", () => {
  it("should GET /chirps", async () => {
    const expectedBody = [
      {
        text: "I love frogs",
        createdDate: "2022-02-14T16:54:40.000Z",
        username: "Andrew",
        avatar: "https://placeimg.com/100/100/people",
        id: "61480db44ab0cf7175467757",
      },

      {
        text: "I make looms",
        createdDate: "2022-02-18T16:54:40.000Z",
        username: "Lance",
        avatar: "https://placeimg.com/100/100/people",
        id: "614bdb72a84a9f79accfb835",
      },

      {
        text: "Chris is awesome!",
        createdDate: "2022-02-20T16:54:40.000Z",
        username: "Chris",
        avatar: "https://placeimg.com/100/100/people",
        id: "614bdb7fe93ba46343258618",
      },
    ];

    const expectedStatus = 200;

    await request(app)
      .get("/chirps")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;
        expect(body).toEqual(expectedBody);
      });
  });
  it("GET /chirps/:id should retrieve a single chirp with a valid id and a 200 status", async () => {
    await request(app)
      .get("/chirps/61480db44ab0cf7175467757")
      .expect((response) => {
        const expected = {
          text: "I love frogs",
          createdDate: "2022-02-14T16:54:40.000Z",
          username: "Andrew",
          avatar: "https://placeimg.com/100/100/people",
          id: "61480db44ab0cf7175467757",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toEqual(200);
      });
  });
  it("GET /chirps/:id should return an invalid id message with a 400 response when id is invalid", async () => {
    await request(app)
      .get("/chirps/bad-id")
      .expect((response) => {
        const expected = { message: "Invalid chirp id" };
        expect(response.body).toEqual(expected);
        expect(response.status).toEqual(400);
      });
  });
  it("GET /chirps/:id should return a chirp not found message with a 404 response when id is valid but chirp does not exist", async () => {
    await request(app)
      .get("/chirps/61480db44ab0cf7175467758")
      .expect((response) => {
        const expected = { message: "Chirp not found" };
        expect(response.body).toEqual(expected);
        expect(response.status).toEqual(404);
      });
  });
});

describe("app", () => {
  test("POST /chrips creates a new chirp", async () => {
    // arrange
    const expectedStatus = 201;
    const body = {
      text: "Chris is awesome!",
      username: "Chris",
      avatar: "https://placeimg.com/100/100/people",
    };

    // act
    await request(app)
      .post("/chirps")
      .send(body)
      // assert
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });

  test("POST /chirps returns a 400 when an invalid request body is provided", async () => {
    const expectedStatus = 400;
    const body = {};

    await request(app).post("/chirps").send(body).expect(expectedStatus);
  });
});
