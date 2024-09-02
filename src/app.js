import express from 'express'
import signatureRouter from './controllers/signature.controller.js';

export default function run(port, publicKey, privateKey) {
    const app = express();
    app.set('publicKey', publicKey);
    app.set('privateKey', privateKey)

    app.use(express.urlencoded({ extended: true }));

    app.use(signatureRouter);

    app.listen(port, () => {
        console.log(`App is listening on port ${port}`)
      });
}