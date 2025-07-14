# Project1

## Development Setup & Running the App

### Prerequisites
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) installed
- Node.js (LTS version, e.g., v22.17.0)
- Yarn package manager

### Backend Setup
1. **Install the latest LTS version of Node.js using nvm:**
   ```sh
   nvm install --lts
   nvm use --lts
   ```
2. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
3. **Start the backend server:**
   ```sh
   node app.js
   ```
   The backend server will start (e.g., on port 3000).

### Frontend (React) Setup
1. **Navigate to the main `src` directory (not `frontend`):**
   ```sh
   cd ../src
   ```
2. **Install dependencies:**
   ```sh
   yarn
   ```
3. **Start the React development server:**
   ```sh
   yarn start
   ```
   The frontend app will launch, typically available at [http://localhost:3000](http://localhost:3000) or another port if 3000 is in use.
