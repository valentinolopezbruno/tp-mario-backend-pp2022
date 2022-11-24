import { pool } from "../db.js";

export const getAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM alumnos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM alumnos WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM alumnos WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.send("Almuno Eliminado!")
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createAlumno = async (req, res) => {
  try {
    const { nombre, dni, domicilio, telefono } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO alumnos (nombre, dni, domicilio, telefono) VALUES (?, ?, ?, ?)",
      [nombre, dni, domicilio, telefono]
    );
    res.status(201).json({ id: rows.insertId, nombre, dni, domicilio, telefono });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dni, domicilio, telefono } = (req.body);

    const [result] = await pool.query(
      "UPDATE alumnos SET nombre = ?, dni = ?,  domicilio = ?, telefono = ? WHERE id = ?",
      [ nombre, dni, domicilio, telefono, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Alumno no encontrado" });

    const [rows] = await pool.query("SELECT * FROM alumnos WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
