DROP TABLE IF EXISTS lolchampions;
CREATE TABLE lolchampions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    quote TEXT NOT NULL,
    region TEXT NOT NULL,
    position TEXT NOT NULL
);