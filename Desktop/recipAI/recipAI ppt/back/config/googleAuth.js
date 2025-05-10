const { google } = require('googleapis');
require('dotenv').config();

// Get credentials from environment variables
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

// Check if Google OAuth is properly configured
const isConfigured = !!(clientId && clientSecret);
const hasRefreshToken = !!refreshToken;

let oauth2Client = null;

// Only set up OAuth client if credentials are available
if (isConfigured) {
    oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );

    // Set refresh token if available
    if (hasRefreshToken) {
        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });
        
        console.log('Google OAuth client initialized with refresh token');
    } else {
        console.warn('Google OAuth client initialized without refresh token - some features will be limited');
    }
} else {
    console.warn('Google OAuth credentials not properly configured in .env file');
}

const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
];

const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
};

const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

const createCalendarEvent = async (tokens, appointmentDetails) => {
  oauth2Client.setCredentials(tokens);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: `Patient Consultation - ${appointmentDetails.patientName}`,
    description: appointmentDetails.reason || 'Medical Consultation',
    start: {
      dateTime: appointmentDetails.startTime,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: appointmentDetails.endTime,
      timeZone: 'Asia/Kolkata',
    },
    conferenceData: {
      createRequest: {
        requestId: appointmentDetails._id,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    }
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    resource: event,
  });

  return {
    eventId: response.data.id,
    meetLink: response.data.hangoutLink,
    eventLink: response.data.htmlLink
  };
};

module.exports = {
    oauth2Client,
    scopes,
    isConfigured,
    hasRefreshToken,
    getCalendar: () => {
        if (!oauth2Client) {
            throw new Error('Google OAuth client not initialized');
        }
        return google.calendar({ version: 'v3', auth: oauth2Client });
    },
    getAuthUrl,
    getTokens,
    createCalendarEvent
};
