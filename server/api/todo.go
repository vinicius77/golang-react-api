package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/structs"
)

var todos = []structs.Todo{}

func CreateTodo(ctx *fiber.Ctx) error {
	todo := &structs.Todo{}

	if error := ctx.BodyParser(todo); error != nil {
		return error
	}

	todo.ID = len(todos) + 1
	todos = append(todos, *todo)

	return ctx.JSON(todos)

}

func ListTodo(ctx *fiber.Ctx) error {
	return ctx.JSON(todos)
}

func UpdateTodo(ctx *fiber.Ctx) error {
	id, error := ctx.ParamsInt("id")

	if error != nil {
		return ctx.Status(400).SendString("Invalid id")
	}

	for index, todo := range todos {
		if todo.ID == id {
			todos[index].Done = true
			break
		}
	}

	return ctx.JSON(todos)
}

func DeleteTodo(ctx *fiber.Ctx) error {
	id, error := ctx.ParamsInt("id")
	errorMessage := fmt.Sprintf("Todo with id %d was not found", id)
	doesIdExist := false

	if error != nil {
		return ctx.Status(400).SendString("Bad Request")
	}

	for index, todo := range todos {
		if todo.ID == id {
			doesIdExist = true
			todos = append(todos[:index], todos[index+1:]...)
			break
		}
	}

	if doesIdExist {
		return ctx.Status(204).SendString("No Content")
	}
	return ctx.Status(404).SendString(errorMessage)
}
