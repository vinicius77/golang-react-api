package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/vinicius77/golang-react-api/api"
	"github.com/vinicius77/golang-react-api/api/middleware"
	"github.com/vinicius77/golang-react-api/config"
	"github.com/vinicius77/golang-react-api/db"
	"github.com/vinicius77/golang-react-api/handler"
	"github.com/vinicius77/golang-react-api/service"

	mysqlCfg "github.com/go-sql-driver/mysql"
)

func main() {

	firebaseApp, err := config.InitFirebaseApp()

	if err != nil {
		log.Fatal("error initializing firebase", err)
	}
	authService := service.NewAuthService(firebaseApp)
	authHandler := handler.NewAuthHandler(authService)
	authMiddleware := middleware.NewAuthMiddleware(authService)

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

	// Protected routes with a subrouter
	protectedRouter := app.Group("/api", cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,OPTIONS",
		AllowHeaders:     "Accept,Content-Type,X-Request-With,Authorization",
		ExposeHeaders:    "Content-Length,Content-Type",
		AllowCredentials: true,
		MaxAge:           300,
	}), authMiddleware.Authentication())
	protectedRouter.Get("/profile", authHandler.GetProfile)

	logFatal(app.Listen(":4000"))
}

func logFatal(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
