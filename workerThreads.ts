import { isMainThread, Worker, parentPort } from "worker_threads";

if (isMainThread) {
  // This is the main thread, we can create worker threads
  const worker = new Worker(__filename);
  worker.on("message", message => {
    console.log("Message from worker:", message);
  });
} else {
  // Simulate some work
  const message = "Hello from the worker thread!";
  parentPort?.postMessage(message);
}
