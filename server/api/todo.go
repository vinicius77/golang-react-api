package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/structs"
)

func CreateTodo(ctx *fiber.Ctx) error {
	todos := []structs.Todo{}
	todo := &structs.Todo{}

	if error := ctx.BodyParser(todo); error != nil {
		return error
	}

	todo.ID = len(todos) + 1
	todos = append(todos, *todo)

	return ctx.JSON(todos)

}
