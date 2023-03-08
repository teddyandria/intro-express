import express from "express";
import LanguageService from "../services/Language.service";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { label } = req.body;
    try {
        const language = await new LanguageService().createLanguage({
            label,
        });
        res.json(language);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

router.get("/list", async (req, res) => {
    try {
        const languages = await new LanguageService().listLanguage({});
        res.json(languages);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const language = await new LanguageService().findById(id);
        res.json(languages);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultLanguage = await new WilderService().deleteById(id);
        res.json(resultLanguage);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params; //récupération de l'ID du wilder
    const { label } = req.body; // on récupere également les autres données car on utilise PATCH
    try {
        const language = await new LanguageService().update({
            id,
            label,
        })
        res.json(language);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
});

export default router;