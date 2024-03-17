## Rendering

Rendering is the process that transforms the code we write into user interfaces.

In Next.js, choosing the right time and place to do this rendering is vital for building a performant application.

CSR, SSR and RSCs.

Rendering in React → Rendering in Next.js.

### 1. Client-side Rendering

This method of rendering, where the component code is transformed into a user interface directly within the browser(the client), is known as client-side rendering(CSR).

CSR quickly became the standard for SPAs, with widespread adoption.

It wasn’t long before developers began noticing inherent drawbacks to this approach.

### Drawbacks of CSR

**SEO**

Generating HTML that mainly contains a single div tag is not optimal for SEO, as it provides little content for search engines to index.

**Performance**

Having the browser (the client) handle all the work, such as fetching data, computing the UI, and making the HTML interactive, can slow things down. Users might see a blank screen or a loading spinner while the page loads.

Each new feature added to the application increases the size of the JavaScript bundle, prolonging the wait time for users to see the UI.

### 2. Server-side Rendering

It significantly improves SEO because search engines can easily index the server-rendered content.

Users can immediately see the page HTML content, instead of a blank screen or loading spinner.

### Hydration

During hydration, React takes control in the browser, reconstructing the component tree in memory based on the static HTML that was served.

It carefully plans the placement of interactive elements within this tree. Then, React proceeds to bind the necessary JavaScript logic to these elements.

This involves initializing the application state, attaching event handlers for actions such as clicks and mouseovers, and setting up any other dynamic functionalities required for a fully interactive user experience.

### Server-side Solutions

1. Static Site Generation(SSG)
2. Server-Side Rendering(SSR)

SSG occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesn’t change often, like blog posts.

SSR, on the other hand, renders pages on-demand in response to user requests. It is suitable for personalized content like social media feeds, where the HTML depends on the logged-in user.

Server-Side Rendering(SSR) was a significant improvement over Client-Side Rendering(CSR), providing faster initial page loads and better SEO.

### Drawbacks of SSR

1. **We have to fetch everything before we can show anything**

   Components cannot start rendering and then pause or “wait” while data is still being loaded.

   If a component needs to fetch data from a database or another source(like an API), this fetching must be completed before the server can begin rendering the page.

   This can delay the server’s response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

2. **We have to load everything before we can hydrate anything**

   For successful hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree.

   This means that all the JavaScript for the components must be loaded on the client before we can start hydrating any of them.

3. **We have to hydrate everything before we can interact anything**

   React hydrates the component tree in a single pass, meaning once it starts hydrating, it won’t stop until it’s finished with the entire tree.

   As a consequence, all components must be hydrated before we can interact with any of them.

**Summary:**

1. Data fetching must be completed before the server can begin rendering HTML.
2. The JavaScript required for the components needs to be fully loaded on the client side before the hydration process can start.
3. All components have to be hydrated before they become interactive.

These issues contribute to an “all-or-nothing” waterfall scenario, resulting in inefficiencies, especially if certain parts of our application are slower than others.

### Suspense SSR Architecture

use the <Suspense> component to unlock two major SSR features.

1. **HTML streaming on the server**

   We don’t have to fetch everything before we can show anything.

   If a particular sections delays the initial HTML, it can be seamlessly integrated into the stream later.

   This is the essence of how Suspense facilitates server-side HTML streaming.

   **Code splitting**

   Code splitting allows us to mark specific code segments as not immediately necessary for loading, signaling our bundler to segregate them into separate ‘<script>’ tags.

   Using ‘React.lazy’ for code splitting enables us to separate the main section’s code from the primary JavaScript bundle.

   The JavaScript containing React and the code for the entire application, excluding the main section, can now be downloaded independently by the client, without having to wait for the main section’s code.

2. **Selective hydration on the client**

   By wrapping the main section within ‘<Suspense>’, we’ve indicated to React that it should not prevent the rest of the page from not just streaming but also from hydrating.

   This feature, called **selective hydration** allows for the hydration of sections as they become available, before the rest of the HTML and the JavaScript code are fully downloaded.

   ***

   Selective hydration offers a solution to the third issue: the necessity to “hydrate everything to interact with anything”

   React begins hydrating as soon as possible, enabling interactions with elements like the header and side navigation without waiting for the main content to be hydrated.

   This process is managed automatically by React.

   In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.

**Drawbacks of Suspense SSR**

1. First even though JavaScript code is streamed to the browser asynchronously, eventually, the entire code for a web page must be downloaded by the user.

   As applications add more features, the amount of code users need to download also grows.

2. Second, the current approach requires that all React components undergo hydration on the client-side, irrespective of their actual need for interactivity.

   This process can inefficiently spend resources and extend the loading times and time to interactivity for users, as their devices need to process and render components that might not even require client-side interaction.

3. Third, in spite of servers superior capacity for handling intensive processing tasks, the bulk of JavaScript execution still takes place on the user’s device.

   This can slow down the performance, especially on devices that are not very powerful.

### React Server Components(RSC)

React Server Components(RSC) represent a new architecture designed by the React team.

This approach aims to leverage the strengths of both server and client environments, optimizing for efficiency, load times and interactivity.

The architecture introduces a dual-component model.

- Client Components
- Server Components

This distinction is not based on the functionality of the components but rather on where they execute and the specific environments they are designed to interact with.

### Client Components

Client components are the familiar React components we’ve been using.

They are typically rendered on the client-side(CSR) but, they can also be rendered to HTML on the server(SSR), allowing users to immediately see the page’s HTML content rather than a blank screen.

Components that primarily run on the client but can also be executed once on the server as an optimization strategy.

---

Client components have access to the client environment, such as browser, allowing them to use state, effects, and event listeners to handle interactivity and also access browser-exclusive APIs like geolocation or localStorage, allowing us to build UI for specific use cases.

In fact, the term “Client Component” doesn’t signify anything new: it simply helps differentiate these components from the newly introduced Server Components.

### Server Components

Server Components represent a new type of React component specially designed to operate exclusively on the server.

And unlike client components, their code stays on the server and is never downloaded to the client.

This design choice offers multiple benefits to React applications.

### Benefits of Server Components

**Reduced Bundle Sizes:**

Server Components do not send code to the client, allowing large dependencies to remain server-side.

This benefits users with slower internet connections or less capable devices by eliminating the need to download, parse, and execute JavaScript for these components.

Additionally, it removes the hydration step, speeding up app loading and interaction.

**Direct access to Server-side Resources:**

By having direct access to server-side resources like databases or file systems, Server Components enable efficient data fetching and rendering without needing additional client-side processing.

Leveraging the server’s computational power and proximity to data sources, they manage compute-intensive rendering tasks and send only interactive pieces of code to the client.

**Enhanced Security:**

Server Components exclusive server-side execution enhances security by keeping sensitive data and logic, including tokens and API keys, away from the client-side.

**Improved Data Fetching:**

Server Components enhance data fetching efficiency.

Typically, when fetching data on the client-side using useEffect, a child component cannot begin loading its data until the parent component has finished loading its own.

This sequential fetching of data often leads to poor performance.

This main issue is not the round trips themselves, but that these round trips are made from the client to the server.

Server Components enable applications to shift these sequential round trips to the server side.

By moving this logic to the server, request latency is reduced, and overall performance is improved, eliminating client-server “waterfalls”.

**Caching:**

Rendering on the server enables caching of the results, which can be reused in subsequent requests and across different users.

This approach can significantly improve performance and reduce costs y minimizing the amount of rendering and data fetching required for each request.

**Faster Initial Page Load and First Contentful Paint:**

Initial page laod and first contentful pain(FCP) are significantly improved with server components.

By generating HTML on the server, pages become immediately visible to users without the delay of downloading, parsing and executing JavaScript.

**Improved SEO:**

Regarding Search Engine Optimization(SEO), the server-rendered HTML is fully accessible to search engine bots, enhancing the indexability of our pages.

**Efficient Streaming:**

Server Components allows the rendering process to be divided into manageable chunks, which are then streamed to the client as soon as they are ready.

This approach allows users to start seeing parts of the page earlier, eliminating the need to wait for the entire page to finish rendering on the server.

**Summary:**

Server components take charge of data fetching and static rendering, while client components are tasked with rendering the interactive elements of the application.

The bottom line is that the RSC architecture enables React applications to leverage the best aspects of both server and client rendering, all while using a single language, a single framework, and a cohesive set of APIs.

RSC introduce a new way of building React apps by separating components into two types: Server Components and Client Components.

Server Components run only on the server, accessing data and preparing content without being sent to the browser, which makes the app faster for users because less information need to download.

They can’t manage clicks or interactions directly.

Client Components, on the other hand, work in the user’s browser and handle all the interactive parts of the app, like clicking and typing.

They can also be rendered on the server for a fast initial load of the site. This setup helps make websites faster, more secure, and easier for everyone to use, no matter where they are or what device they’re using.

### RSC and Next.js

The App Router in Next.js is built around the RSC architecture.

All the features and benefits we’ve discussed are already baked into the latest version of Next.js.

### RSC Rendering Lifecycle

For React Server Components, It’s important to consider three elements: your browser(the client), and on the server side, Next.js (the framework) and React(the library).

### Static Rendering

Static rendering is a server rendering strategy where we generate HTML pages at the time of building our application.

This approach allows the page to be built once, cached by a CDN, and served to the client almost instantly.

This optimization also enables us to share the result of the rendering work among different users, resulting in a significant performance boost for our application.

Static rendering is particularly useful for blog pages, e-commerce product pages, documentation and marketing pages.

### How statically Render?

Static rendering is the default rendering strategy in the app router.

All routes are automatically prepared at build time without additional setup.

### Production Server vs Dev Server

For production, an optimized build is created once, and we deploy that build.

A development server, on the other hand, focuses on the developer experience.

We can’t afford to build our app once, make changes, rebuild and so on.

For production builds, a page will be pre-rendered once when we run the build command.

In development mode, a page will be pre-rendered for every request.

### Prefetching

Prefetching is a technique used to preload a route in the background before the user navigates to it.

Routes are automatically prefetched as they become visible in the user’s viewpoint, either when the page first loads or as it comes into view through scrolling.

For static routes, the entire route is prefetched and cached by default.

When we load the homepage, Next.js prefetches the About and Dashboard routes, keeping them ready for instant navigation.

**Summary:**

Static rendering is a strategy where the HTML is generated at build time.

Along with the HTML, the RSC payload is created for each component, and JavaScript chunks are produced for client-side component hydration in the browser.

If we navigate directly to a page route, the corresponding HTML file is served.

If I navigate to the route from a different one, the route is created on the client side using the RSC payload and JavaScript chunks, without any additional requests to the server.

Static rendering is great for performance and use cases include blogs, documentation, marketing pages etc.

### Dynamic Rendering

Dynamic rendering is a server rendering strategy where routes are rendered for each user at request time.

It is useful when a route has data that is personalized to the user or contains information that can only be known at request time, such as cookies or the URL’s search parameters.

News websites, personalized e-commerce pages, and social media feeds are some example where dynamic rendering is beneficial.

### How to dynamic rendering

During rendering, if a dynamic function is discovered, Next.js will switch to dynamically rendering the whole route.

In Next.js, these dynamic functions are: cookies(), headers() and searchParams.

Using any of these will opt the whole route dynamic rendering at request time.

**Summary:**

Dynamic rendering is a strategy where the HTML is generated at request time.

Next.js automatically switches to dynamic rendering when it comes across a dynamic function in the component, such as cookies(), headers() or the searchParams object.

This form of rendering is great for when we need to render HTML personalized to a user, such as a social media feed.

As a developer, we do not need to choose between static and dynamic rendering. Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used.

### Streaming

Streaming is a strategy that allows for progressive UI rendering from the server.

Work is divided into chunks and streamed to the client as soon as it’s ready.

This enables users to see parts of the page immediately, before the entire content has finished rendering.

Streaming significantly improves both the initial page loading performance and the rendering of UI elements that rely on slower data fetches, which would otherwise block the rendering of the entire route.

Streaming is integrated into the Next.js App Router by default.
