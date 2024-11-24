import 'dotenv/config.js';
import passport from 'passport';
import jwt from 'passport-jwt';
import cookieExtractor from './cookieExtractor.js';

const JwtStrategy = jwt.Strategy;
const secretKey = process.env.SECRET_KEY;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }));
}

export default initializePassport;