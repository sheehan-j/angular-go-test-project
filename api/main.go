package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func InitializeRouter() {
	r := mux.NewRouter()

	// Subrouter for handling all requests made to API URL
	s := r.PathPrefix("/api").Subrouter();

	s.HandleFunc("/users", GetUsers).Methods("GET")
	s.HandleFunc("/users/{id}", GetUser).Methods("GET")
	s.HandleFunc("/users", CreateUser).Methods("POST")
	s.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")
	s.HandleFunc("/users/{id}", DeleteUser).Methods("DELETE")

	log.Println("Starting server on port 9000...");
	log.Fatal(http.ListenAndServe(":9000", r))
}

func main() {
	InitialMigration()
	InitializeRouter()
}