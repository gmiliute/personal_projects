deploy_stage: deploy_frontend_stage deploy_backend_stage
deploy_backend_stage:
	@tput setaf 1; echo "Starting backend deployment to stage";tput sgr0;
	docker-compose -f docker-compose.stage.yml build;
	@tput setaf 1;echo "Docker built";tput sgr0;

	docker-compose -f docker-compose.stage.yml push;

start:
	DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build;
	DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose up;