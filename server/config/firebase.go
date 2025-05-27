package config

import (
	"context"
	"log"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

type FirebaseApp struct {
	App  *firebase.App
	Auth *auth.Client
}

func InitFirebaseApp() (*FirebaseApp, error) {
	opt := option.WithCredentialsFile("config/firebase.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)

	if err != nil {
		log.Fatalf("error initializing app %v\n", err)
	}

	auth, err := app.Auth(context.Background())

	if err != nil {
		log.Fatalf("error initializing auth %v\n", err)
	}

	return &FirebaseApp{App: app, Auth: auth}, nil
}
