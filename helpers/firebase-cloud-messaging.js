const { google } = require('googleapis')
const axios = require('axios')

const firebaseServiceAccount = {
  type: '',
  project_id: '',
  private_key_id: '',
  private_key: '',
  client_email: '',
  client_id: '',
  auth_uri: '',
  token_uri: '',
  auth_provider_x509_cert_url: '',
  client_x509_cert_url: ''
}

function sendFcmMessage (subscription, token, messageOpts) {
  const message = {
    notification: {
      body: 'body',
      title: 'title'
    },
    data: {
      body: 'body',
      title: 'title'
      // ... anything else we need to send to the app
    },
    token: subscription
  }

  return axios.post(`https://fcm.googleapis.com/v1/projects/${firebaseServiceAccount.project_id}/messages:send`, {
    message
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

function getAccessToken () {
  return new Promise((resolve, reject) => {
    var jwtClient = new google.auth.JWT(
      firebaseServiceAccount.client_email,
      null,
      firebaseServiceAccount.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'],
      null
    )
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens.access_token)
    })
  })
}

module.exports = { sendFcmMessage, getAccessToken }
// async function sendTestNotification () {
//   const token = await getAccessToken()
//   return sendFcmMessage(subscription, token, {})
// }
