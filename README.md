# TaskFlow — Kanban Task Manager

TaskFlow is a responsive Kanban task management application built with React. It helps users organize, manage, and track their daily tasks using a simple drag-and-drop board.

The application provides an intuitive workspace where users can create tasks, update their details, organize priorities, filter tasks, and monitor their progress.

## Features

### 📋 Task Management

- Create new tasks.
- Edit existing tasks.
- Delete tasks with confirmation.
- Set task descriptions, priorities, categories, and due dates.
- Assign tasks to different workflow stages.

### 🎯 Kanban Board

- Three task columns:
  - To Do
  - In Progress
  - Done

- Drag and drop tasks between columns.
- View tasks according to their current status.

### 🔍 Search, Filter & Sort

- Search tasks by title, description, and category.
- Filter tasks by priority.
- Filter tasks by category.
- Sort tasks by priority, due date, and title.
- Clear active filters and sorting options.

### 📊 Dashboard Statistics

- View total tasks.
- Track completed tasks.
- Monitor task progress through dashboard statistics.

### 💾 Data Persistence

- Automatically save tasks using browser LocalStorage.
- Preserve custom tasks after refreshing the page.

### 🌙 Dark & Light Mode

- Switch between dark and light themes.
- Toggle themes directly from the dashboard header.
- Theme-aware interface across application components.

### 🔔 User Feedback

- Success and error toast notifications.
- Custom confirmation dialog before deleting tasks.

### 📱 Responsive Design

- Mobile-friendly dashboard.
- Responsive header and sidebar.
- Horizontally scrollable Kanban board on smaller screens.
- Responsive task cards and modals.
- Optimized layouts for mobile, tablet, and desktop.

## Tech Stack

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| React         | Building the user interface       |
| Vite          | Development server and build tool |
| Tailwind CSS  | Styling and responsive layouts    |
| JavaScript    | Application logic                 |
| @dnd-kit/core | Drag-and-drop functionality       |
| React Icons   | Interface icons                   |
| LocalStorage  | Client-side data persistence      |

## Project Structure

```text
taskflow/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Toast.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── context/
│   │   └── TaskContext.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── data/
│   │   └── initialTasks.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── vite.config.js
```

_Note: Adjust the folder structure above if your actual project directories differ._

## Getting Started

Follow these steps to run TaskFlow locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd TaskFlow
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access TaskFlow.

## How It Works

1. Create tasks using the Create Task button.
2. Add task details such as title, description, priority, category, and due date.
3. Organize tasks into To Do, In Progress, and Done columns.
4. Drag and drop tasks to update their status.
5. Use search, filters, and sorting to find specific tasks.
6. Switch between dark and light themes.
7. Track your progress through dashboard statistics.

## Data Storage

TaskFlow uses browser LocalStorage to persist user-created tasks.

No backend or database is required. Tasks are stored locally in the browser, so data is specific to the browser and device being used.

## Future Improvements

- User authentication.
- Backend integration.
- Cloud-based task synchronization.
- Team collaboration.
- Task comments and activity history.

## Author

**Om Sonawane**

---

⭐ If you find this project useful, consider giving it a star!
