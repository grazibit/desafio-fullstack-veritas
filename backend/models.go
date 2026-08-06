package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Task struct {
	ID          int    `json:"ID"`
	Title       string `json:"Title"`
	Description string `json:"Description"`
	Status      string `json:"Status"`
}

var tasks []Task

const fileName = "tasks.json"

func loadTasks() {
	file, err := os.ReadFile(fileName)
	if err != nil {
		fmt.Println("Iniciando servidor... Nenhuma tarefa encontrada.")
		tasks = []Task{}
		return
	}
	json.Unmarshal(file, &tasks)
	fmt.Println("Iniciando servidor... Tarefas carregadas")
}

func saveTasks() {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		fmt.Println("Erro ao converter tarefas para JSON:", err)
		return
	}
	os.WriteFile(fileName, data, 0644)
}
