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
	err = json.Unmarshal(file, &tasks)
	if err != nil {
		fmt.Println("Erro ao carregar tarefas:", err)
		tasks = []Task{}
		return
	}
	fmt.Println("Iniciando servidor... Tarefas carregadas")
}

func saveTasks() {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		fmt.Println("Erro ao converter tarefas para JSON:", err)
		return
	}
	err = os.WriteFile(fileName, data, 0644)
	if err != nil {
		fmt.Println("Erro ao salvar tarefas:", err)
	}
}
