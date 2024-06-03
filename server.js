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
    img: "https://www.clipartmax.com/png/full/310-3105859_film-cinema-icon-png.png",
    name: "Фильм 1",
    description: "Премьера 31 августа",
  },
  {
    id: 2,
    date: new Date().toLocaleString(),
    img: "https://www.clipartmax.com/png/full/310-3105859_film-cinema-icon-png.png",
    name: "Фильм 2",
    description: "Что осталось за кадром?",
  },
  {
    id: 3,
    date: new Date().toLocaleString(),
    img: "https://www.clipartmax.com/png/full/310-3105859_film-cinema-icon-png.png",
    name: "Фильм 3",
    description: "Рекордсмен по кассовым сборам",
  },
];

app.use(async (request, response) => {
    response.send(JSON.stringify(films)).end();
})

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
