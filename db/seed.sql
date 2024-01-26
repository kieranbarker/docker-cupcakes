CREATE TABLE IF NOT EXISTS cupcakes (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	flavour VARCHAR(255) NOT NULL,
	instructions VARCHAR(255) NOT NULL
);

INSERT INTO
	cupcakes (flavour, instructions)
VALUES
	('Chocolate', 'leave by the front door'),
	('Vanilla', 'pick up tomorrow'),
	('Red Velvet', 'no frosting'),
	('Chocolate', 'extra frosting'),
	('Chocolate', 'leave by the front door'),
	('Strawberry', 'call before delivering'),
	('Marble', 'super secret surprise instructions'),
	('Strawberry', 'this is for my cat, is that bad?');