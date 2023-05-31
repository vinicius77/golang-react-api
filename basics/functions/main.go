package main

import "fmt"

func greeting(name string) {
	fmt.Println("Hello " + name)
}

func makeDouble(num int) int {
	return num * 2
}

func main() {
	name := "Vinicius"

	greeting(name)
	fmt.Println(makeDouble(45))
}
