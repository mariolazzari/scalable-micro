import EventEmitter from "events";

type Job = {
  id: string;
  data: string;
};

export class JobProcessor extends EventEmitter {
  constructor() {
    super();
  }

  process(job: Job) {
    this.emit("processing", job);
    this.emit("completed", job);
  }
}

const processor = new JobProcessor();
processor.on("processing", (job: Job) => {
  console.log(`Job processing: ${job.id}, Data: ${job.data}`);
});

processor.on("completed", (job: Job) => {
  console.log(`Job completed: ${job.id}`);
});
