import {createSign} from 'crypto';

export default function signMessage(req, res) {
    const privateKey = req.app.get('privateKey');
    const publicKey = req.app.get('publicKey');
    const message = String(req.body.message)

    if(!message) res.send("Please enter a message");
    
    const sign = createSign("SHA256");
    sign.update(Buffer.from(message));
    sign.end();

    // Signature is create in binary DER format
    const signature = sign.sign({
        key: privateKey,
        dsaEncoding: 'der'
    })
    const byteArray = new Uint8Array(signature);

    const resultView = `<h1>SUCCESS</h1>
    <p style="width: 600px">
        <b>Message:</b> ${message}<br/>
        <b>Signature (hex)*:</b> ${signature.toString("hex")}<br/>
        <b>Signature (base64)*:</b> ${signature.toString("base64")}<br/>
        <b>Signature (Uint8Array)*:</b><br/> ${byteArray.join(" ")}<br/>
        <b>Signature (binary):</b><br/> ${signature.toString("binary")}<br/>
        <b>Public key:</b><br/> <pre>${publicKey}</pre>
        <i>*Signature in DER encoding, converted for readability</i>
    </p>
    `

    res.type('html').send(resultView);
}