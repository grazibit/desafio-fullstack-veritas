package main

import (
	"net/http" 
	"strconv" 
	"encoding/json"
)

func handler(){

	h := &Handler{}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /tasks", h.getAll)
	mux.HandleFunc("GET /tasks/{id}", h.get)
	mux.HandleFunc("POST /tasks", h.create)
	mux.HandleFunc("PUT /tasks/{id}", h.update)
	mux.HandleFunc("DELETE /tasks/{id}", h.delete)
}

type Handler struct{

}

func (h Handler) getAll(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func (h Handler) get(w http.ResponseWriter, r *http.Request){
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)

	if err != nil{
			http.Error(w, "Task ID is not a valid integer", http.StatusBadRequest)
			return
		}

	for _, task := range tasks {
		if task.ID == id {
			json.NewEncoder(w).Encode(task)
			return
		}
	}
		http.Error(w, "Task not found", http.StatusNotFound)
				return
	}

func (h Handler) create(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	var newTask Task
	json.NewDecoder(r.Body).Decode(&newTask)

	if newTask.Title == "" {
		http.Error(w, "Title are required", http.StatusBadRequest)
		return
	}
	if newTask.Status != "A FAZER" && newTask.Status != "EM PROGRESSO" && newTask.Status != "CONCLUÍDAS" {
		http.Error(w, "Status are invalid", http.StatusBadRequest)
		return
	}

	maxID := 0

	for _, task := range tasks {
		if task.ID > maxID {
			maxID = task.ID
		}
	}
	newTask.ID = maxID + 1
	
	tasks = append(tasks, newTask)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)
}

func (h Handler) update(w http.ResponseWriter, r *http.Request){
	var updatedTask Task
	json.NewDecoder(r.Body).Decode(&updatedTask)

	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)

	if err != nil{
			http.Error(w, "Task ID is not a valid integer", http.StatusBadRequest)
			return
		}

	if updatedTask.Title == "" {
		http.Error(w, "Title are required", http.StatusBadRequest)
		return
	}
	if updatedTask.Status != "A FAZER" && updatedTask.Status != "EM PROGRESSO" && updatedTask.Status != "CONCLUÍDAS" {
		http.Error(w, "Status are invalid", http.StatusBadRequest)
		return
	}

	updatedTask.ID = id

	for i, task := range tasks {
		if task.ID == id {
			tasks[i] = updatedTask
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(updatedTask)
			return
			}
		}
		http.Error(w, "Task not found", http.StatusNotFound)
	}
		

func (h Handler) delete(w http.ResponseWriter, r *http.Request){
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)

	if err != nil{
			http.Error(w, "Task ID is not a valid integer", http.StatusBadRequest)
			return
		}

	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
		http.Error(w, "Task not found", http.StatusNotFound)
}