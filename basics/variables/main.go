package main

import "fmt"

// Global
var name = "Go"
var number = 99
var isOpen = true

const MAX_NUM = 30

func main() {
	// Scope variables (var / const) implicity and explicity types
	radius := 12.98
	address, email := "9th street", "sample@example.com"

	fmt.Println(name, isOpen, MAX_NUM, radius, address, email)
	fmt.Printf("%T\n", number)
}
