# Azure deployment

The repository is prepared to deploy the React frontend to Azure Static Web Apps and the Express gateway to Azure App Service. GitHub Actions deploys each app when changes are pushed to `main`.

## 1. Create the Azure resources

Create:

- An Azure Static Web App for the React frontend.
- A Linux Azure App Service configured for Node.js 20 LTS for the Express gateway.

Set the App Service startup command to `npm start`. The gateway listens on the port provided by Azure and allows browser requests only from origins listed in its `CORS_ORIGIN` application setting. Set that setting to the Static Web App origin, for example `https://<your-app>.azurestaticapps.net`.

## 2. Configure GitHub Actions

In the GitHub repository, add these repository variables:

- `AZURE_WEBAPP_NAME`: the name of the gateway App Service.
- `LOGIN_API_URL`: the absolute URL of the deployed login API endpoint, such as `https://<your-auth-app>.azurewebsites.net/Login/Login`.

Add these repository secrets:

- `AZURE_WEBAPP_PUBLISH_PROFILE`: the App Service publish profile XML.
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: the Static Web App deployment token.

Download the App Service publish profile from its Azure portal **Overview** page. Retrieve the Static Web App deployment token from its **Manage deployment token** page. Do not commit either credential to the repository.

## 3. Deploy

Push the repository to GitHub with the default branch named `main`. The workflows in `.github/workflows` deploy the frontend and gateway independently. You can also start either workflow manually from the GitHub **Actions** tab.

The frontend workflow builds with `REACT_APP_LOGIN_API_URL` set from the `LOGIN_API_URL` repository variable. Update that variable if the login API URL changes.

## Login API requirement

The repository's Express gateway only handles `/api/posts` and `/api/post`; it does not implement `/Login/Login`. The login form therefore requires the separate ASP.NET login API to be deployed and reachable at `LOGIN_API_URL`. Configure that API to allow requests from the Static Web App origin. In local development, the existing `https://localhost:60013/Login/Login` URL remains the fallback.

## Authentication warning

The current frontend stores a simple signed-in flag in browser local storage. This preserves the dashboard across refreshes but is not secure authentication. Before using this app with real accounts or sensitive data, replace the flag with server-validated authentication, such as a secure, HttpOnly session cookie.
