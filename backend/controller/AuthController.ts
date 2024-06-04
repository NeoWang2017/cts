/**
 * authController
 * @author wwl
 * @created 2024/5/23
 * @modified 2024/5/23
 */
import {Request, Response} from 'express';
import {AuthService} from "../service/AuthService";

class AuthController {
  private userService = new AuthService();

  verify = async (req: Request, res: Response) => {
    const {authCode, scopes, clientKey} = req.body;
    const response = await this.userService.verify(authCode);

    res.send(response);
  };

  tokenCallback = async (req: Request, res: Response) => {
    res.send({status: "success"});
  }
}

const authController = new AuthController();

export default authController;
