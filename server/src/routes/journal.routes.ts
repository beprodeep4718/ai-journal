import { Router } from "express"

import {
 createJournal,
 getEntries,
 analyzeJournal,
 getInsights
} from "../controllers/journal.controller"

const router = Router()

router.post("/", createJournal)

router.get("/:userId", getEntries)

router.post("/analyze", analyzeJournal)

router.get("/insights/:userId", getInsights)

export default router