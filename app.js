"use strict";

const express = require("express");
const morgan = require("morgan");
const waitPort = require("wait-port");
const db = require("./db");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/cupcakes", async (req, res) => {
	const { flavour } = req.query;
	let result;

	if (flavour) {
		result = await db.query(
			"SELECT * FROM cupcakes WHERE flavour ILIKE $1",
			[`%${flavour}%`]
		);
	} else {
		result = await db.query("SELECT * FROM cupcakes");
	}

	res.status(200).json(result.rows);
});

app.get("/cupcakes/:id", async (req, res) => {
	const { id } = req.params;
	const result = await db.query(
		"SELECT * FROM cupcakes WHERE id = $1 LIMIT 1",
		[id]
	);

	if (!result.rows.length) {
		const error = "Cupcake not found";
		res.status(404).json({ error });
		return;
	}

	res.status(200).json(result.rows[0]);
});

app.post("/cupcakes", async (req, res) => {
	const { flavour, instructions } = req.body;

	if (!flavour || !instructions) {
		const error = "Missing 'flavour' and/or 'instructions'";
		res.status(400).json({ error });
		return;
	}

	const result = await db.query(
		"INSERT INTO cupcakes (flavour, instructions) VALUES ($1, $2) RETURNING *",
		[flavour, instructions]
	);

	res.status(201).json(result.rows[0]);
});

async function startServer() {
	const { open } = await waitPort({
		port: Number(process.env.PGPORT),
		host: process.env.PGHOST,
		timeout: 5000,
	});

	if (!open) {
		console.log("The port did not open before the timeout...");
		return;
	}

	app.listen(3000);
}

startServer();
