import { IntegramicApplication } from './app';

const port = process.env.PORT || process.env.REST_API_PORT || 5000;

IntegramicApplication().then(({ restApi }) =>
  restApi.listen(port, () => {
    console.log(`[App]: REST API listening on port ${port}`);
    console.log(`[App]: You can access REST API documentation at http://localhost:${port}/rest-api-docs`);
  }),
);
