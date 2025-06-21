import asyncHooks from "async_hooks";

export const hook = asyncHooks
  .createHook({
    init(asyncId, type, triggerAsyncId, resource) {
      console.log(
        `Async Hook Init: ${asyncId}, Type: ${type}, Trigger Async ID: ${triggerAsyncId}`
      );
    },
    destroy(asyncId) {
      console.log(`Async Hook Destroy: ${asyncId}`);
    },
  })
  .enable();
