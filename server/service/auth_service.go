package service

import (
	"context"
	"errors"
	"fmt"

	"firebase.google.com/go/v4/auth"
	"github.com/vinicius77/golang-react-api/config"
	"github.com/vinicius77/golang-react-api/domain/model"
)

type AuthService struct {
	firebase *config.FirebaseApp
}

func NewAuthService(firebaseApp *config.FirebaseApp) *AuthService {
	return &AuthService{
		firebase: firebaseApp,
	}
}

func (s *AuthService) VerifyToken(ctx context.Context, idToken string) (*auth.Token, error) {

	if idToken == "" {
		return nil, errors.New("idToken is empty")
	}

	decodedToken, err := s.firebase.Auth.VerifyIDToken(ctx, idToken)
	if err != nil {
		fmt.Printf("firebase token verification failed: %s", err)
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	if decodedToken == nil {
		return nil, fmt.Errorf("token verification is nil")
	}

	fmt.Printf("token verified for the user: %s\n", decodedToken.UID)
	return decodedToken, nil
}

func (s *AuthService) GetUserProfile(ctx context.Context, uid string) (*model.User, error) {
	userRecord, err := s.firebase.Auth.GetUser(ctx, uid)

	if err != nil {
		return nil, fmt.Errorf("error getting user profile: %w", err)
	}

	return &model.User{
		UUID:  userRecord.UID,
		Email: userRecord.Email,
	}, nil
}
