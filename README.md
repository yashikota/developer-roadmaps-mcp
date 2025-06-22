# Developer Roadmaps MCP Server

A Model Context Protocol (MCP) server that provides access to developer roadmap content from the [roadmap.sh](https://roadmap.sh) repository through the [roadmapsh-txt API](https://roadmapsh-txt.yashikota.workers.dev).  

Deployment URL: <https://developer-roadmaps-mcp.yashikota.workers.dev>  

## Features

This MCP server provides two main tools  

1. **list_roadmaps** `/list` -  List all available developer roadmaps
2. **get_roadmap_content** `/content?name={roadmap_name}` - Fetch detailed Markdown content for specific roadmaps

## Tools

### list_roadmaps

Lists all available developer roadmaps from roadmap.sh.

**Parameters**: None

**Example Response**:

```text
Available roadmaps:
- full-stack
- frontend
- backend
- devops
- ...
```

### get_roadmap_content

Gets the Markdown content for a specific roadmap.

**Parameters**:

- `name` (string, required): Name of the roadmap (e.g., 'full-stack', 'frontend', 'backend', 'devops')

**Example Usage**:

```json
{
  "name": "full-stack"
}
```

**Returns**: The complete Markdown content of the specified roadmap.

## Testing Methods

You can test this MCP server in the following ways:

### 1. Local Development Testing

```bash
# Install dependencies
bun install

# Start the development server
bun run dev
```

The server will be available at `http://localhost:8787/mcp`.

### 2. Testing with Claude Code

Use Claude Code to interact with the MCP server:

```bash
# Connect to local server
claude-code --mcp="http://localhost:8787/mcp"

# Or connect to deployed version
claude-code --mcp="https://developer-roadmaps-mcp.yashikota.workers.dev/mcp"
```

### 3. Testing with curl

You can test the API directly using curl:

```bash
# Test list_roadmaps tool
curl -X POST http://localhost:8787/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "mcp.tool.call",
    "params": {
      "name": "list_roadmaps",
      "args": {}
    }
  }'

# Test get_roadmap_content tool
curl -X POST http://localhost:8787/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "2",
    "method": "mcp.tool.call",
    "params": {
      "name": "get_roadmap_content",
      "args": {"name": "frontend"}
    }
  }'
```

### 4. Testing with any MCP Client

Connect any MCP client to the server endpoint:
- Local: `http://localhost:8787/mcp`
- Production: `https://developer-roadmaps-mcp.yashikota.workers.dev/mcp`

## Usage with MCP Clients

This server can be used with any MCP-compatible client. The server exposes an HTTP endpoint at `/mcp` that handles MCP protocol communication.