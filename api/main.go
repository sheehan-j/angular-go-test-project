package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
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

	// Without CORS
	// log.Println("Starting server on port 9000...");
	// log.Fatal(http.ListenAndServe(":9000", r))

	// *** Testing for correcting CORS error
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowCredentials: true,
		AllowedMethods: []string{"GET", "POST", "PUT", "HEAD", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Accept-Language", "Content-Type", "Content-Language", "Origin"},
	})
	handler := c.Handler(r)


	log.Println("Starting server on port 9000...");
	// log.Println(os.Getenv("PORT"));
	log.Fatal(http.ListenAndServe(":9000", handler))
}

func main() {
	InitialMigration()
	InitializeRouter()
}