
import 'reflect-metadata'; // <--- THIS MUST BE THE VERY FIRST LINE OF ACTUAL CODE

process.on('unhandledRejection', (reason, promise) => {
  console.error('[GLOBAL] Unhandled Rejection at:', promise, 'reason:', reason);
  if (reason instanceof Error) {
    console.error('[GLOBAL] Unhandled Rejection reason stack:', reason.stack);
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('[GLOBAL] Uncaught Exception:', error);
  console.error('[GLOBAL] Uncaught Exception stack:', error.stack);
  process.exit(1);
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module'; // Your path

// The duplicate process.on handlers were here, I've removed them as they are already at the top.

async function bootstrap() {
  console.log('[NEST-MAIN] Entered bootstrap function.');
  console.info(`[NEST-MAIN] NodeJs Version ${process.version}`);

  let app;
  try {
    console.log('[NEST-MAIN] Attempting NestFactory.create(AppModule)...');
    app = await NestFactory.create(AppModule, {
      // logger: false,
    });
    console.log('[NEST-MAIN] NestFactory.create(AppModule) SUCCEEDED.');
  } catch (error) {
    console.error('[NEST-MAIN] NestFactory.create(AppModule) FAILED:', error);
    console.error('[NEST-MAIN] Error stack:', error.stack);
    throw error;
  }

  // +++++++++++++++ ADD CORS CONFIGURATION HERE +++++++++++++++
  console.log('[NEST-MAIN] Enabling CORS...');
  app.enableCors({
    origin: 'http://udapeople-ace8db7.s3.eu-north-1.amazonaws.com', // YOUR S3 FRONTEND URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Add any other headers your frontend might send
    credentials: true, // If your frontend sends cookies or Authorization headers (e.g., JWT)
    optionsSuccessStatus: 200, // For legacy browser compatibility
  });
  console.log('[NEST-MAIN] CORS enabled.');
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const port = parseInt(process.env.PORT || "3000", 10); // Assuming your backend runs on 3030 as per initial error.
                                                        // If PORT env var is set to 3030, this is fine.
                                                        // Otherwise, you might want to hardcode 3030 or ensure PORT is set.
                                                        // The initial error was for 13.60.89.134:3030
  const host = '0.0.0.0';

  console.log(`[NEST-MAIN] Attempting app.listen on port: ${port}, host: ${host}`);
  try {
    await app.listen(port, host);
    console.log(`[NEST-MAIN] app.listen SUCCEEDED. Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(`[NEST-MAIN] app.listen on port ${port} FAILED:`, error);
    console.error('[NEST-MAIN] Error stack:', error.stack);
    throw error;
  }
}

console.log('[NEST-MAIN] Calling bootstrap()...');
bootstrap()
  .then(() => {
    console.log('[NEST-MAIN] bootstrap() promise resolved successfully.');
  })
  .catch(error => {
    console.error('[NEST-MAIN] FATAL ERROR IN bootstrap() promise:', error);
    console.error('[NEST-MAIN] Error stack:', error.stack);
    process.exit(1);
  });

console.log('[NEST-MAIN] Script execution theoretically finished (after bootstrap call).');

// The ecosystem.config.js content you included at the end of main.ts should remain in its own ecosystem.config.js file.
// It does NOT belong inside main.ts.

// import 'reflect-metadata'; // <--- THIS MUST BE THE VERY FIRST LINE OF ACTUAL CODE

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('[GLOBAL] Unhandled Rejection at:', promise, 'reason:', reason);
//   if (reason instanceof Error) {
//     console.error('[GLOBAL] Unhandled Rejection reason stack:', reason.stack);
//   }
//   process.exit(1);
// });

// process.on('uncaughtException', (error) => {
//   console.error('[GLOBAL] Uncaught Exception:', error);
//   console.error('[GLOBAL] Uncaught Exception stack:', error.stack);
//   process.exit(1);
// });

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './modules/app/app.module'; // Your path
// // ... rest of your main.ts ...
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('[GLOBAL] Unhandled Rejection at:', promise, 'reason:', reason);
//   // Log more details about the reason if it's an error object
//   if (reason instanceof Error) {
//     console.error('[GLOBAL] Unhandled Rejection reason stack:', reason.stack);
//   }
//   process.exit(1); // Force exit with error
// });

// process.on('uncaughtException', (error) => {
//   console.error('[GLOBAL] Uncaught Exception:', error);
//   console.error('[GLOBAL] Uncaught Exception stack:', error.stack);
//   process.exit(1); // Force exit with error
// });

// // THEN your import 'reflect-metadata';
// // THEN the rest of your main.

// async function bootstrap() {
//   console.log('[NEST-MAIN] Entered bootstrap function.');
//   console.info(`[NEST-MAIN] NodeJs Version ${process.version}`);
//   // console.info(`[NEST-MAIN] All Process ENV: ${JSON.stringify(process.env)}`); // Optional for now

//   let app;
//   try {
//     console.log('[NEST-MAIN] Attempting NestFactory.create(AppModule)...');
//     app = await NestFactory.create(AppModule, {
//       // logger: false, // Optionally disable Nest's default logger for cleaner output initially
//     });
//     console.log('[NEST-MAIN] NestFactory.create(AppModule) SUCCEEDED.');
//   } catch (error) {
//     console.error('[NEST-MAIN] NestFactory.create(AppModule) FAILED:', error);
//     console.error('[NEST-MAIN] Error stack:', error.stack);
//     throw error; // Re-throw to be caught by outer .catch()
//   }

//   const port = parseInt(process.env.PORT || "3000", 10);
//   const host = '0.0.0.0';

//   console.log(`[NEST-MAIN] Attempting app.listen on port: ${port}, host: ${host}`);
//   try {
//     await app.listen(port, host);
//     console.log(`[NEST-MAIN] app.listen SUCCEEDED. Application is running on: ${await app.getUrl()}`);
//   } catch (error) {
//     console.error(`[NEST-MAIN] app.listen on port ${port} FAILED:`, error);
//     console.error('[NEST-MAIN] Error stack:', error.stack);
//     throw error;
//   }
// }

// console.log('[NEST-MAIN] Calling bootstrap()...');
// bootstrap()
//   .then(() => {
//     console.log('[NEST-MAIN] bootstrap() promise resolved successfully.');
//   })
//   .catch(error => {
//     console.error('[NEST-MAIN] FATAL ERROR IN bootstrap() promise:', error);
//     console.error('[NEST-MAIN] Error stack:', error.stack);
//     process.exit(1); // Crucial for PM2 to see it as an error
//   });

// console.log('[NEST-MAIN] Script execution theoretically finished (after bootstrap call).');
// // ecosystem.config.js
// module.exports = {
//   apps: [{
//     name: "my-backend-app",
//     script: "dist/main.js",
//     exec_interpreter: "/home/ubuntu/.nvm/versions/node/v20.11.1/bin/node", // Example path
//     // ... rest of your config
//   }]
// };
