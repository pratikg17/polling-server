const build = require('../../src/app');

describe('Root Route', () => {
  beforeEach(() => {
    app = build();
  });

  afterEach(() => {
    app.close();
  });

  it('should return 200 when root route', async () => {
    const res = await app.inject({ url: '/' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ hello: 'world! done CI/CD' });
  });
});
