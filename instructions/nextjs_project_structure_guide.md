I'll create a comprehensive guide for Next.js App Router project structure based on the latest best practices.

# Next.js App Router Project Structure Guide

## 1. Root Directory Structure

```plaintext
project-root/
├── app/                   # App Router directory
├── components/            # React components
├── lib/                   # Utility functions and libraries
├── hooks/                # Custom React hooks
├── config/               # Configuration files
├── public/               # Static assets
├── styles/               # Global styles and CSS modules
├── middleware.js         # Next.js middleware
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Project dependencies and scripts
```

## 2. App Directory Structure

```plaintext
app/
├── (auth)/                # Auth route group
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   └── layout.js
├── (dashboard)/           # Dashboard route group
│   ├── overview/
│   │   └── page.js
│   ├── settings/
│   │   └── page.js
│   └── layout.js
├── api/                   # API routes
│   ├── auth/
│   │   └── route.js
│   └── users/
│       └── route.js
├── error.js              # Global error page
├── loading.js            # Global loading page
├── not-found.js         # 404 page
├── layout.js            # Root layout
└── page.js              # Home page
```

## 3. Components Directory Structure

```plaintext
components/
├── common/               # Reusable components
│   ├── Button/
│   │   ├── index.js
│   │   └── Button.module.css
│   ├── Input/
│   │   └── index.js
│   └── Card/
│       └── index.js
├── features/            # Feature-specific components
│   ├── dashboard/
│   │   ├── DashboardStats.js
│   │   └── DashboardChart.js
│   └── auth/
│       ├── LoginForm.js
│       └── RegisterForm.js
├── layouts/             # Layout components
│   ├── Header/
│   │   └── index.js
│   ├── Footer/
│   │   └── index.js
│   └── Sidebar/
│       └── index.js
└── ui/                 # UI components
    ├── Modal/
    │   └── index.js
    └── Toast/
        └── index.js
```

## 4. Implementation Examples

### Root Layout

```javascript
// app/layout.js
import { Providers } from "@/components/providers";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export const metadata = {
  title: {
    template: "%s | Your App",
    default: "Your App",
  },
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

### Feature Component Structure

```javascript
// components/features/dashboard/DashboardStats.js
export default function DashboardStats({ data }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Stats components */}
    </div>
  );
}

// components/features/auth/LoginForm.js
'use client';

export default function LoginForm() {
  const handleSubmit = async (e) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## 5. Utility and Configuration Files

### Lib Directory Structure

```plaintext
lib/
├── api/
│   ├── auth.js
│   └── users.js
├── utils/
│   ├── formatting.js
│   └── validation.js
├── constants/
│   └── index.js
└── db/
    └── index.js
```

### Configuration Files

```javascript
// config/site.js
export const siteConfig = {
  name: "Your App",
  description: "Your app description",
  urls: {
    github: "https://github.com/your-repo",
    twitter: "https://twitter.com/your-account",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
  ],
};

// lib/utils/api.js
export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return response.json();
}
```

## 6. Hooks Directory

```plaintext
hooks/
├── auth/
│   ├── useAuth.js
│   └── useUser.js
├── data/
│   ├── useQuery.js
│   └── useMutation.js
└── ui/
    ├── useModal.js
    └── useToast.js
```

## 7. API Routes Structure

```plaintext
app/api/
├── auth/
│   ├── login/
│   │   └── route.js
│   └── register/
│       └── route.js
├── users/
│   ├── route.js
│   └── [id]/
│       └── route.js
└── posts/
    ├── route.js
    └── [slug]/
        └── route.js
```

## 8. Styles Organization

```plaintext
styles/
├── globals.css
├── components/
│   ├── button.css
│   └── form.css
└── utils/
    ├── animations.css
    └── typography.css
```

## 9. Public Directory Structure

```plaintext
public/
├── images/
│   ├── logos/
│   ├── icons/
│   └── backgrounds/
├── fonts/
└── locales/
    ├── en/
    └── es/
```

## 10. Example Component Implementation

### Common Component

```javascript
// components/common/Button/index.js
export default function Button({
  variant = "primary",
  size = "medium",
  children,
  ...props
}) {
  const baseStyles = "rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };
  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 11. Feature Module Structure

```plaintext
features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types.ts
├── dashboard/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types.ts
└── users/
    ├── components/
    ├── hooks/
    ├── utils/
    └── types.ts
```

## 12. Best Practices

1. **File Organization**

   - Group related files together
   - Use feature-based organization
   - Keep components small and focused
   - Implement proper separation of concerns

2. **Naming Conventions**

   - Use PascalCase for components
   - Use camelCase for functions and variables
   - Use kebab-case for CSS classes
   - Use descriptive, meaningful names

3. **Code Organization**

   - Implement proper error boundaries
   - Use loading states effectively
   - Keep business logic separate from UI
   - Use proper type definitions

4. **Performance Considerations**

   - Implement code splitting
   - Use proper caching strategies
   - Optimize images and assets
   - Implement proper lazy loading

5. **Security Best Practices**
   - Implement proper authentication
   - Use environment variables
   - Validate user input
   - Implement proper CORS policies

This structure provides a scalable and maintainable foundation for Next.js applications while following modern best practices and conventions. Adjust the structure based on your specific project needs while maintaining clean architecture principles.
