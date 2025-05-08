package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/api"
	"github.com/vinicius77/golang-react-api/db"

	mysqlCfg "github.com/go-sql-driver/mysql"
)

func main() {

	db, err := db.NewMySQLStorage(mysqlCfg.Config{
		User:                 "root",
		Passwd:               "root",
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "firebase-authentication-app",
		AllowNativePasswords: true,
		ParseTime:            true,
	})

	logFatal(err)
	defer db.Close()

	app := fiber.New()

	app.Post("/v1/todos", api.CreateTodo)
	app.Patch("/v1/todos/:id/done", api.UpdateTodo)
	app.Get("/v1/todos", api.ListTodo)
	app.Delete("/v1/todos/:id", api.DeleteTodo)

	app.Post("/v1/users", func(c *fiber.Ctx) error {
		return api.CreateUser(c, db)
	})

	logFatal(app.Listen(":4000"))
}

func logFatal(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
