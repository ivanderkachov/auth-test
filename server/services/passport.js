// import passportJWT from 'passport-jwt'
//  eslint-disable-next-line import/no-import-module-exports
import User from '../model/User.model'
// import config from '../config'
const passportJWT = require('passport-jwt')

// const User = require('../model/User.model')


const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: 'secretKey',
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
})

exports.jwt = jwtStrategy