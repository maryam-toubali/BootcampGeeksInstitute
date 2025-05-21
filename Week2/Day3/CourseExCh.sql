
-----------------------------------------------------------

CREATE TABLE movies (
  movie_id SERIAL,
  movie_title VARCHAR(45) NOT NULL,
  released_date date NOT NULL,
  PRIMARY KEY (movie_id)
);

 -- one to one: a movie has one scenario

CREATE TABLE scenarios (
  pk_movie_id INTEGER NOT NULL,
  scenario_story TEXT NOT NULL,
  PRIMARY KEY (pk_movie_id),
  CONSTRAINT fk_movie_id FOREIGN KEY (pk_movie_id) REFERENCES movies (movie_id)
);

INSERT into movies(movie_title, released_date) VALUES 
('Good Will Hunting', '1997-12-02'),
('The Martian', '2015-09-11'),
('Oceans Twelve', '2004-12-10'),
('Up in the Air', '2009-09-5');

INSERT into scenarios(pk_movie_id, scenario_story) VALUES 
((SELECT movie_id FROM movies where movie_title = 'Up in the Air'),
'Ryan Bingham enjoys living out of a suitcase for his job, 
traveling around the country firing people, but finds that lifestyle 
threatened by the presence of a potential love interest, and a new hire.'),
((SELECT movie_id FROM movies where movie_title = 'The Martian'),
'In 2035, the crew of the Ares III mission to Mars is exploring 
Acidalia Planitia on Martian solar day (sol) 18 of their 31-sol expedition. ');

SELECT movies.movie_title, movies.released_date, scenarios.scenario_story as scenario
FROM movies
FULL OUTER JOIN scenarios
ON movies.movie_id = scenarios.pk_movie_id;

CREATE TABLE directors (
  director_id SERIAL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (director_id)
);

 -- one to many: A director directs many movies

CREATE TABLE movies (
  movie_id SERIAL,
  movie_title VARCHAR(45) NOT NULL,
  released_date date NOT NULL,
  fk_director_id INTEGER NOT NULL,
  PRIMARY KEY (movie_id),
  FOREIGN KEY (fk_director_id) REFERENCES directors(director_id) ON DELETE CASCADE
);

CREATE TABLE actors_movies (
  actor_id INTEGER NOT NULL,
  movie_id INTEGER NOT NULL,
  actor_role VARCHAR(30) NOT NULL,
  is_lead_role BOOLEAN NOT NULL,
  PRIMARY KEY (actor_id, movie_id),
  FOREIGN KEY (actor_id) REFERENCES actors(actor_id) ON UPDATE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON UPDATE CASCADE
);

INSERT into actors_movies(actor_id, movie_id, actor_role, is_lead_role) VALUES 
((SELECT actor_id FROM actors where first_name = 'George' AND last_name = 'Clooney' ), 
(SELECT movie_id FROM movies where movie_title = 'Up in the Air'), 'Ryan Bingham', TRUE),

((SELECT actor_id FROM actors where first_name = 'George' AND last_name = 'Clooney' ), 
(SELECT movie_id FROM movies where movie_title = 'Oceans Twelve'), 'Danny Ocean', FALSE),

((SELECT actor_id FROM actors where first_name = 'Matt' AND last_name = 'Damon' ),
(SELECT movie_id FROM movies where movie_title = 'Good Will Hunting'),'Will Hunting', TRUE);

-----------------------------------------------------------------------------------

CREATE TABLE actors (
    actor_id INTEGER PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(100),
    age DATE,
    number_oscars SMALLINT
);

ALTER TABLE actors 
ALTER COLUMN actor_id 
ADD GENERATED ALWAYS AS IDENTITY;

COPY actors(first_name, last_name, age, number_oscars)
FROM 'C:/Users/Public/actors.csv' DELIMITER ',' CSV HEADER;

COPY actors(actor_id, first_name, last_name, age, number_oscars)
TO 'C:/Users/Public/export_db_actors.csv' DELIMITER ',' CSV HEADER;

COPY actors(first_name, last_name)
TO 'C:/Users/Public/export_names.csv' DELIMITER ',' CSV HEADER;

------------------------------------------------------------

CREATE or REPLACE FUNCTION age_actor(fn varchar(50), lan varchar(100)) 
RETURNS date AS $birthdate$
BEGIN
   RETURN(SELECT age FROM actors WHERE actors.first_name = fn AND actors.last_name=lan);
END;
$birthdate$ LANGUAGE plpgsql;

SELECT * FROM actors 
SELECT * FROM age_actor('George', 'Clooney');

CREATE or REPLACE FUNCTION fullname_actor(fn varchar(50), lan varchar(100)) RETURNS VARCHAR(100) AS $fullname$
BEGIN
   RETURN(SELECT CONCAT(first_name, ' ', last_name) FROM actors WHERE actors.first_name = fn AND actors.last_name=lan);
END;
$fullname$ LANGUAGE plpgsql;

SELECT * FROM fullname_actor('George', 'Clooney');
SELECT * FROM fullname_actor('Matt', 'Damon');

CREATE or REPLACE FUNCTION current_age_actor(fn varchar(50), lan varchar(100)) RETURNS int AS $current_age$
declare
    current_age integer;
    birthdate date;
    now_date date := CURRENT_DATE;
BEGIN
   birthdate := (SELECT age FROM actors WHERE actors.first_name = fn AND actors.last_name=lan);
   current_age := DATE_PART('year', now_date) - DATE_PART('year', birthdate);
   RETURN current_age;
END;
$current_age$ LANGUAGE plpgsql;

SELECT * FROM current_age_actor('George', 'Clooney');

/*
CREATE or REPLACE FUNCTION current_age_actor(fn varchar(50), lan varchar(100)) 
RETURNS RECORD AS $$
declare
    current_age integer;
    birthdate date;
    now_date date := CURRENT_DATE; 
    all_info RECORD;
BEGIN
   birthdate := (SELECT age FROM actors WHERE actors.first_name = fn AND actors.last_name=lan);
   current_age := DATE_PART('year', now_date) - DATE_PART('year', birthdate);
   SELECT fn , lan, current_age INTO all_info;
   RETURN all_info;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM current_age_actor('George', 'Clooney') AS (first_name varchar, last_name varchar, age integer);
*/

