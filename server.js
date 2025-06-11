const http = require('http');
const url = require('url');

let emailMap = {};

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function handleSendEmailValidationCode(req, res, query) {
  const email = query.email;
  if (!email || !email.includes('@')) {
    return sendResponse(res, 400, { error: 'Invalid email address' });
  }

  const code = '123456';
  emailMap[email] = { code, sentAt: Date.now() };

  // Auto-expire code after 5 minutes
  setTimeout(() => delete emailMap[email], 5 * 60 * 1000);

  sendResponse(res, 200, {});
}

function handleValidateEmail(req, res, body) {
  const { email, code } = body;
  if (!email || !code) {
    return sendResponse(res, 400, { error: 'Email and code are required' });
  }

  if (!emailMap[email] || emailMap[email].code !== code) {
    return sendResponse(res, 400, { error: 'Invalid code or email' });
  }

  delete emailMap[email];
  const userId = Math.floor(1000 + Math.random() * 9000);
  sendResponse(res, 200, { user_id: userId });
}

const API_HANDLERS = {
  '/api/send-email-validation-code': handleSendEmailValidationCode,
  '/api/validate-email': handleValidateEmail,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/\/+$/, '');
  const method = req.method;
  const query = parsedUrl.query;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': 86400
    });
    res.end();
    return;
  }

  let rawBody = '';
  req.on('data', chunk => (rawBody += chunk.toString()));

  req.on('end', () => {
    const body = rawBody ? JSON.parse(rawBody) : {};
    const handler = API_HANDLERS[path];

    if (handler) {
      if (method === 'GET') {
        handler(req, res, query);
      } else {
        handler(req, res, body);
      }
    } else {
      sendResponse(res, 404, { error: 'Endpoint not found' });
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
