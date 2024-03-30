CREATE TABLE Organization (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Item (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Pricing (
    id SERIAL PRIMARY KEY,
    organization_id TEXT REFERENCES Organization(id),
    item_id INT REFERENCES Item(id),
    zone VARCHAR(255) NOT NULL,
    base_distance_km FLOAT NOT NULL,
    base_price FLOAT NOT NULL,
    per_km_price FLOAT NOT NULL,
    CONSTRAINT unique_organization_item_zone UNIQUE (organization_id, item_id, zone)
);

CREATE TABLE Pricing (id SERIAL PRIMARY KEY,organization_id TEXT REFERENCES Organization(id),item_id INT REFERENCES Item(id),zone VARCHAR(255) NOT NULL,base_distance_km FLOAT NOT NULL,base_price FLOAT NOT NULL,per_km_price FLOAT NOT NULL,CONSTRAINT unique_organization_item_zone UNIQUE (organization_id, item_id, zone))

CREATE TABLE Pricing(id SERIAL PRIMARY KEY,organization_id TEXT ,item_id INT ,zone VARCHAR(255) NOT NULL,base_distance_km FLOAT NOT NULL,base_price FLOAT NOT NULL,per_km_price FLOAT NOT NULL)











CREATE TABLE Organization (
    id TEXT PRIMARY KEY,
    //PK integer
    name VARCHAR(255) NOT NULL
    //character varying (255)
);

CREATE TABLE Item (
    id SERIAL PRIMARY KEY,
    //PK ineteger
    type VARCHAR(255) NOT NULL,
    //character varying(255)
    description TEXT
    //text
);
CREATE TABLE Pricing (
    id SERIAL PRIMARY KEY,
    //PK ineteger
    organization_id TEXT REFERENCES Organization(id),
    // ineteger
    item_id INT REFERENCES Item(id),
    // ineteger
    zone VARCHAR(255) NOT NULL,
    //character varying (255)
    base_distance_km FLOAT NOT NULL,
    //double precesion
    base_price FLOAT NOT NULL,
    //double precesion
    per_km_price FLOAT NOT NULL,
    //double precesion
    CONSTRAINT unique_organization_item_zone UNIQUE (organization_id, item_id, zone)
);
