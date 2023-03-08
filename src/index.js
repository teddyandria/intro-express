// const express = require('express')
import express from 'express';
import datasource from './lib/datasource';
import maFonction from "./lib/utilities";
import cors from "cors";
import WilderService from './services/Wilder.service';
import WilderRoutes from "./routes/wilder.routes";
import LanguageService from './services/Language.service';
import LanguageRoutes from "./routes/language.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/language", LanguageRoutes);

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

app.get("/wilder/list", async (req, res) => {
    const { email, first_name, last_name } = req.query;
    let wilder = await new WilderService.getWilders({
        email,
        first_name,
        last_name,
    })
    res.send(wilder);
})

app.delete("/wilder/delete/:id", async (req, res) => {
    const { id } = req.params.id;
    const wilder = await new WilderService().deleteWilder({
        id,
    });
    res.send(wilder);
})

const start = async () => {
    await datasource.initialize();
    app.listen(8000, () => console.log('Serveur démarré sur le port 3000'))
};

start();