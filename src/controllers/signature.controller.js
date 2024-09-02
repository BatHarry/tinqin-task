import { Router } from "express";
import { readFile } from 'node:fs/promises'
import signMessage from "../handlers/sign.handler.js";

const signatureRouter = new Router();

signatureRouter.get('/', async (req, res) => {
    const contents = await readFile('./src/views/index.html', {encoding: 'utf-8'})
    res.type("html").send(contents.toString('utf-8'));
})

signatureRouter.post('/', signMessage)

export default signatureRouter;