import { Router } from "express";
import {
  createAlumno,
  deleteAlumno,
  getAlumnos,
  getAlumno,
  updateAlumno,
} from "../controllers/alumnos.controller.js";

const router = Router();


router.get("/alumnos", getAlumnos);

router.get("/alumnos/:id", getAlumno);

router.delete("/alumnos/:id", deleteAlumno);

router.post("/alumnos", createAlumno);

router.patch("/alumnos/:id", updateAlumno);

export default router;
