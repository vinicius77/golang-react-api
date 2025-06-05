package main

import "fmt"

// slices does not have a fixed type / arrays do

func main() {
	//         A R R A Y S
	fmt.Println("============ARRAYS===================")
	fruits := [2]string{"apple", "jaboticaba"}
	var names [2]string
	names[0] = "Vinicius"
	names[1] = "Junior"

	fmt.Println(fruits, names)
	fmt.Println("============Slices===================")
	//     S L I C E S
	numbers := []int{33, 88, 745, 983}
	fmt.Println(numbers, len(numbers))

}
