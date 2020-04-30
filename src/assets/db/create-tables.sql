CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT
);

INSERT or IGNORE INTO users(id, first_name, middle_name, last_name) VALUES (1, 'Justin Bieber', 'dfsdf', 'Yummy');
