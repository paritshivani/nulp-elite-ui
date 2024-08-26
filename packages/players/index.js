const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// Serve static files for content player
app.use(
  "/newplayer/content-player",
  express.static(path.join(__dirname, "content-player"))
);

// Serve static files for content player
app.use(
  "/newplayer/ecml-content-player",
  express.static(path.join(__dirname, "ecml-content-player"))
);

// Serve static files for quml
app.use("/newplayer/quml", express.static(path.join(__dirname, "quml")));

// Serve static files for pdf
app.use("/newplayer/pdf", express.static(path.join(__dirname, "pdf")));

// Serve static files for video
app.use("/newplayer/video", express.static(path.join(__dirname, "video")));

// Serve static files for content
app.use("/newplayer/content", express.static(path.join(__dirname, "content")));

// Fallback to a default route
app.use( (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Player</title>
    </head>
    <body>
      <h1>Server is running</h1>
      <ul>
        <li><a href="/newplayer/content-player">Content Player</a></li>
        <li><a href="/newplayer/quml">Quml</a></li>
        <li><a href="/newplayer/pdf">PDF</a></li>
        <li><a href="/newplayer/video">Video</a></li>
        <li><a href="/newplayer/content">Content</a></li>
        <li><a href="/newplayer/ecml-content-player">ecml</a></li>
      </ul>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
