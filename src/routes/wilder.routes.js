import express from "express";
import WilderService from "../services/Wilder.service";

const router = express.Router();

router.post("/create", async (req, res) => { // http://localhost:4000/wilder/create

    const { first_name, last_name, email } = req.body;
    try {
        const wilder = await new WilderService().createWilder({
            first_name,
            last_name,
            email,
        });
        res.json(wilder);
    } catch (err) {
        res.status(418).json({
            success: false,
            message: err.message,
        });
    }
});

router.get("/list", (req, res) => { });
router.delete("/delete/:id", (req, res) => {
    req.params.id
});
router.patch("/update/:id", (req, res) => { });

export default router;