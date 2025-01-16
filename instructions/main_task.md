**General requirements**

1. Adapt to the current project structure, style, and configurations.
2. While implementing each step, ensure the following:
   If relevant files or functionality already exist in the current project, review and make necessary improvements or updates using best practices to ensure they meet the task requirements and adhere to best practices.
   If certain files or functionality do not yet exist, create them from scratch using best practices, ensuring they are aligned with the project’s architecture, coding standards, and requirements.

3. Use javascript, not typescript because the current project was built based on javascript.
4. Develop detailed error handling for async operations to debug easily.
5. Use modern package for icons and svg if they dont exist in the current workspace.
6. Currently, there is no real database or API route handlers implemented. Simulate the API routes directly in the frontend as placeholders, mimicking the functionality of actual route handlers. Use localstorage to stora data.
7. During development, incorporate guidelines in the nextjs_components_guide.md and nextjs_project_structure_guide.md documents.
8. Write the complete code in the newly created or updated files.

---

**Technical Task for Intern**

**Objective:**

Integrate the API for the admin panel and the "News" page of the website, replacing static data with dynamic data. Implement Create, Read, Update, and Delete (CRUD) functionality via the API in the admin panel, and then connect the data to the "News" page on the website.

**Task Requirements**

**1. Admin Panel**

In the admin panel, you need to:

- **Connect** the API for data management.
- **Implement** functionality for the entity:
  - **News**, including handling photos.
- **Ensure** the ability to:
  - **Create** new records.
  - **Delete** existing records.
  - **Edit** records.
  - **Display** a list of records.

**Technical Details:**

- Use **axios** for API interactions.
- Handle errors, such as API unavailability.
- Ensure that data is sent correctly (validation before sending).

**Specifics of Working with News:**

- Provide the ability to upload and display photos for each news item. Photos should be uploaded to the server via the API.

**UI/UX:**

- Add notifications about the results of operations (e.g., "News successfully deleted", "Error creating news item").

**2. Website**

On the website, you need to:

**"News" Page:**

- **Replace** static data with dynamic data obtained via the API.
- **Implement** the display of a list of news items, including photos and brief descriptions.
- **Add** the ability to navigate to an internal news page, where the following are displayed:
  - Full text of the news item.
  - Photo.
  - Publication date.

**Technical Details:**

- Use **axios** to perform GET requests to the API.
- Handle potential errors during data loading.

**Expected Results**

- A fully functional admin panel with API integration for CRUD operations.
- A dynamic "News" page on the website, with data obtained through the API.
- Clean and readable code, ready for review.

**Task Execution Order**

1.  Implement GET requests for the "News" page on the website, replacing the static data.
2.  Connect all API request types (GET, POST, PUT, DELETE) within the admin panel for managing the "News" entity.
3.  Deploy the completed code to vercel.com (the website with the implemented GET requests and the admin panel with the connected APIs (DELETE, UPDATE, GET, CREATE)). Submit the Vercel links for review and testing.

---

Based on the workspace information, I'll help break down the create and read data implementation for the admin panel task into 5 key steps:

1. Setup Local Storage Data Structure
   Set up a robust data structure in localStorage to simulate the backend API storage for news items, following the project's JavaScript-based architecture.

2. Implement API Service Layer
   Create a service layer to handle CRUD operations, focusing on Create and Read functionalities that interact with localStorage. Use axios for simulating API calls with proper error handling.

3. Update Admin UI Components
   Update the current project components for displaying news list and a form for creating news items, adhering to the existing project structure in the \_components directory.

4. Implement State Management
   Set up state management for the admin panel to handle news data, loading states, and error states while maintaining clean code practices.

5. Add Notification System
   Integrate a notification system to display operation results (success/error messages) for create and read operations as specified in the requirements.

Each step should use JavaScript (not TypeScript) as specified in the general requirements and follow the existing project structure in the app directory.
