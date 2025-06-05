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
		var tokenString string
		authHeader := c.Get("Authorization")

		if authHeader != "" {
			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				return c.Status(fiber.StatusUnauthorized).SendString("authorization header format is invalid")
			}
			tokenString = tokenParts[1]
		} else {
			// Fallback to cookie
			tokenString = c.Cookies("session")
			if tokenString == "" {
				return c.Status(fiber.StatusUnauthorized).SendString("no token provided")
			}
		}

		decodedToken, err := middleware.authService.VerifyToken(c.Context(), tokenString)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).SendString("invalid token")
		}

		// Store the user/token in fiber's context (use `Locals`)
		c.Locals("user", decodedToken)

		return c.Next()
	}
}
