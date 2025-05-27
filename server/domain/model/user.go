package model

import "time"

type User struct {
	ID        uint       `json:"id"`
	UUID      string     `json:"uuid"`
	Email     string     `json:"email"`
	CreatedAt *time.Time `json:"createdAt"`
	UpdatedAt *time.Time `json:"updatedAt"`
	DeletedAt *time.Time `json:"deletedAt"`
	Password  string     `json:"password"`
}

// TableName gets table name
func (u *User) TableName() string {
	return "users"
}
