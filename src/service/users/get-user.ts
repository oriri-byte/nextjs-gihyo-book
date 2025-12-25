import type { ApiContext, User } from '../../types/data';
import { fetcher } from '../../utils/fetcher';

export type GetUserParams = {
  id: number;
};

/**
 * ユーザAPI
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザ
 */
const getUser = async (context: ApiContext, { id }: GetUserParams): Promise<User> => {
  /**
   * ユーザAPI
   * サンプルレスポンス
   * {
   *  "id": 1,
   *  "username": "sampleuser",
   *  "displayName": "Sample User",
   *  "email": "sampleuser@example.com",
   *  "profileImageUrl": "/users/1.png",
   *  "description": "LoremIpsum is simply dummy text of printing and typesetting industry"
   * }
   */
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default getUser;
