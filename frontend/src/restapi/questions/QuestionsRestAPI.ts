import axios from 'axios';
import { EntityIdGenerator } from '../../components/atoms/idGenerator/EntityIdGenerator';
import { PATH_BASE_URL } from '../../components/atoms/constants/apiPaths';
import { getAuthorizationTokenValue, getAuthorizedUserId } from '../cookies';

export type QuestionsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: QuestionsRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const QuestionsRestApi = (config?: Partial<QuestionsRestApiConfig>) => {
  const currentConfig = {
    ...defaultConfig,
    config,
    baseUrl: process.env.REACT_APP_REST_API_BASE_URL ?? config?.baseUrl ?? defaultConfig.baseUrl,
  };
  return {
    async postQuestion(body: { groupId: string; text: string }): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/questions/${getAuthorizedUserId()}`,
        { ...body, questionId: EntityIdGenerator.generate() },
        {
          headers: {
            Authorization: getAuthorizationTokenValue(),
          },
        },
      );
    },
    async getQuestion(body: { groupId: string }): Promise<{ questionId: string; text: string } | undefined> {
      return await axios
        .get<{ questions: { questionId: string; text: string; groupId: string }[] }>(
          `${currentConfig.baseUrl}/questions/${getAuthorizedUserId()}`,
          {
            headers: {
              Authorization: getAuthorizationTokenValue(),
            },
          },
        )
        .then((r) => r.data.questions.find((q) => q.groupId === body.groupId))
        .catch((e) => undefined);
    },
    async getCurrentGroupQuestion(body: { groupId: string }): Promise<{ text: string } | undefined> {
      return await axios
        .get<{ text: string }>(`${currentConfig.baseUrl}/current-question/${body.groupId}`, {
          headers: {
            Authorization: getAuthorizationTokenValue(),
          },
        })
        .then((res) => res.data)
        .catch((e) => undefined);
    },
  };
};
