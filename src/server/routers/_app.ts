/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { openaiRouter } from './ai';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  openai: openaiRouter,
  // post: postRouter,
});

export type AppRouter = typeof appRouter;
