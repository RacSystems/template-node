import cors from 'cors';
import dateFnsFormat from 'date-fns/format';
import express, { NextFunction, Request, Response } from 'express';

import EHttpCodes from '../core/HttpCodes';

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use((_, response, next) => {
    setTimeout(next, Math.floor(Math.random() * 2000 + 1500));
  });
}

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  return response.status(EHttpCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      message: 'Erro interno do servidor',
      err: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `\n\n Template Node started on port ${process.env.PORT} in ${dateFnsFormat(
      new Date(),
      'dd/MM/yyyy - HH:mm:ss',
    )}! \n http://localhost:${process.env.PORT}\n\n`,
  );
});
