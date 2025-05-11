module.exports = {
  apps : [{
    name: "your-backend-app", // Should be ok
    script: "dist/main.js",  // <--- CHANGE THIS FROM "dist/server.js" to "dist/main.js"
    args: "", // Check if your app needs any args here
    instances: 1, // Should be ok
    // ... other pm2 config ...
    env: {
      NODE_ENV: 'production',
      // Make sure your backend gets the correct API URL/database URL/etc.
      // PM2 ecosystem files can also take env variables that need to be set here or elsewhere.
      // Look for environment variables your backend *requires* to start.
    },
  }]
};
// module.exports = {
//   apps : [{
//     name: " backend-app", // Give your app a name
//     script: "dist/server.js",  // <--- Change this to the actual entry file of your *built* backend code
//     // Or if it's not a built dist file:
//     // script: "src/index.js", // Or whatever starts your backend server
//     args: "",
//     instances: 1,
//     autorestart: true,
//     watch: false,
//     max_memory_restart: '1G', // Optional: restart if memory exceeds this
//     env: {
//       NODE_ENV: 'production',
//       // Add any production environment variables your backend needs here, e.g.:
//       // DATABASE_URL: '...',
//       // API_PORT: 3030,
//     //
//     },
//   }]
// };