start:
	docker-compose up --detach
dist:
	docker-compose up --detach --build
shell:
	docker-compose exec sapotify bash
logs:
	docker-compose logs --follow sapotify
stop:
	docker-compose stop
destroy:
	docker-compose down
list:
	docker-compose ps