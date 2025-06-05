package main

import "fmt"

func main() {
	x := 44
	y := 56

	color := "red"

	if x == y {
		fmt.Printf("Equal")
	} else if x > y {
		fmt.Println("X is greater")
	} else {
		fmt.Println("X is less than y")
	}

	switch color {
	case "red":
		fmt.Println("Color is red")
	case "blue":
		fmt.Println("Color is blue")
	default:
		fmt.Println("I do not knoe such color")
	}
}
