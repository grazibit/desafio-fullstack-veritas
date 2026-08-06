package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	loadTasks()
	router := enableCORS(setupRoutes())

	server := &http.Server{

		Addr:           ":8080",
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Fatal(server.ListenAndServe())
}
