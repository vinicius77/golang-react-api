package handler

import (
	"time"

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

func (h *AuthHandler) SessionLogic(c *fiber.Ctx) error {
	var body struct {
		IDToken string `json:"idToken"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("invalid request body")
	}

	_, err := h.authService.VerifyToken(c.Context(), body.IDToken)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString("invalid id token")
	}

	c.Cookie(&fiber.Cookie{
		Name:     "session",
		Value:    body.IDToken,
		Expires:  time.Now().Add(5 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   false, // TODO: change to true on production,
		SameSite: "Strict",
		Path:     "/",
	})

	return c.SendStatus(fiber.StatusOK)
}

func (h *AuthHandler) Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "session",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour), // expired
		HTTPOnly: true,
		Secure:   false, // TODO: true in production
		SameSite: "Strict",
		Path:     "/",
	})

	return c.SendStatus(fiber.StatusOK)
}
