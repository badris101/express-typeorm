import { Router, Request, Response } from "express";
import { getConnection } from "typeorm";
import { GameKey } from "../entity/Key";
import privat from "../utils/verifyToken";

const router = Router();

router.post("/addKey", privat, async (req: Request, res: Response) => {
  const keysRepository = getConnection().getRepository(GameKey);

  const key = await keysRepository.create({
    key: req.body.key,
  });

  try {
    const savedUser = await keysRepository.save(key);
    res.json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getKeys", privat, async (req: Request, res: Response) => {
  const keysRepository = getConnection().getRepository(GameKey);

  try {
    const keys = await keysRepository.find();
    res.json(keys);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/removeKey/:id", privat, async (req: Request, res: Response) => {
  const keysRepository = getConnection().getRepository(GameKey);

  try {
    await keysRepository.delete(req.params.id);
    res.json({
      msg: "Key deleted successfuly!!",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
