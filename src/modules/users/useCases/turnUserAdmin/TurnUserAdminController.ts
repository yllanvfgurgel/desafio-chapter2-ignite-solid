import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const newAdmin = this.turnUserAdminUseCase.execute({ user_id });
      return response.json(newAdmin);
    } catch (e) {
      return response.status(404).send({ error: e.message });
    }

  }
}

export { TurnUserAdminController };
