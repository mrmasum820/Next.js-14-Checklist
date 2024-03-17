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

## Routing

Next.js has file-system based routing mechanism.

URL paths that users can access in the browser are defined by files and folders in our codebase.

### Routing conventions

All routes must be placed inside the app folder.

Every file that corresponds to a route must be named page.js or page.tsx

Every folder corresponds to a path segment in the browser URL.

### Nested Routes(blog.tsx)

### Dynamic Routes(products.tsx & reviews.tsx)

### Catch-all Segments(docs.tsx)

### Not Found Page(not-found.tsx)

### File Colocation(dashboard.tsx)

### Private Folders(\_lib)

A private folder indicates that it is a private implementation detail and should not be considered by the routing system.

The folder and all its subfolders are executed from routing.

Prefix the folder name with an underscore.

For separating UI logic from routing logic.

For consistently organizing internal files across a project.

For sorting and grouping files in code editors.

Finally, for avoiding potential naming conflicts with future Next.js file conventions.

If we want to include an underscore in URL segments, we can prefix the folder name with “%5F” which is the URL-encoded form of an underscore.

### Route Groups(auth)

Allows us to logically group our routes and project files without affecting the URL path structure.

Let’s implement authentication routes.

- Register
- Login
- Forgot password

### Layouts(layout.tsx)

A page is UI that is unique to a route.

A layout is UI that is shared between multiple pages in the app.

We can define a layout by default exporting a React component from a layout.js or layout.tsx file.

That component should accept a children prop that will be populated with a child page during rendering.

### Nested Layout(products → layout.tsx)

### Route Group Layout(with-auth-layout → layout.tsx)

To organize our project in a manner that doesn’t affect the URL.

To selectively apply a layout to certain segments while leaving others unchanged.

### Routing Metadata(about.tsx & product → page.tsx)

Ensuring proper search engine optimization (SEO) is crucial for increasing visibility and attracting users.

Next.js introduced the Metadata API which allows us to define metadata for each page.

Metadata ensures accurate and relevant information is displayed when our pages are shared or indexed.

### Configuring Metadata

Export a static metadata object.

Export a dynamic generateMetadata function.

**Metadata rules:**

Both layout.tsx and page.tsx files can export metadata. If defined in a layout, it applies to all pages in that layout, but if defined in a page, it applies only to that page.

Metadata is read in order, from the root level down to the final page level.

When there’s metadata in multiple places for the same route, they get combined, but page metadata will replace layout metadata if they have the same properties.

### Title Metadata(layout.tsx & blog.tsx)

### Link Component Navigation(page.tsx & products → page.tsx)

File based routing.

User rely on UI elements like links to navigate.

- Clicking on them or
- Through programmatic navigation after completing an action

To enable client-side navigation Next.js provides us with the Link component.

The component is a React component that extends the HTML element, and it’s the primary way to navigate between routes in Next.js.

To use it, we need to import it from “next/link”

### Active Links(auth → layout.tsx & styles.css)

### Navigating programmatically(order-product)

### Templates(auth → template.tsx)

Templates are similar to layouts in that they wrap each child layout or page.

But, with templates, when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized.

A template can be defined by exporting a default React component from a template.js or template.tsx file.

Similar to layouts, templates also should accept a children prop which will render the nested segments in the route.

### Loading(blog → loading.tsx)

This file allows us to create loading states that are displayed to users while a specific route segment’s content is loading.

The loading state appears immediately upon navigation, giving users the assurance that the application is responsive and actively loading content.

**benefits:**

1. We can display the loading state as soon as a user navigates to a new route. The immediate feedback reassures users that their action has been acknowledged, reduces perceived loading times, and makes the application feel more responsive.
2. Next.js allows the creation of shared layouts that remain interactive while new route segments are loading. Users can continue interacting with certain parts of the application, such as a navigation menu or sidebar, even if the main content is still being fetched.

### Error Handing(products → reviews → error.tsx)

Automatically wrap a route segment and its nested children in a React Error Boundary.

Create error UI tailored to specific segments using the file-system hierarchy to adjust granularity.

Isolate errors to affected segments while keeping the rest of the application functional.

Add functionality to attempt to recover from an error without a full page reload.

### Handling Errors in Nested Routes

Errors bubble up to the closest parent error boundary.

An error.tsx file will cater to errors for all its nested child segments.

By positioning error.tsx at different levels in the nested folders of a route, we can achieve a more granular level of error handling.

### Handling Errors in Layouts

An error.tsx file will handle errors for all its nested child segments.

The error boundary does not catch errors thrown here because it’s nested inside the layouts component.

### Parallel Routes(complex-dashboard)

Parallel routes are an advanced routing mechanism that allows for the simultaneous rendering pages within the same layout.

Parallel routes in Next.js are defined using a feature knowns as slots.

Slots help structure our content in a modular fashion.

To define a slot, we use the ‘@folder’ naming convention.

Each slot is then passed as a prop to its corresponding ‘layout.tsx’ file.

**Benefits:**

A clear benefit of parallel routes is their ability to split a single layout into various slots, making the code more managable.

**Independent route handling:** Each slot of our layout, such as user analytics or revenue metrics, can have its own loading and error states.

This granular control is particularly beneficial in scenarios where different sections of the page load at varying speeds or encounter unique errors.

**Sub-navigation:** Each slot of our dashboard can essentially function as a mini-application, complete with its own navigation and state management.

This is especially useful in a complex application such as our dashboard where different sections serve distinct purposes.

### Unmatched Routes(complex-dashboard → default.tsx)

**Navigation from the UI**

In the case of navigation within the UI, Next.js retains the previously active state of a slot regardless of changes in the URL.

**Page reload**

Next.js immediately searches for a default.tsx file within each unmatched slot.

The presence of this file is critical, as it provides the default content that Next.js will render in the user interface.

In this default.tsx file is missing in any of the unmatched slots for the current route, Next.js will render a 404 error.

**default.tsx**

The ‘default.tsx’ file in Next.js serves as a fallback to render content when the framework cannot retrieve a slot’s active state from the current URL.

We have complete freedom to define the UI for unmatched routes, We can either mirror the content found in page.tsx or craft an entirely custom view.

### Intercepting Routes(f1 → f2)

Intercepting Routes allow us to intercept or stop the default routing behaviour to present an alternate view or component when navigating through the UI, while still preserving the intended route for scenarios like page reloads.

This can be useful if we want to show a route while keeping the context of the current page.

**Conventions:**

(.) to match segments on the same level.

(..) to match segments one level above.

(..)(..) to match segments two levels above.

(…) to match segments from the root app directory.

### Parallel Intercepting Routes(photo-feed)
