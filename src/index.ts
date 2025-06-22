import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPTransport } from "@hono/mcp"
import { Hono } from "hono"

const app = new Hono()

const API_BASE_URL = "https://roadmapsh-txt.yashikota.workers.dev"

// Helper function to fetch data from roadmapsh-txt API
async function fetchFromAPI(endpoint: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Helper function to fetch text content from roadmapsh-txt API
async function fetchTextFromAPI(endpoint: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }
  return response.text()
}

const mcpServer = new McpServer({
  name: "developer-roadmaps-mcp-server",
  version: "1.0.0",
})

// Add tool handlers
mcpServer.tool("list_roadmaps", "List all available developer roadmaps from roadmap.sh", {
  type: "object",
  properties: {},
}, async () => {
  try {
    const roadmaps = await fetchFromAPI("/list")
    return {
      content: [
        {
          type: "text",
          text: `Available roadmaps:\n${roadmaps.map((roadmap: string) => `- ${roadmap}`).join('\n')}`,
        },
      ],
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
})

mcpServer.tool("get_roadmap_content", "Get the Markdown content for a specific roadmap", {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Name of the roadmap (e.g., 'full-stack', 'frontend', 'backend', 'devops')",
    },
  },
  required: ["name"],
}, async (args) => {
  try {
    if (!args || typeof args.name !== "string") {
      throw new Error("Missing required parameter: name")
    }

    const content = await fetchTextFromAPI(`/content?name=${encodeURIComponent(args.name)}`)
    return {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
})

app.all("/", async (c) => {
  const transport = new StreamableHTTPTransport()
  await mcpServer.connect(transport)
  return transport.handleRequest(c)
})

export default app
