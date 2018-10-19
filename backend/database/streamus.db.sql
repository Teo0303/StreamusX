BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `song` (
	`song_id`	INTEGER NOT NULL,
	`album_id`	INTEGER NOT NULL,
	`artist_id`	INTEGER NOT NULL,
	`song_name`	TEXT,
	`isExplicit`	BLOB,
	`featured`	TEXT,
	`song_src`	INTEGER,
	PRIMARY KEY(`song_id`,`artist_id`,`album_id`)
);
INSERT INTO `song` (song_id,album_id,artist_id,song_name,isExplicit,featured,song_src) VALUES (1,1,1,'The Ringer','true','','The Ringer Url');
INSERT INTO `song` (song_id,album_id,artist_id,song_name,isExplicit,featured,song_src) VALUES (2,1,1,'Greatest','true','','Greatest Url');
INSERT INTO `song` (song_id,album_id,artist_id,song_name,isExplicit,featured,song_src) VALUES (3,1,1,'Normal','true','','Normal Url');
INSERT INTO `song` (song_id,album_id,artist_id,song_name,isExplicit,featured,song_src) VALUES (4,2,2,'Phenomenal','true','','Phenomenal ul');
INSERT INTO `song` (song_id,album_id,artist_id,song_name,isExplicit,featured,song_src) VALUES (5,2,2,'Shape Of You','false','','Shape Of you Url');
CREATE TABLE IF NOT EXISTS `playlist_songs` (
	`ps_id`	INTEGER NOT NULL,
	`playlist_id`	INTEGER NOT NULL,
	`song_id`	INTEGER NOT NULL,
	PRIMARY KEY(`ps_id`,`playlist_id`,`song_id`)
);
CREATE TABLE IF NOT EXISTS `playlist` (
	`playlist_id`	INTEGER NOT NULL,
	`playlist_name`	TEXT NOT NULL,
	`playlist_cover`	TEXT NOT NULL,
	PRIMARY KEY(`playlist_id`)
);
CREATE TABLE IF NOT EXISTS `artist` (
	`artist_id`	INTEGER NOT NULL,
	`artist_name`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	`artist_cover`	TEXT,
	PRIMARY KEY(`artist_id`)
);
INSERT INTO `artist` (artist_id,artist_name,description,artist_cover) VALUES (1,'Eminem','G.O.A.T.','some image');
INSERT INTO `artist` (artist_id,artist_name,description,artist_cover) VALUES (2,'Ed Sheeran','Great artist','anoter one');
INSERT INTO `artist` (artist_id,artist_name,description,artist_cover) VALUES (3,'Anne Marie','With great voice','third one');
CREATE TABLE IF NOT EXISTS `album` (
	`album_id`	INTEGER NOT NULL,
	`artist_id`	INTEGER NOT NULL,
	`album_name`	TEXT NOT NULL,
	`album_cover`	TEXT NOT NULL,
	PRIMARY KEY(`album_id`,`artist_id`)
);
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (1,1,'Revival','Revivak Cover');
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (2,1,'Kamikaze','https://www.gannett-cdn.com/presto/2018/08/31/PDTN/ac524c13-f316-4d33-a04c-5194a841ff9d-em-kami.jpg?width=534&height=712&fit=bounds&auto=webp');
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (3,1,'Shady XV','Shady XV Cover');
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (4,2,'Divide','Divide Cover');
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (5,2,'Multiply','Multiply Cover');
INSERT INTO `album` (album_id,artist_id,album_name,album_cover) VALUES (6,3,'Speak Your Mind','SYM Cover');
COMMIT;
