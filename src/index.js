import dotenv from 'dotenv';
dotenv.config()
import crypto from 'crypto';
import run from './app.js';

const PORT = process.env.PORT;

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { 
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

run(PORT, publicKey, privateKey)