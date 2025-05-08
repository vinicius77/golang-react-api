### Troubleshooting

```bash
docker-compose up

Creating server_mysql_1 ... error

ERROR: for server_mysql_1  Cannot start service mysql: driver failed programming external connectivity on endpoint server_mysql_1 (57c6251c98ec133f2b7c1ed144456d964bae3af321c2dc4c0ca8f374944840e9): failed to bind port 0.0.0.0:3306/tcp: Error starting userland proxy: listen tcp4 0.0.0.0:3306: bind: address already in use

ERROR: for mysql  Cannot start service mysql: driver failed programming external connectivity on endpoint server_mysql_1 (57c6251c98ec133f2b7c1ed144456d964bae3af321c2dc4c0ca8f374944840e9): failed to bind port 0.0.0.0:3306/tcp: Error starting userland proxy: listen tcp4 0.0.0.0:3306: bind: address already in use
ERROR: Encountered errors while bringing up the project.
```

#### Fix

```bash
sudo kill `sudo lsof -t -i:3306`
```

#### ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)

```bash
[I]  ⚓  ~  mysql -u root -p
Enter password:
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
[I]  ⚓  ~  sudo service mysql stop
[sudo] password for kako77sub:
[I]  ⚓  ~  sudo service mysql start
[I]  ⚓  ~  mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.41-0ubuntu0.22.04.1 (Ubuntu)

Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE `firebase-authentication-app`;
```

#### Migration hell Setup :fire:

I have ditched using `github.com/pressly/goose/v3/cmd/goose@latest`. It is too complicated. I opted out for `github.com/golang-migrate/migrate/v4`.

I have another project with more info [here](https://github.com/vinicius77/ecom/blob/master/SETUP.md)

Short description on setting migration up

```bash
cd server/
go get github.com/golang-migrate/migrate/v4
```

1. Set up the Makefile:

```makefile
migration:
	@migrate create -ext sql -dir db/migrations $(filter-out $@,$(MAKECMDGOALS))
migrate-up:
	@/usr/local/go/bin/go run db/migrations/main.go up
migrate-down:
	@/usr/local/go/bin/go run db/migrations/main.go down
```

1. Create the database table if not yet.

```bash
mysql -u root -p
mysql> CREATE DATABASE firebase-authentication-app;
```

1. Create both `db/db.go` and `db/migrations/main.go` files

1. run `make migration add-user-table`. (It will create the initial migration files for user table)

1. Add content for both `<timestamp>_add_user-table.down.sql` and `<timestamp>_add_user-table.up.sql`

1. run `make migrate-up`

1. If no errors you should see on MySQL console:

```bash
mysql -u root -p

mysql> SHOW DATABASES;
+-----------------------------+
| Database                    |
+-----------------------------+
| firebase-authentication-app |
| ...                         |
+-----------------------------+

mysql> USE firebase-authentication-app;
Database changed

mysql> SHOW TABLES;
+---------------------------------------+
| Tables_in_firebase-authentication-app |
+---------------------------------------+
| schema_migrations                     |
| users                                 |
+---------------------------------------+

mysql> DESCRIBE users;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| uuid       | varchar(255) | NO   | UNI | NULL              |                   |
| email      | varchar(255) | YES  |     | NULL              |                   |
| created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at | timestamp    | YES  |     | NULL              |                   |
| deleted_at | timestamp    | YES  |     | NULL              |                   |
+------------+-----------
```

#### Setup Github OAuth

[Set Up Firebase Authentication With React and Go](https://readmedium.com/firebase-authentication-with-react-and-go-3784f91fa760)

Although the blog above is useful, there is a lot of not well explained things:

- [GitHub](https://github.com/settings/applications/2993948)
  **Aplication name:** whatever you want to
  **Home Page URL:** client URL (i.e. `http://localhost:5173/` Vite)
  **Authorization callback URL:** autofills with firebase auth redirect (i.e. `https://.<your-project>.firebaseapp.com/__/auth/handler`)

The process above create the `Client ID`, so you need to generate `Client secret` and set up both on:

[Firebase](https://console.firebase.google.com) `Console > Authentication > Sign-in Method > Add New Provider > GitHub`
`
