package handler

import (
	"firebase.google.com/go/v4/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/service"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) GetProfile(c *fiber.Ctx) error {
	userToken, ok := c.Locals("user").(*auth.Token)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).SendString("internal server error")
	}

	userProfile, err := h.authService.GetUserProfile(c.Context(), userToken.UID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("failed to get user profile")
	}

	return c.JSON(userProfile)
}
