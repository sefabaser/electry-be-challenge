# Wookie Bookstore

## Objective

Your assignment is to implement a bookstore REST API using Node and Nest.

## Brief

Lohgarra, a Wookie from Kashyyyk, has a great idea. She wants to build a marketplace that allows her and her friends to
self-publish their adventures and sell them online to other Wookies. The profits would then be collected and donated to purchase
medical supplies for an impoverished Ewok settlement.

## Tasks

- Implement a REST API returning JSON or XML based on the `Content-Type` header
- Implement a custom user model with a "author pseudonym" field
- Implement a book model. Each book should have a title, description, author (your custom user model), cover image and price
  - Choose the data type for each field that makes the most sense
- Provide an endpoint to authenticate with the API using username, password and return a JWT
- Implement REST endpoints for the `/books` resource
  - No authentication required
  - Allows only GET (List/Detail) operations
  - Make the List resource searchable with query parameters
- Provide REST resources for the authenticated user
  - Implement the typical CRUD operations for this resource
  - Implement an endpoint to unpublish a book (DELETE)

### Implementation

You should write tests for business logic.
You are expected to design any other required models and routes for your API.

- Language: **Node** and **Typescript**
- Framework: [**NestJS**](https://nestjs.com/) or [**Express**](https://expressjs.com/de/)

Everything else is up to you.

## Evaluation Criteria

- *Node* best practices
- Follow *NestJS* or *Express* best practices for models, configuration and tests
- Write API tests for all implemented endpoints
- Make sure that users may only unpublish their own books
- Bonus: Make sure the user _Darth Vader_ is unable to publish his work on Wookie Books

### Tips

- Implement the features one-by-one. Completed features, well-tested and written in clean code are better than half-baked solutions.
- If you don't manage to fully implement everything, don't worry too much. Architecture and code style is more important.
