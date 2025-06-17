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

