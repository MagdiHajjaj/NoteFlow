# Full Stack Note Management System with User Login 

This project is a **Full Stack Note Management System** that allows users to create, update, delete, and view notes. It includes user authentication (login/signup) and is built using **Django** for the backend and **React** for the frontend.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **CRUD Operations**: Users can create, read, update, and delete their notes.
- **Responsive UI**: The frontend is built with React and is mobile-friendly.
- **Backend**: Built with Django, providing a REST API for handling user and note data.
- **Database**: SQLite is used for storing user data and notes.

## Tech Stack

- **Frontend**: 
  - React
  - Vite (for faster development and bundling)
  - Axios (for making API requests)

- **Backend**: 
  - Django
  - Django REST Framework (DRF)
  - SQLite (for database)

## Installation

### Prerequisites

Before starting, ensure that you have the following installed:

- **Node.js** (for frontend)
- **Python** (for backend)
- **pip** (for managing Python packages)
- **git** (for version control)

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/MagdiHajjaj/NoteFlow.git
cd NoteFlow
```
### 2. Set up the backend (Django)
Navigate to the Backend - Django Noteflow folder:
```bash
"Backend - Django Noteflow"
```
Create a virtual environment and activate it:

On Windows:
```bash
python -m venv notes_env
.\notes_env\Scripts\activate
```
On macOS/Linux:
```bash
python3 -m venv notes_env
source notes_env/bin/activate
```
Install the required dependencies:
```bash
pip install -r requirements.txt
```
Apply migrations to set up the database:
```bash
python manage.py migrate
```
Create a superuser for admin access:
```bash
python manage.py createsuperuser
```
Run the development server:
```bash
python manage.py runserver
```
The Django backend will now be running at http://127.0.0.1:8000.

### 3. Set up the frontend (React)
Navigate to the Frontend - React Noteflow folder:
```bash
cd "../Frontend - React Noteflow"
```
### 4. Set up the frontend (React)
Before running the frontend, you need to create a .env file to configure the API URL for the backend.
### On Windows:
1. Open Notepad or any text editor.
2. Create a new file and save it as .env in the Frontend - React Noteflow folder.
    
    You can create this file manually or by running:
    ```bash
    echo VITE_API_URL="http://127.0.0.1:8000" > .env
    ```
### On macOS/Linux:
1. Open a terminal window.
2. Navigate to the `Frontend - React Noteflow` folder.
3. Run the following command to create the `.env` file:
    ```bash
    touch .env
    ```
4. Open the `.env` file in a text editor (e.g., VS Code, nano, or any other editor) and add the following line:
    ```bash
    VITE_API_URL="http://127.0.0.1:8000"
    ```
### 5. Install the necessary frontend dependencies
Install the necessary frontend dependencies:
```bash
npm install
```
### 6. Start the frontend development server
Start the development server:
```bash
npm run dev
```
The React frontend will now be running at http://localhost:3000.
### 7. Access the Application
The frontend React app should now be accessible at http://localhost:3000.
The backend Django API will be accessible at http://127.0.0.1:8000.
You can interact with the API via the frontend interface or directly through endpoints such as /api/notes/ for managing notes.
### File Structure
```bash
NoteFlow/
├── Backend - Django Noteflow/
│   ├── manage.py
│   ├── backend/
│   ├── db.sqlite3
│   ├── notes_env/  (your virtual environment folder)
│   └── requirements.txt
│
├── Frontend - React Noteflow/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2024 Magdi Hajjaj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
