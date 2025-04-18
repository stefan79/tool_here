# Tool Here

## Overview

Tool Here is a Map Content Provider (MCP) server that integrates with HERE.com's API for geocoding and geographic searches. This server can be embedded into various AI tools to provide location-based services.

## Features

- **Geocoding**: Convert addresses into geographic coordinates.
- **Discovery**: Search for places and locations based on geographic coordinates and search terms.
- **Rate Limiting**: Protects the server from being overwhelmed by limiting the number of requests.
- **Security**: Utilizes Helmet for setting various HTTP headers for security.

## Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:stefan79/tool_here.git
    cd tool_here
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the following environment variables:

    ```plaintext
    # Server configuration
    PORT=3000                        # Default: 3000
    NODE_ENV=development             # Default: development

    # Rate limiting
    RATE_LIMIT_WINDOW_MS=900000     # Default: 900000 (15 minutes)
    RATE_LIMIT_MAX_REQUESTS=100     # Default: 100

    # HERE API configuration (required)
    HERE_API_KEY=your_here_api_key  # Required
    HERE_BASE_URL=https://geocode.search.hereapi.com/v1      # Optional
    HERE_DISCOVER_URL=https://discover.search.hereapi.com/v1  # Optional
    HERE_ROUTING_URL=https://router.hereapi.com/v8           # Optional
    ```

    > **Note**: Only `HERE_API_KEY` is required. All other variables have default values if not specified.

## Usage

### Running the Server

To start the server, use the following command:

```bash
npm start
```
