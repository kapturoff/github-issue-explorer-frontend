import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';
import { useState } from 'react';

export enum EOperationType {
  LIST = 'get list',
  POST = 'insert',
  GET = 'obtain',
  PUT = 'update',
}

export interface IDefaultServerResult {
  success: boolean
}

abstract class ApiProvider<T> {
  abstract errorLogName: string;

  api: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com/repos/',
  });

  _list?(settings?: unknown): Promise<T[]>;
  _get?(settings?: unknown): Promise<T>;
  _post?(data: T, settings?: unknown): Promise<unknown>;
  _put?(data: T, settings?: unknown): Promise<unknown>;

  list(settings?: unknown): [T[], boolean] {
    const [loading, setLoading] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<T[]>([]);

    if (!this._list) {
      setLoading(false);
      setResponseData([]);

      return [responseData, loading];
    }

    this._list(settings).then(
      (data) => {
        setResponseData(data);
        setLoading(false);
      },
    );

    return [responseData, loading];
  }

  get(settings?: unknown): [T | undefined, boolean] {
    const [loading, setLoading] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<T>();

    if (!this._get) {
      setResponseData(undefined);
      setLoading(false);

      return [responseData, loading];
    }

    this._get(settings).then(
      (data) => {
        setResponseData(data);
        setLoading(false);
      },
    );

    return [responseData, loading];
  }

  post(data: T, settings?: unknown): [unknown, boolean] {
    const [loading, setLoading] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<unknown>();

    if (!this._post) {
      setResponseData(undefined);
      setLoading(false);

      return [responseData, loading];
    }

    this._post(data, settings).then(
      (serverResponse) => {
        setResponseData(serverResponse);
        setLoading(false);
      },
    );

    return [responseData, loading];
  }

  put(data: T, settings?: unknown): [unknown, boolean] {
    const [loading, setLoading] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<unknown>();

    if (!this._put) {
      setResponseData(undefined);
      setLoading(false);

      return [responseData, loading];
    }

    this._put(data, settings).then(
      (serverResponse) => {
        setResponseData(serverResponse);
        setLoading(false);
      },
    );

    return [responseData, loading];
  }

  onError(operationType: EOperationType) {
    const [messageApi] = message.useMessage();

    messageApi.error(`${this.errorLogName}: Error while attemting to ${operationType}`);
  }
}

export default ApiProvider;
