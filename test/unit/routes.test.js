import request from "supertest";
import { expect, assert } from "chai";
import app from "../../src/app.js";

describe("Tests routes response for both valid and invalid routes", () => {
  it("Should return 200 if route is working fine", async () => {
    const response = await request(app).get("/api/v1").expect(200);
    assert.isObject(response.body);
  });

  it("Should throw a 404 error on an invalid route", async () => {
    const response = await request(app).get("/api/v1/invalidRoute").expect(404);
    assert.isObject(response.body);
  });
});
