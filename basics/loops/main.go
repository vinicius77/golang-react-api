package main

import "fmt"

func main() {
	i := 0

	for i <= 30 {
		fmt.Println(i)
		i++
	}

	for a := 0; a < 99; a++ {
		if a%15 == 0 {
			fmt.Println("Fizz Buzz", a)
		} else if a%3 == 0 {
			fmt.Println("Fizz", a)
		} else if a%5 == 0 {
			fmt.Println("Buzz", a)
		} else {
			fmt.Println("===========")
		}
	}
}
