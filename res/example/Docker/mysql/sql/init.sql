CREATE DATABASE managementdb;
use managementdb;

CREATE TABLE users (
  id bigint(20) unsigned not null auto_increment,
  login_id varchar(255) not null,
  password varchar(255) not null,
  type tinyint(4) not null,
  display_name varchar(255) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (id)
);


CREATE TABLE devices (
  id bigint(20) unsigned not null auto_increment,
  user_id bigint(20) unsigned not null,
  device_group_id bigint(20) unsigned,
  name varchar(255) not null,
  state tinyint(4) not null,
  type tinyint(4) not null,
  token varchar(255) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

INSERT INTO users (login_id, password, type, display_name) VALUES ("1","123", 0, "Tanaka");
INSERT INTO users (login_id, password, type, display_name) VALUES ("2","234", 1, "Ito");
INSERT INTO users (login_id, password, type, display_name) VALUES ("3","345", 2, "Sato");

INSERT INTO devices (user_id, device_group_id, name, state, type, token) VALUES (1, 1, "Setup Device", 1, 1, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJEZXZpY2UgVGVzdDIiLCJ0eXBlIjoxLCJpYXQiOjE2NjU1NTU1MDF9.B3ydZhz1qULFhA15kjYDCxjKzRZRAdKFZ3Ns6iSBj1A");