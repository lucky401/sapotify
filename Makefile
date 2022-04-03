dev:
	docker build -t sapotify-dev -f Dockerfile.dev .
serve:
	docker run -d -p 3000:3000 --name sapotify-dev sapotify-dev
stop:
	docker stop sapotify-dev && docker rm sapotify-dev
logs:
	docker logs -f sapotify-dev
shell:
	docker exec -it sapotify-dev bash
build:
	docker build -t sapotify .
start:
	docker run -d -p 3000:80 --name sapotify sapotify
destroy:
	docker stop sapotify && docker rm sapotify