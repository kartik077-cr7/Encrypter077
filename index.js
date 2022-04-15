const express = require("express");
const app = express();
const NodeRSA = require("node-rsa");

const key = new NodeRSA({ b: 512 });

console.log(key);

app.use(express.json());

app.post("/encrypt", async (req, res) => {
    try {
        // Encrypt
        const cipherText = key.encrypt(req.body.text, "base64");
        return res.status(200).json({
            cipherText
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post("/decrypt", async (req, res) => {
    try {
        // Decrypt
        const plainText = key.decrypt(req.body.cipherText, "utf8");
        return res.status(200).json({
            plainText
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listensing on port ${port}..`);
});