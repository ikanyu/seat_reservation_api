import supertest from 'supertest';
import * as path from 'path';
import * as fs from 'fs';

const request = supertest;
const baseURL = "http://localhost:3000"
const fileName: string = path.join(__dirname, "../../data/seats-sample.json");
const testedFileName: string = path.join(__dirname, "../../data/seats.json");
const fileContent = fs.readFileSync(fileName, 'utf-8');

describe("GET /seats/:cartId/qty/:qty", () => {
  beforeEach(() => {
    fs.writeFileSync(testedFileName, fileContent);
  });

  afterEach(() => {
    fs.writeFileSync(testedFileName, fileContent);
  })

  test("return 200", async() => {
    const cartId: string = "abc123";
    const qty: string = "1";
    const response = await request(baseURL).get(`/seats/${cartId}/qty/${qty}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(["seat-S0-B-2"]);
  })
})
