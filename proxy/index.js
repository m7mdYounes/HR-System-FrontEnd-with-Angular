const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ... rest of your server setup
app.get("/",createProxyMiddleware({target:'http://localhost:3000',changeOrigin:true}))
app.listen(PORT, () => {
  console.log('Server is running on port 8088');
});