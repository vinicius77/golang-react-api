package main

import "fmt"

func main() {
	ids := []int{33, 66, 88, 345, 2}

	for i, ids := range ids {
		fmt.Println(i, ids)
	}

	idsSum := 0

	for _, id := range ids {
		idsSum += id
		fmt.Println(idsSum)
	}
}
