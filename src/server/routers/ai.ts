import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const openaiRouter = router({
  chatCompletion: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .mutation(async ({ input: { prompt } }) => {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 500,
        temperature: 0.9,
        top_p: 1,
        presence_penalty: 0.6,
        frequency_penalty: 0.0,
        n: 1,
        stream: false,
      });
      const { choices } = response.data;
      const msg = choices[0]?.text?.trim();
      return msg;
    }),
});
