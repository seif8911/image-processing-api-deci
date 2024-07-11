import express from 'express';
import routes from './routes/index';
// import File from './file';
import path from 'path';

const app: express.Application = express();
const port: number = 3000; // Default port

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, '../public')));

// Add routes
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  // Make sure that thumb path is available
  // await File.createThumb();

  const url: string = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Project Hosted at ${url}`);
});

export default app;
