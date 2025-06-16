# 🌌 ZeroGravityZone Blog

ZeroGravityZone is a modern, responsive blog platform tailored for space and astronomy lovers. Built with React and Material UI, the project allows users to explore, share, and manage blog posts with smooth animations and interactive UI.

## 🚀 Features

* 🔐 User Authentication (Sign Up / Log In)
* 📝 Create, Edit, and Delete Blog Posts
* 🧾 Post Preview Dialogs
* 🎨 Animated Components (Circular Text, Orb Background)
* 🧠 Context API for Global State Management
* 📱 Responsive UI built with Material UI (MUI)

## 📁 Project Structure

```
/public
/src
  ├── Animation
  │   ├── CircularText.jsx / .css
  │   ├── OrbBackground.jsx / orb.css
  ├── assets
  ├── components
  │   ├── About.jsx
  │   ├── HeroSection.jsx
  │   ├── HomePage.jsx / HomeById.jsx
  │   ├── LoginPage.jsx / SignupPage.jsx
  │   ├── NavBar.jsx / ProfilePage.jsx
  │   ├── Posts.jsx / PostFormDialog.jsx
  ├── context
  │   ├── AuthContext.jsx
  │   ├── PostContext.jsx
  ├── App.jsx
  ├── main.jsx
db.json (Mock backend with JSON Server)
```

## 🛠️ Tech Stack

* **Frontend**: React, MUI (Material UI), SCSS/CSS
* **State Management**: React Context API
* **Animations**: Custom CSS, Orb Effects
* **Backend (Mock)**: `json-server`, `json-server-auth`

## 📦 Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* json-server (`npm install -g json-server`)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/zerogravityzone.git
cd zerogravityzone
```

2. Install dependencies:

```bash
npm install
```

3. Start JSON Server:

```bash
json-server --watch db.json --port 3001
```

4. Start the React app:

```bash
npm run dev
```

## 🔒 Authentication

User authentication is handled through `json-server-auth` using email and password. Protected routes are accessible only when authenticated.

## ✨ Upcoming Features

* Dark mode toggle
* Comments system
* Blog categories and filtering
* Pagination
* Firebase integration (optional future backend)

## 👨‍🚀 Author

**Asmaa Khaled**
Biotech-turned-Developer passionate about space, UI design, and building web apps.


