import axios from 'axios';
import dotenv from "dotenv";
import {oauth_token, user_info} from "../mock/mockData";
import {generateFailResponse, generateSuccessResponse} from "../common/response";
import EStatus from "../common/status";

const config = dotenv.config().parsed;

export class AuthService {
  async verify(code: string): Promise<any> {
    const res = await this.oauthToken(code);

    if (res.success) {
      return await this.getUserInfo(res.data.access_token);
    } else {
      return res;
    }
  }

  private async oauthToken(code: string): Promise<any> {
    const params = {
      client_key: config!.CLIENT_KEY,
      client_secret: config!.CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "https://yourapp.com/callback",
      code,
    }

    try {
      const res = await axios.post("https://open.tiktokapis.com/v2/oauth/token/", params).catch(e => {
        return generateFailResponse(e.response.status, e.response.data, e.message)
      });

      if (config!.MOCK === '1') {
        return generateSuccessResponse(oauth_token);
      }
      return generateSuccessResponse(res);
    } catch (e: any) {
      return generateFailResponse(EStatus.SYSTEM_ERROR, null, e.message)
    }
  }

  private async getUserInfo(code: string): Promise<any> {
    const params = {
      fields: 'display_name,username,follower_count,following_count,likes_count,video_count,open_id,union_id,avatar_url',
    }
    try {
      const res = await axios.get("https://open.tiktokapis.com/v2/user/info/", {
        params,
        headers: {
          Authorization: '' // TODO
        }
      }).catch(e => {
        return generateFailResponse(e.response.status, e.response.data, e.message)
      });

      if (config!.MOCK === '1') {
        return generateSuccessResponse(user_info);
      }
      return generateSuccessResponse(res);
    } catch (e: any) {
      return generateFailResponse(EStatus.SYSTEM_ERROR, null, e.message)
    }
  }
}
