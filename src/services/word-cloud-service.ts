import Axios, { AxiosError } from 'axios';
import { IFetchResponse } from '../types/IFetchResponse';
import { ITextFilesPagination } from '../types/ITextFilesPagination';
import { ITextFile } from '../types/ITextFile';

export abstract class WordCloudService {
  protected static axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  static async UploadTextFileFileForAnalytics(formData: FormData): Promise<IFetchResponse<void>> {
    try {
      const response = await this.axios.post('/word-cloud/upload-text-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return {
        ok: response.status <= 299,
        statusCode: response.status,
        data: response.data
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        ok: false,
        statusCode: error.response?.status ?? 500,
        messages: 'Error'
      };
    }
  }

  static async GetTextFiles(): Promise<IFetchResponse<ITextFilesPagination>> {
    try {
      const response = await this.axios.get<ITextFilesPagination>('/text-files');
      return {
        ok: response.status <= 299,
        statusCode: response.status,
        data: response.data
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        ok: false,
        statusCode: error.response?.status ?? 500,
        messages: 'Error'
      };
    }
  }

  static async GetTextFile(id: number): Promise<IFetchResponse<ITextFile>> {
    try {
      const response = await this.axios.get<ITextFile>(`/text-file/${id}`);
      return {
        ok: response.status <= 299,
        statusCode: response.status,
        data: response.data
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        ok: false,
        statusCode: error.response?.status ?? 500,
        messages: 'Error'
      };
    }
  }
}
