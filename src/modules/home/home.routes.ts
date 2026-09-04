import { Router } from "express";
import { getHomeData } from "./home.controller.js";
import { asyncHandler } from "../../common/utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getHomeData));

export default router;
