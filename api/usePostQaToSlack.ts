import { useMutation } from '@tanstack/react-query';

import { slackConfig } from '@/config';

import { slackAPI } from '@core/baseInstance';

export interface ElementInfo {
  pathName: string;
  tagName: string;
  className: string;
  id: string;
  textContent: string;
}

interface PostQaToSlackProps {
  qaText: string;
  elementInfo: ElementInfo;
}

const createTitleBlock = (title: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*${title}*`,
  },
});

const createSlackBlock = (label: string, content: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*\`${label}\`* : ${content}`,
  },
});

const postQaToSlack = async ({ qaText, elementInfo }: PostQaToSlackProps) => {
  const payload = {
    text: '📷  새로운 QA 발생!',
    blocks: JSON.stringify([
      createTitleBlock('📷  새로운 QA 발생!'),
      createSlackBlock('QA 메시지', qaText),
      createSlackBlock('pathname', elementInfo.pathName),
      createSlackBlock('tagName', elementInfo.tagName),
      createSlackBlock('id', elementInfo.id),
      createSlackBlock('className', elementInfo.className),
      createSlackBlock('textContent', elementInfo.textContent),
    ]),
  };

  const res = await slackAPI({
    method: 'post',
    url: slackConfig.webhookUrl,
    data: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res;
};

export const usePostQaToSlack = () => {
  return useMutation({
    mutationFn: postQaToSlack,
    onError: (err) => {
      console.error('에러발생', err);
    },
  });
};
