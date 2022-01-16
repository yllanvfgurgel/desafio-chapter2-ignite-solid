import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    try {
      const createdUser = this.createUserUseCase.execute({ email, name });

      return response.status(201).json(createdUser);
    } catch (e) {
      return response.status(400).send({ error: e.message });
    }
  }
}

export { CreateUserController };
