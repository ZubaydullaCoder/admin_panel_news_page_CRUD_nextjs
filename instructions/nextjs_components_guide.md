I'll create a comprehensive guide for creating and organizing components in Next.js App Router, covering different types of components and best practices.

# Next.js App Router Components Guide

## 1. Component Types

### 1.1 Server Components (Default)

```jsx
// app/components/ServerComponent.js
async function ServerComponent() {
  const data = await fetchData(); // Direct database or API calls

  return (
    <div className="server-component">
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default ServerComponent;
```

### 1.2 Client Components

```jsx
"use client";

// app/components/ClientComponent.js
import { useState, useEffect } from "react";

function ClientComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Client-side effects
  }, []);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

export default ClientComponent;
```

### 1.3 Hybrid Components Pattern

```jsx
// app/components/HybridPattern/ServerPart.js
async function ServerPart() {
  const data = await fetchServerData();
  return { data };
}

// app/components/HybridPattern/ClientPart.js
("use client");

function ClientPart({ data }) {
  const [state, setState] = useState(data);
  return <div>{/* Interactive UI */}</div>;
}

// app/components/HybridPattern/index.js
async function HybridComponent() {
  const { data } = await ServerPart();
  return <ClientPart data={data} />;
}
```

## 2. Component Organization

### 2.1 Atomic Design Structure

```jsx
// components/atoms/Button/index.js
"use client";

export function Button({ children, variant = "primary", ...props }) {
  const baseStyles = "px-4 py-2 rounded-md font-medium";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

// components/molecules/SearchBar/index.js
("use client");

import { Button } from "@/components/atoms/Button";

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-md px-4 py-2"
      />
      <Button onClick={() => onSearch(query)}>Search</Button>
    </div>
  );
}

// components/organisms/Header/index.js
import { SearchBar } from "@/components/molecules/SearchBar";
import { Navigation } from "@/components/molecules/Navigation";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Navigation />
      <SearchBar onSearch={handleSearch} />
    </header>
  );
}
```

### 2.2 Feature-based Components

```jsx
// components/features/auth/LoginForm.js
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/atoms/Button";

export function LoginForm() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
  );
}

// components/features/users/UserProfile/index.js
import { ProfileHeader } from "./ProfileHeader";
import { ProfileContent } from "./ProfileContent";
import { ProfileActions } from "./ProfileActions";

export function UserProfile({ user }) {
  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
      <ProfileActions user={user} />
    </div>
  );
}
```

## 3. Reusable Components

### 3.1 Higher-Order Components

```jsx
// components/hoc/withAuth.js
"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      redirect("/login");
      return null;
    }

    return <Component {...props} />;
  };
}
```

### 3.2 Compound Components

```jsx
// components/common/Tabs/index.js
"use client";

import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }) {
  return <div className="flex gap-2 border-b">{children}</div>;
};

Tabs.Tab = function Tab({ children, value }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 ${
        activeTab === value ? "border-b-2 border-blue-500" : ""
      }`}
    >
      {children}
    </button>
  );
};

Tabs.Panels = function TabsPanels({ children }) {
  return <div className="mt-4">{children}</div>;
};

Tabs.Panel = function TabPanel({ children, value }) {
  const { activeTab } = useContext(TabsContext);

  if (value !== activeTab) return null;

  return <div>{children}</div>;
};

// Usage
function TabsExample() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

## 4. Layout Components

### 4.1 Page Layout

```jsx
// app/components/layouts/PageLayout.js
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Sidebar } from "@/components/organisms/Sidebar";

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
```

### 4.2 Grid Layout Components

```jsx
// components/layouts/Grid.js
export function Grid({ children, cols = 1, gap = 4, className = "" }) {
  return (
    <div className={`grid grid-cols-${cols} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}

// components/layouts/Container.js
export function Container({ children, size = "default", className = "" }) {
  const sizes = {
    small: "max-w-3xl",
    default: "max-w-5xl",
    large: "max-w-7xl",
  };

  return (
    <div className={`mx-auto px-4 ${sizes[size]} ${className}`}>{children}</div>
  );
}
```

## 5. Error Boundaries

```jsx
// components/error-boundary/ErrorBoundary.js
"use client";

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 6. Loading and Skeleton Components

```jsx
// components/common/Skeleton.js
export function Skeleton({ width, height, className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    />
  );
}

// components/features/users/UserCardSkeleton.js
export function UserCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg">
      <Skeleton width="100px" height="100px" className="rounded-full mb-4" />
      <Skeleton width="200px" height="20px" className="mb-2" />
      <Skeleton width="150px" height="16px" />
    </div>
  );
}
```

## 7. Component Best Practices

### 7.1 Props Pattern

```jsx
// components/common/Card/index.js
export function Card({
  title,
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) {
  const variants = {
    default: "bg-white border",
    elevated: "bg-white shadow-lg",
    outlined: "border-2",
  };

  return (
    <div
      className={`
        rounded-lg p-4 
        ${variants[variant]}
        ${className}
        ${onClick ? "cursor-pointer" : ""}
      `}
      onClick={onClick}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
}
```

### 7.2 Component Documentation

````jsx
// components/common/Modal/index.js
/**
 * Modal component that provides a customizable dialog overlay.
 *
 * @component
 * @example
 * ```jsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Example Modal"
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * ```
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Callback function when modal is closed
 * @param {string} [props.title] - Optional title for the modal
 * @param {ReactNode} props.children - Content to be rendered inside the modal
 */
"use client";

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose}>&times;</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
````

This guide covers the essential patterns and practices for building components in Next.js App Router. Remember to:

- Use Server Components by default
- Convert to Client Components only when needed
- Maintain a clear component hierarchy
- Follow consistent naming conventions
- Implement proper error boundaries
- Use proper TypeScript types when applicable
- Write comprehensive documentation
- Keep components focused and maintainable
- Implement proper loading states
- Use proper prop validation
- Follow accessibility guidelines

These patterns will help you build scalable and maintainable components in your Next.js application.
