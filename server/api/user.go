package api

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/domain/model"
)

func CreateUser(ctx *fiber.Ctx, db *sql.DB) error {
	user := model.User{}

	if err := ctx.BodyParser(&user); err != nil {
		return ctx.
			Status(fiber.StatusBadRequest).
			JSON(fiber.Map{"error": "invalid request body"})
	}

	_, err := db.Exec(
		"INSERT INTO users (uuid, email) VALUES (?,?)",
		user.UUID, user.Email)

	if err != nil {
		return ctx.
			Status(fiber.StatusInternalServerError).
			JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.JSON(user)

}
