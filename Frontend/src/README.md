<<<<<<< HEAD

# BlockJava

**BlockJava** is a gamified, interactive coding platform built with **React TSX**, **Google Blockly**, **Spring Boot**, and **PostgreSQL**. Users can drag-and-drop JavaScript blocks to complete **50+ coding tasks**, earn **points and XP**, and track their progress on a **real-time leaderboard**. It combines visual programming, gamification, and a robust backend for a fun and educational experience.

---

## Features

- **Google Authentication** – Secure sign-in, account management, and password recovery.  
- **Blockly-Based Coding** – Drag-and-drop JavaScript blocks for beginner-friendly, interactive learning.  
- **Task Management** – Create, save, delete, and complete tasks; earn points and XP.  
- **Leaderboard & Dashboard** – Track daily progress, visualize achievements, and compete with others.  
- **Interactive Sprites** – Multiple sprites with tools like Hatbox to assist task completion.  
- **Account Controls** – Change username, password, or reset forgotten password.  
- **Real-Time Feedback** – Code execution and task updates are visible instantly.  

---

## Tech Stack

- **Frontend:** React TSX, Google Blockly, TypeScript, JavaScript  
- **Backend:** Spring Boot, Java, PostgreSQL  
- **Authentication:** Google Sign-In  
- **Others:** Node.js, NPM  

---

## Architecture Diagram

```

[React TSX Frontend] ---> [Spring Boot Backend] ---> [PostgreSQL Database]
|                                     |
|--- Google Blockly (visual coding) --|
|--- Google Sign-In authentication ---|

````

---

## Installation

### Backend (Spring Boot)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/blockjava.git
cd blockjava/backend
````

2. **Build and run**

```bash
./mvnw spring-boot:run
```

* Backend will run on `import.meta.env.VITE_API_BASE_URL`.

### Frontend (React TSX)

1. **Navigate to frontend**

```bash
cd ../frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the frontend**

```bash
npm start
```

* Frontend will run on `http://localhost:8000`.

---

## Usage

1. Sign in with your **Google account**.
2. Drag-and-drop code blocks using **Google Blockly** to solve tasks.
3. Complete tasks to earn **XP** and points.
4. Track your daily progress on the **dashboard**.
5. Compete with others on the **leaderboard**.
6. Manage account settings, including changing username/password or resetting forgotten passwords.

---

## Screenshots

*Add screenshots here to showcase tasks, Blockly interface, sprites, dashboard, and leaderboard.*

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit (`git commit -m "Add feature"`)
5. Push (`git push origin feature-name`)
6. Create a Pull Request

---

## License

MIT License © 2026 – Kanishka

---

## Contact

For questions or suggestions, reach out to **[kanishkag203@gmail.com](mailto:your-email@example.com)**.


```
=======
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
>>>>>>> 3ef92f9 (initial Commit Frontend)
