import axios from 'axios';

import { baseUrlConfig, slackConfig } from '@/config';

export const baseAPI = axios.create({
  baseURL: baseUrlConfig.serviceUrl || '',
  withCredentials: true,
});

export const slackAPI = axios.create({
  baseURL: slackConfig.webhookUrl || '',
});
