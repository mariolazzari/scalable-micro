# Building Scalable Microservices with TypeScript and Node.js

## Inroduction to microservices

### Microservice

- Runs its own process
- Comunicates through well defined APIs
- Independently deployable
- Has a single responsibility

#### Pros

- Scalability
- Technology flexibility
- Resilience
- Easier maintenance

#### Cons

- Increased operational complexity
- Network latency
- Data consistency
- Service communication and coordination

### Designing

- Single responsibility pronciple
- Data management
- Service communication
- Security
- Monitoring

#### Data management

- Each service should own its data
- Implement database per service pattern
- Use event sourcing

#### Services communication

- Use synchronous communication
- Use asynchronous messaging
- API gateway

#### Security

- Authentication and authorization
- Service to service communication
- Rate limiting and monitoring

#### Deployment and scaling

- Containerization
- Orchestration
- CI/CD pipelines

#### Monitoring

- Distributed tracing
- Centralized logging
- Health checks

### Best practices

- Keep service small and focused
- Mantain service independence
- Design for failure
- Use asynchronous communication

### Common pitfalls to avoid

- Creating too.many small services
- Tight coupling between services
- Implementing distributed transactions
- Neglecting proper service boundaries

### Design patterns for microservices

- Decomposition
  - DDD (Domain driven design)
  - Strangles
  - Sidecar
- Integration
  - Api gateway
  - Aggregator
  - Event driven
- Database
  - Database per service
  - CQRS
  - Saga
- Resiliency
  - Circuit braker
  - Bulkhead
  - Retry
- Security
  - JWT
  - Access token
  - Identity provider

#### Best practices

- Start with clear service boundaries based on business domains
- Choose patterns that match your use case and requirements
- Mantain consistent monitoring and logging

## Developing a microservice

### Advanced API design and protocol selection

- REST
  - Public APIs
  - CRUD operations
  - Caching
- GraphQL
  - Complex data requirements
  - Mobile apps
  - Rapid fronted development
- gRPC
  - Internal microservice communication
  - Real time streming
  - Polyglot enviroments

#### Communication protocols

- HTTP/REST
  - Synchronous request and response
  - Standard HTTP methods
  - JSON or XML payload format
- WebSocket
  - Chat and live streams
  - Bidirectional
  - Persisten connection
- Message Queuing Telemetry Protocol (MQTT)
  - IoT and mobile
  - Lightweight publish-subscrine messaging
  - Efficient for constrained devices and networks
- Advanced Message Queuing Protocol (AMQP)
  - Enterprise-grade messaging protocol
  - Mission critical message handling
  - Queuing, routing reliable delivering
- Apache Kafka
  - Distributed streaming platform
  - Event straming and pipelines
  - High throughtput, fault tollerant
  
### Database strategies

#### Database per service

Props:
- Independent scaling
- Flexibility
- Isolation
- Encapsulation

Cons:
- Consistency
- Complex reporting
- Overhead

Types:
- Sql
- Documents
- Key-value
- Graph

### Saga

- Orchestration
- Rollback
- Sequential

### Event sourcing

- Audit trail
- Past states
- Event driven

### CQRS

- Independent read/write
- Optimized schemas
- Performance

### Synchronous communication

- Direct request - response
- Immediate responses
- Tight coupling
  
#### API gateway

- Reverse proxy
- Routing

### Circuit breaker

- Reverse proxy
- Composition
- States
  - Open
  - Closed
  - Half open

### Asynchronous communication

- Event driven
- Loose coupling
  
#### Event streaming

- Real time
- Scalable
- Historical
- Event sourcing

#### Messages queue

- Delivery
- Buffering
- Decoupling
- Fault tollerance

## Testing, securing and performance

### Error handling

- Network
- Service
- Data
- Timeout

#### Circuit braker

```ts
export class CircuitBraker {
  private failures = 0;
  private treshold = 5;
  private state = "CLOSED";

  async execute(fn: () => Promise<any>) {
    if (this.state === "OPEN") {
      throw new Error("Circuit braker is OPEN");
    }

    try {
      const res = await fn();
      this.failures = 0;
      return res;
    } catch (ex) {
      this.failures++;
      if (this.failures >= this.treshold) {
        this.state = "OPEN";
      }
      throw ex;
    }
  }
}
```

#### Retry

```ts
function retryWithBackoff(
  fn: () => Promise<any>,
  maxRetries: number = 3
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Rethrow the last error after max retries
      }
      const backoffTime = Math.pow(2, attempt) * 100; // Exponential backoff
      console.log(`Retrying in ${backoffTime}ms...`);
      return new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
  throw new Error("Max retries reached without success");
}
```

#### Helth check

```ts
export class HealthCheck {
  private failures = 0;
  private threshold = 5;
  private state: "CLOSED" | "OPEN" = "CLOSED";

  async execute(fn: () => Promise<any>) {
    if (this.state === "OPEN") {
      throw new Error("Health check is OPEN");
    }

    try {
      const res = await fn();
      this.failures = 0;
      return res;
    } catch (ex) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.state = "OPEN";
      }
      throw ex;
    }
  }

  reset() {
    this.failures = 0;
    this.state = "CLOSED";
  }
}
```

### Monitoring and logging

- Detect and diagnose
- Understand performance
- Track user
- Security

### Testing strategies

- Unit
- Integration
- Contract
- End to end
- Chaos
- Performance

### Security

- Authentication and authorization
- API security
- Data security

## Typescript

### Api 

```ts
class Order {
  constructor(
    public id: number,
    public customerName: string,
    public items: string[],
    public totalAmount: number
  ) {}
}

class ApiResponse<T> {
  constructor(
    public status: string,
    public message: string,
    public data: T[]
  ) {}
}
```

### Error

```ts
class ServiceError extends Error {
  constructor(public message: string, public code: number = 500) {
    super(message);
    this.name = "ServiceError";
  }
}

export class ServiceError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
    this.name = "ServiceError";
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response
): Error => {
  if (error instanceof ServiceError) {
    res.status(error.status).json({
      status: "error",
      message: error.message,
    });
  } else {
    console.error("Unexpected error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  return error;
};
```

### Advanced type system

- Literal types
  - Union
  - Intersect
  - Conditional

- Mapped types
  - Indexed
  - Readonly
  - Merging

- Template literal types

### Async patterns

- Promise
- Observable
- Circuit braker
- Saga
- Event

## Scaling

### Scaling

- Horizontal
  - Container orchestration
  - Load balancing
  - Stateless
  
- Vertical
  - Node clustering
  - Caching
  - Database optimizations

### Advanced NodsJS features

#### Worker threads

```ts
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
```

#### Async hooks

```ts
import asyncHooks from "async_hooks";

const hook = asyncHooks
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
```

#### Event emitters

```ts
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
```

#### Stream processing

```ts
import fs from "fs";
import { Transform } from "stream";

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();
    callback(null, upperCaseChunk);
  },
});

const inputStream = fs.createReadStream("input.txt");
const outputStream = fs.createWriteStream( "output.txt");
inputStream
  .pipe(upperCaseTransform)
  .pipe(outputStream)
  .on("finish", () => {
    console.log("File transformation complete.");
  })
  .on("error", error => {
    console.error("Error during file transformation:", error);
  });
```

#### ESM loaders

```ts
export async function loadModule(modulePath) {
  try {
    const module = await import(modulePath);
    return module;
  } catch (error) {
    console.error(`Failed to load module at ${modulePath}:`, error);
    throw error;
  }
}

export async function loadModules(modulePaths) {
  const modules = [];
  for (const path of modulePaths) {
    try {
      const module = await loadModule(path);
      modules.push(module);
    } catch (error) {
      console.error(`Error loading module at ${path}:`, error);
    }
  }
  return modules;
}
```