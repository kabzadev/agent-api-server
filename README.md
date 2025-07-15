# Agent API Server

A simple Express API server that simulates SharePoint and Dataverse responses for Copilot Studio integration demos.

## Features

- Mock SharePoint document search
- Mock Dataverse customer data queries
- CORS enabled for cross-origin requests
- Ready for Azure App Service deployment

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3001

## API Endpoints

### Health Check
- **GET** `/`
- Returns server status

### Chat Endpoint
- **POST** `/api/chat`
- Body: `{ "message": "your query" }`
- Returns: `{ "response": "text response", "data": { ... } }`

### Example Queries
- "Show me SharePoint documents" - Returns mock document list
- "Get customer data from Dataverse" - Returns mock customer records

## Azure Deployment

### Prerequisites
1. Azure subscription
2. Azure CLI installed
3. GitHub repository created

### Setup Steps

1. **Create Azure App Service**:
   ```bash
   # Login to Azure
   az login

   # Create resource group
   az group create --name myResourceGroup --location eastus

   # Create App Service plan
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux

   # Create Web App
   az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name agent-api-server --runtime "NODE:18-lts"
   ```

2. **Get Publish Profile**:
   ```bash
   az webapp deployment list-publishing-profiles --name agent-api-server --resource-group myResourceGroup --xml > publish-profile.xml
   ```

3. **Add GitHub Secret**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Create new secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Copy entire content of `publish-profile.xml` as the value
   - Delete `publish-profile.xml` file locally for security

4. **Update GitHub Action**:
   - Edit `.github/workflows/azure-deploy.yml`
   - Change `AZURE_WEBAPP_NAME` to match your app name

5. **Deploy**:
   - Push to main branch
   - GitHub Action will automatically deploy

### Post-Deployment

Your API will be available at: `https://agent-api-server.azurewebsites.net`

Update your Copilot Studio connector and React app to use this URL.

## Environment Variables

For production, you can set these in Azure App Service Configuration:
- `PORT` - Automatically set by Azure
- Add any additional config as needed

## Copilot Studio Integration

1. Import the OpenAPI spec (`agent-api-openapi.yaml`) into Copilot Studio
2. Update the server URL to your Azure endpoint
3. Use the custom action in your agent's conversation flow