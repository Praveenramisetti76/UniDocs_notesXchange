# Google OAuth Setup Guide

This guide will help you set up Google OAuth for signup/login in your UniDocs application.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Enter "UniDocs" as the project name and click "Create"
4. Wait for the project to be created (this may take a minute)

## Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, first configure the OAuth consent screen:
   - Click **Configure Consent Screen**
   - Select **External** as the User Type and click **Create**
   - Fill in the required fields:
     - App name: "UniDocs"
     - User support email: Your email
     - Developer contact: Your email
   - Click **Save and Continue** through the remaining screens
4. Return to Credentials and click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Name it "UniDocs Web Client"
7. Under "Authorized JavaScript origins", add:
   - `http://localhost:5173`
   - `http://localhost:3000`
   - Your production domain (e.g., `https://yourdomain.com`)
8. Under "Authorized redirect URIs", add:
   - `http://localhost:5000/api/auth/google/callback`
   - Your production API URL
9. Click **Create**
10. A dialog will appear with your **Client ID** - copy this

## Step 3: Configure Environment Variables

### Frontend (.env)

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

### Backend (.env)

Create a `.env` file in the `server/` directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

## Step 4: Update Frontend Configuration

The frontend is already set up with Google Sign-In. The `Login.jsx` and `Register.jsx` pages now include Google Sign-In buttons that will automatically appear when you set the `VITE_GOOGLE_CLIENT_ID` environment variable.

## Step 5: Test the Setup

1. Start your backend server:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. In a new terminal, start your frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser
4. Navigate to the Login or Register page
5. You should see a "Sign in with Google" button

## How It Works

- **Frontend**: When a user clicks the Google Sign-In button, Google's JavaScript library handles the authentication and returns a credential token
- **Backend**: The frontend sends this token to `/api/auth/google` endpoint, which:
  - Verifies the token
  - Checks if a user exists with that Google ID
  - If not, creates a new user with the Google ID
  - Returns a JWT token for session management
- **User Data**: The first time a user signs in with Google, their name, email, and profile photo are saved to the database

## Troubleshooting

### "Google Sign-In button not appearing"
- Check that `VITE_GOOGLE_CLIENT_ID` is set correctly in your `.env` file
- Ensure you've restarted the frontend development server after adding the env variable

### "Google Sign-In fails with CORS error"
- Make sure your frontend URL (`http://localhost:5173`) is added to "Authorized JavaScript origins" in Google Cloud Console

### "Token verification fails"
- Verify that your `GOOGLE_CLIENT_ID` is correct in both frontend and backend env files
- Check that the token is being sent correctly from the frontend

## Security Notes

- Never commit your `.env` file with real credentials to version control
- Use different credentials for development and production
- Add your production domain to Google Cloud Console OAuth settings
- Store JWT secrets securely in production (use a secrets manager)
