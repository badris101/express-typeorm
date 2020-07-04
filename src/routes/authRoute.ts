import { Router, Request, Response } from "express";
import { getConnection } from "typeorm";
import { registerValidation, loginValidation } from "../utils/validation";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);

  // validation data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // checking if the user email is already exist in the DB
  const emailExist = await userRepository.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const user = await userRepository.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await userRepository.save(user);
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);

  // validation data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email dosn't exists
  const user = await userRepository.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  // create and assign a token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token });
});

export default router;
