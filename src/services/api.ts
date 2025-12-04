import axios from 'axios';
import { TemplateInfo, Template, BuildResponse } from '../types';
import { API_BASE_URL } from '../config/api';

const API_BASE = `${API_BASE_URL}/api`;

export const api = {
  templates: {
    list: async () => {
      const response = await axios.get<{
        version: string;
        templates: Array<{
          id: string;
          name: string;
          description: string;
          version: string;
          configUrl: string;
        }>;
      }>(`${API_BASE}/templates`);
      return response.data.templates.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        version: t.version,
        valid: true,
        configUrl: t.configUrl,
        previewUrl: t.id, // Maps to /api/build/previews/{templateId}.png
      } as TemplateInfo));
    },

    get: async (name: string) => {
      const response = await axios.get<Template>(
        `${API_BASE}/build/configs/${name}.json`
      );
      return response.data;
    },
  },

  build: async (
    templateName: string,
    configJson: string,
    files: File[],
    userEmail: string
  ): Promise<BuildResponse> => {
    const formData = new FormData();
    formData.append('templateName', templateName);
    formData.append('configJson', configJson);
    formData.append('userEmail', userEmail);

    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post<BuildResponse>(
      `${API_BASE}/build/build`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  download: (buildId: string) => {
    return `${API_BASE}/downloads/${buildId}`;
  },

  cleanup: {
    build: async (buildId: string) => {
      const response = await axios.post(`${API_BASE}/downloads/cleanup/${buildId}`);
      return response.data;
    },

    all: async () => {
      const response = await axios.post(`${API_BASE}/downloads/cleanup/all`);
      return response.data;
    },

    old: async (maxAgeHours: number = 24) => {
      const response = await axios.post(`${API_BASE}/downloads/cleanup/old`, {
        maxAgeHours,
      });
      return response.data;
    },

    full: async () => {
      const response = await axios.post(`${API_BASE}/downloads/cleanup/full`);
      return response.data;
    },
  },
};
