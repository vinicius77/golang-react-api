package main

import "fmt"

func main() {
	// Map definition
	email := make(map[string]string)
	email["vinicius"] = "vncs@gmail.com"

	object := map[int]string{3: "hello"}

	fmt.Println(email)
	fmt.Println(len(email))
	fmt.Println(email["vinicius"])
	fmt.Println(object[3])
}
