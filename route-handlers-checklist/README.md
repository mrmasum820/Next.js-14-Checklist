## Route handlers

Unlike page routes, which respond with HTML content, route handers allow us to create RESTful endpoints, giving us full control over the response.

There is no overhead of having to create and configure a separate server.

Route handlers are also great for making external API requests.

Route handlers run server-side, ensuring that sensitive information like private keys remains secure and never gets shipped to the browser.

Route handlers are the equivalent of API routes in Page router.

### Handling get & post request(comments → route.ts)

### Dynamic route handlers([id] → route.ts)

### Handling PATCH Request([id] → route.ts)

### Handling DELETE Request

### URL Query Parameters

### Redirect in Route Handlers([id] → route.ts)

### Headers in Route Handlers(profile → api → route.ts)

HTTP headers represent the metadata associated with an API request and response.

**Request Headers:**

These are sent by the client, such as a web browser, to the server. They contain essential information about the request, which helps the server understand and process it correctly.

**‘User-Agent’** which identifies the browser and operating system to the server.

**‘Accept’** which indicates the content types like text, video, or image formats that the client can process.

**‘Authorization’** header used by the client to authenticate itself to the server.

**Response Headers:**

These are sent back from the server to the client. They provide information about the server and the data being sent in the response.

**‘Content-Type’** header which indicates the media type of the response. It tells the client what the data type of the returned content is, such as text/html for HTML documents, application/json for JSON data, etc.

### Cookies in Route Handlers

Cookies are small pieces of data that a server send to a user’s web browser.

The browser may store the cookie and send it back to the same server with later requests.

Cookies are mainly used for three purposes.

- Session management like logins and shopping carts
- Personalization like user preferences and themes.
- Tracking like recording and analyzing user behavior.

### Caching in Route Handlers(time → route.ts)

Route handlers are cached by default when using the GET method with the Response object in Next.js.

Opt out of caching:

- dynamic mode in Segment Config Option.
- using the Request object with the GET method.
- employing dynamic functions like headers() and cookies().
- using any HTTP method other than GET.
