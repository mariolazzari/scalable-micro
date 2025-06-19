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