package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/vinicius77/golang-react-api/service"
)

type AuthMiddleware struct {
	authService *service.AuthService
}

func NewAuthMiddleware(authService *service.AuthService) *AuthMiddleware {
	return &AuthMiddleware{authService: authService}
}

func (middleware *AuthMiddleware) Authentication() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")

		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).SendString("authorization header is empty")
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).SendString("authorization header format is invalid")
		}

		decodedToken, err := middleware.authService.VerifyToken(c.Context(), tokenParts[1])
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).SendString("invalid token")
		}

		// Store the user/token in fiber's context (use `Locals`)
		c.Locals("user", decodedToken)

		return c.Next()
	}
}
