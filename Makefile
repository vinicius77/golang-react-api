# Initialie Go App (Server)
go mod init github.com/vinicius77/golang-react-api

# InstallFiver v2 (Server)
go get -u github.com/gofiber/fiber/v2

# Create client App using Vite
yarn create vite client -- --template react-ts

# Install dependencies
yarn add @mantine/hooks @mantine/core swr @primer/octicons-react

# Run the server (http://127.0.0.1:4000)
cd server
go run main go

# Run the client (http://localhost:5173/)
cd client
yarn run dev