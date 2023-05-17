package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/api"
)

func main() {
	app := fiber.New()

	app.Post("/v1/todos", api.CreateTodo)
	app.Patch("/v1/todos/:id/done", api.UpdateTodo)
	app.Get("/v1/todos", api.ListTodo)
	app.Delete("/v1/todos/:id", api.DeleteTodo)

	log.Fatal(app.Listen(":4000"))
}
