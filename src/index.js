// const express = require('express')
import express from 'express';
import datasource from './lib/datasource';
import maFonction from "./lib/utilities";
import cors from "cors";
import WilderService from './services/Wilder.service';
import WilderRoutes from "./routes/wilder.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/wilder", WilderRoutes);
app.post("/wilder/create", async (req, res) => {
    const { email, first_name, last_name } = req.body;
    let wilder = await new WilderService().createWilder({
        email,
        first_name,
        last_name,
    });
    res.send(wilder);
});

const start = async () => {
    await datasource.initialize();
    app.listen(4000, () => console.log('Serveur démarré sur le port 3000'))
};

start();