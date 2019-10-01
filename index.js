'use strict';

const express = require('express');
const path = require('path');
const app = express();
const publicFolder = path.join(__dirname, 'public');

app.set('views', publicFolder);
app.use(express.static(publicFolder));
app.set('view engine', 'pug');

// Global layout data
const layout = require('./content/layout.js');

// Home page data
const home = require('./content/home.js');

app.get('/', (_, res) => {
  // Merge global with home
  const homeData = Object.assign(layout, home);
  res.render('index', homeData);
});

// Contact page data
const contact = require('./content/contact.js');

app.get('/contact', (_, res) => {
  // Merge global with home
  const contactData = Object.assign(layout, contact);
  res.render('contact', contactData);
});

// Terms page data
const terms = require('./content/terms.js');

app.get('/terms', (_, res) => {
  // Merge global with home
  const termsData = Object.assign(layout, terms);
  res.render('terms', termsData);
});

// Privacy page data
const privacy = require('./content/privacy.js');

app.get('/privacy', (_, res) => {
  // Merge global with home
  const privacyData = Object.assign(layout, privacy);
  res.render('privacy', privacyData);
});

// Error page data
const error = require('./content/error.js');

app.all('*', (_, res) => {
  // Merge global with home
  const errorData = Object.assign(layout, error);
  res.status(404).render('error', errorData);
});

app.listen(5000);
