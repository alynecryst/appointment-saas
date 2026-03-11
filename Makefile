dev:
	docker compose up -d
	cd backend && npm run start:dev

docker-up:
	docker compose up -d

docker-down:
	docker compose down

backend:
	cd backend && npm run start:dev