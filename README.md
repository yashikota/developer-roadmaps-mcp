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

### 4. Testing with any MCP Client

Connect any MCP client to the server endpoint:
- Local: `http://localhost:8787/mcp`
- Production: `https://developer-roadmaps-mcp.yashikota.workers.dev/mcp`

## Usage with MCP Clients

This server can be used with any MCP-compatible client. The server exposes an HTTP endpoint at `/mcp` that handles MCP protocol communication.
