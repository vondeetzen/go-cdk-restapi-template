DIST_DIRECTORY=dist
all:
	@echo "This is the Makefile of my sample project"

clean:
	rm -rf $(DIST_DIRECTORY) || true

build:
	mkdir $(DIST_DIRECTORY) || true
	GOOS=linux go build -o $(DIST_DIRECTORY)/first cmd/first/main.go

package: clean build
	cd $(DIST_DIRECTORY) && zip first.zip first

deploy: package
	cd deployments/cdk && npm run-script deploy

destroy:
	cd deployments/cdk && npm run-script destroy