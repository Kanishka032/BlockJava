
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

* Backend will run on `http://localhost:8082`.

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

