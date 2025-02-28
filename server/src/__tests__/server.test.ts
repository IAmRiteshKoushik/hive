import { InitServer } from "../server";
import request, { Response } from "supertest";

const app = new InitServer();
app.setup();
app.start();

// group test using describe
describe("POST /api/v1/test", () => {
  it('Responds with Server ALIVE', (done) => {
    request(app.app)
      .get("/api/v1/test")
      .set("Content-Type", "application/json")
      .expect('{"message":"Heartbeat exists."}')
      .expect(200)
      .end((err: Error, _: Response) => {
        if (err) return done(err);
        return done();
      })
  });
});
