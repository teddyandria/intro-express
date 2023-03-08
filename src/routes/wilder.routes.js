import express from "express";
import WilderService from "../services/Wilder.service";

const router = express.Router();

router.post("/create", async (req, res) => { // http://localhost:4000/wilder/create

    const { first_name, last_name, email } = req.body; //req.body contient les données contenues dans le formulaire envoyé par le client
    try { // si tout est OK
        const wilder = await new WilderService().createWilder({ // ajout wilder avec la méthode provenant du service
            first_name,
            last_name,
            email,
        });
        res.json(wilder); //on envoie les données
    } catch (err) { // SINON on gère les erreurs avec un catch
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

router.get("/list", async (req, res) => {
    try {
        const wilders = await new WilderService().getWilders({}) //récuperation des données à partir du service.
        res.json(wilders);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new WilderService().deleteById(id);
        res.json(result);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
});
router.patch("/update/:id", async (req, res) => { // patch permet de modifier PARTIELLEMENT en fusionnant les données envoyées avec les données déjà présentes.
    const { id } = req.params; //récupération de l'ID du wilder
    const { first_name, last_name, email } = req.body; // on récupere également les autres données car on utilise PATCH
    try {
        const wilder = await new WilderService().update({
            id,
            first_name,
            last_name,
            email,
        })
        res.json(wilder);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
});

router.post("/assignNote", async (req, res) => {
    const { wilderId, languageId, note } = req.body;
    try {
        // faire l'assignation
        const result = await new WilderService().assignNote({
            languageId,
            wilderId,
            note,
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


export default router;