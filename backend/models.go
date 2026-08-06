package main

type Task struct {
	ID          int    `json:"ID"`
	Title       string `json:"Title"`
	Description string `json:"Description"`
	Status      string `json:"Status"`
}

var tasks []Task
