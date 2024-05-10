import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pino from 'pino';
import pinoPretty from 'pino-pretty';

const app = express();
const logger = pino(pinoPretty());

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

let films = [
  {
    id: 1,
    date: new Date().toLocaleString(),
    img: '',
    description: "Фильм 1. Премьера 31 мая.",
  },
  {
    id: 2,
    date: new Date().toLocaleString(),
    img: '',
    description: "Фильм 2. Что осталось за кадром?",
  },
  {
    id: 3,
    date: new Date().toLocaleString(),
    img: '',
    description: "Фильм 3. Рекордсмен по кассовым сборам",
  },
];

app.use(() => {
  setTimeout(() => console.log(films), 10000);
});

const port = process.env.PORT || 7070;

const bootstrap = async () => {
  try {
    app.listen(port, () =>
        logger.info(`Server has been started!`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
