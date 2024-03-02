import { getWasteTable } from './handler';

import * as express from 'express';
import * as compression from 'compression';
import * as apicache from 'apicache';

const DEFAULT_PORT = 3000;

const app = express();
app.use(compression());
const cache = apicache.middleware;

app.use(cache('1 day'));

const port = process.env.PORT ? process.env.PORT : DEFAULT_PORT;

// because `req` generate error: error TS6133: 'req' is declared but its value is never read.
// @ts-ignore
app.get("/health", (req, res) => {
  res.send({ success: true, message: "It is working" });
});

app.get('/', async (req, res) => {
  const { street, ids } = req.query;

  if ((street && (street as string).length >= 3) || (ids && (ids as string).length > 0)) {
    try {
      res.send(await getWasteTable({
        street: (street as string),
        ids: ids ? (ids as string).split(',') : []
      }));
    } catch (error) {
      console.error(error);

      res.status(500);
      //@ts-ignore
      res.send(JSON.stringify(error?.message));
    }
  } else {
    res.send([]);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
