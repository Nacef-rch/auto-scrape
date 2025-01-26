# 🚀 **Automation Workflow for Web Scraping**

This project is an automation application inspired by platforms like **Zapier** and **n8n**, designed specifically for automating data scraping workflows from web applications. The primary goal of this project is to explore the concepts of automation algorithms and how workflows are executed, with a focus on data extraction and processing.

---

## 🛠️ **Project Architecture**

This project uses **Turborepo** to implement a monorepo architecture, ensuring code sharing and consistency across different parts of the system.

### **Core Technologies**
- 🌐 **Next.js**: Provides server-side rendering and routing for the web application.
- ⚛️ **React**: Used for building reusable and interactive UI components.
- 🗄️ **Prisma**: An ORM used for managing database schema and migrations, integrated with **PL/SQL** for complex database operations.
- 🤖 **Puppeteer**: Enables headless browser automation for web scraping.
- 🖼️ **React Flow**: Used to design and visualize workflows as interactive graphs.
- ⚡ **useQuery**: For efficient caching and state management.
- & more .....

---

## 🧰 **Development Tools**

To maintain code quality, consistency, and streamline workflows, the project incorporates several development tools:

- 🎨 **Prettier**: Ensures consistent code formatting for a clean and readable codebase.
- 🔍 **ESLint**: Provides static code analysis to catch issues early and enforce coding standards.
- 🪝 **Husky**: Automates Git hooks to enforce pre-commit and pre-push checks, ensuring only validated code is committed.
- 📝 **Commitlint**: Enforces a consistent commit message format to maintain clear and meaningful version history.
- 📂 **Lint-Staged**: Runs linting on staged files, improving efficiency during the commit process.

These tools enhance developer productivity and ensure adherence to best practices, resulting in a high-quality and maintainable codebase.

---

## 🏗️ **Delving into the Builder App**

In the **apps** folder, the **Builder** app is the core of the project, containing all the logic for automation and web scraping. The app follows a **feature-based architecture** to ensure modularity, scalability, and code reusability.

### 🔄 **Project-Level Sharables**
The Builder app includes several shared folders at the project level, containing reusable logic and resources that can be accessed across multiple features. Some examples include:
- 🧩 **Components**: Shared UI components such as buttons, modals, and tables used throughout the app.
- 🛠️ **Libs**: Contains core automation logic, including reusable functions for workflow execution and scraping utilities.
- 🔗 **Hooks**: Custom React hooks for shared logic, such as data fetching or managing state.
- 🎨 **Core**: Handles the global theme, application-wide providers, and configuration management.
- 📄 **Types**: Common TypeScript definitions shared across features, ensuring strong typing and consistency.

These project-level sharables ensure common functionality is centralized, reducing duplication and maintaining a consistent codebase.

### 📂 **Feature-Level Organization**
Each feature in the app is self-contained within its own folder, with its own scope-specific structure. For example:
- 💰 **Billing**: Manages all logic and UI related to billing workflows, with scoped **components**, **types**, and utilities specific to billing functionality.
- 🔑 **User-Credentials**: Focused on managing user API keys, providing scoped logic and UI components for secure storage and management of keys.

This organization keeps features isolated, improving the code's maintainability and scalability.

### 🎨 **Container/Presenter Pattern**
The Builder app adopts the **Container/Presenter** pattern to separate business logic from UI:
- **Presenters (Dumb Components)**: 🖼️ Focus solely on rendering the UI, such as displaying workflow graphs or forms. They are stateless, reusable, and receive data and actions via props.
- **Containers**: 🧠 Handle the logic behind the scenes, including data fetching, state management, and orchestration of business logic. Containers pass processed data and callbacks to presenters, ensuring a clear separation of concerns.

---

## 🌟 **Enhancements and Future Possibilities**

- 🌍 **Landing Page Application**: Create a dedicated landing page focused on SEO optimization to improve visibility and attract more users.  
- 🔧 **Backend Application**: Develop a separate backend app to handle cron jobs, scheduled tasks, and webhooks efficiently.  
- ✅ **Testing Suite**: Implement comprehensive testing, including unit tests and end-to-end tests with Cypress, to ensure reliability and maintainability.  
- 🌐 **Internationalization (I18N)**: Add support for multiple languages to make the application accessible to a global audience.  
- 🐳 **Dockerization**: Containerize the application with Docker to streamline deployment and ensure consistency across environments.  
- 🤖 **Expanded Automation Capabilities**:
  - 📧 **Email Sending**
  - 📁 **File Processing**
  - 🗄️ **Database Operations**
  - & more .....

- 🚀 **Future Potential**: Continue exploring new integrations, features, and improvements to enhance automation capabilities.

