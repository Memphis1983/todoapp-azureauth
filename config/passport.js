// importing open id connect strategy from passport, mongoose for database, config.js and the User model
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/User')

// exporting the function, we are telling passport to use a new OIDC strategy hence the `passport.use`
module.exports = function (passport) {
  passport.use(
    new OIDCStrategy({
// The metadata endpoint provided by the Microsoft Identity Portal that provides the keys and other important information at runtime
        identityMetadata: config.creds.identityMetadata,
// The client ID of your application in AAD (Azure Active Directory)
        clientID: config.creds.clientID,
// Must be 'code', 'code id_token', 'id_token code' or 'id_token'. For login only flows you can use 'id_token'; 
// if you want access_token, use 'code', 'code id_token' or 'id_token code'.
        responseType: config.creds.responseType,
// Must be 'query' or 'form_post'. This is how you get code or id_token back. 'form_post' is recommended for all scenarios.
        responseMode: config.creds.responseMode,
//       Must be a https url string, unless you set allowHttpForRedirectUrl to true
// This is the reply URL registered in AAD for your app. Production environment should always use https for redirectUrl.
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
// clientSecret is the app key of your app in AAD
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('auth: ', profile)
        const newUser = {
          microsoftId: profile.oid,
          displayName: profile.displayName,
        }

        try {
          let user = await User.findOne({ microsoftId: profile.oid })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
