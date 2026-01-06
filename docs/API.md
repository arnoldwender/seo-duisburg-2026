# API Documentation

## Overview

This document describes the API endpoints and data structures used in this project.

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## Authentication

If your project requires authentication, describe it here:

```typescript
// Example: Bearer token authentication
headers: {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}
```

## Endpoints

### Example Endpoint

**GET /api/example**

Description: Fetch example data

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | number | No | Number of items to return (default: 10) |
| offset | number | No | Pagination offset (default: 0) |

**Response:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Example",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

**Example Request:**

```typescript
const response = await fetch('/api/example?limit=10&offset=0');
const data = await response.json();
```

## Data Models

### Example Model

```typescript
interface Example {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

**Common Error Codes:**

| Code | Status | Description |
|------|--------|-------------|
| INVALID_REQUEST | 400 | Request parameters are invalid |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| SERVER_ERROR | 500 | Internal server error |

## Rate Limiting

API requests are limited to:

- 100 requests per minute per IP
- 1000 requests per hour per user

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

## Pagination

List endpoints support pagination using `limit` and `offset` parameters:

```
GET /api/items?limit=20&offset=40
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}
```

## Versioning

API version is included in the base URL:

```
/api/v1/endpoint
```

## Best Practices

- Always check HTTP status codes
- Handle errors gracefully
- Implement retry logic for transient failures
- Cache responses when appropriate
- Use pagination for large datasets

## Code Examples

### Fetch Data

```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/example');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### Post Data

```typescript
async function createItem(item: Example) {
  try {
    const response = await fetch('/api/example', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create item:', error);
    throw error;
  }
}
```

## Testing

Test your API calls using:

- Postman
- curl
- Automated tests in `tests/` directory

## Support

For API questions or issues, please open an issue on GitHub.
