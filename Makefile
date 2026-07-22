
start: node_modules
	npm run start

dist: node_modules example-code-signing.p12
	rm -rf dist
	npm run dist

pack: node_modules example-code-signing.p12
	rm -rf dist
	npm run pack

node_modules:
	npm ci

example-code-signing.p12:
	bash create-example-code-signing-certificate.sh

clean:
	rm -rf node_modules dist example-code-signing*

.PHONY: start dist pack clean
