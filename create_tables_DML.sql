CREATE TABLE owners (
                        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL
);

CREATE TABLE dogs (
                      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      breed VARCHAR(255) NOT NULL,
                      owner_id INT(11) NOT NULL,
                      FOREIGN KEY (owner_id) REFERENCES owners(id)
);

CREATE TABLE vets (
                      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL
);

CREATE TABLE dog_vet (
                         dog_id INT(11) NOT NULL,
                         vet_id INT(11) NOT NULL,
                         PRIMARY KEY (dog_id, vet_id),
                         FOREIGN KEY (dog_id) REFERENCES dogs(id),
                         FOREIGN KEY (vet_id) REFERENCES vets(id)
);
