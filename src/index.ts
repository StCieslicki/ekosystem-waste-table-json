import {getWasteTable} from "./service/parse";

import * as express from 'express';
import * as compression from 'compression';
import * as apicache from 'apicache';

const app = express();
app.use(compression());
const cache = apicache.middleware;

app.use(cache('1 day'));

const port = 3000;

app.get('/', async (req, res) => {
  const { street } = req.query;

  if (street && (street as string).length >= 3) {
    try {
      res.send(await getWasteTable({street: (street as string)}));
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
  console.log(`Example app listening on port ${port}`);
});
