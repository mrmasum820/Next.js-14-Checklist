### What is Next.js?

It uses React for building user interfaces.

Provides additional features that enable us to build production-ready applications.

These features include routing, optimized rendering, data fetching, bundling, compiling, authentication and more.

We don’t need to install additional packages as Next.js provides everything us need.

Opinions and conventions should be followed to implement these features.

Next.js is a React framework for building web applications.

### Why Next.js?

Next.js simplifies the process of building a web application for production.

1. Routing
2. API routes
3. Rendering
4. Data fetching
5. Styling
6. Optimization
7. Dev and prod build system

### React Server Components(RSC)

React Server Components is a new architecture introduced by the React team in version 18 which was quickly embraced by Next.js

The architecture introduces a new way of creating React components, splitting them into two types.

1. **Server components**
   1. In next.js, all components are Server components by default.
   2. They have the ability to run tasks like reading files or fetching data from a database.
   3. However, they don’t have the ability to use hooks or handle user interactions.
2. **Client components**
   1. To create a Client component, It’s necessary to add “use client” at the top of the component file.
   2. Client components can’t perform tasks like reading files, but they have the ability to use hooks and manage interactions.
