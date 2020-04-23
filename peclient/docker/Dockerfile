FROM nginx:1.17.9
# Norman: Trying to decide if 'npm build' should be run in Docker, or
# in AWS CodeBuild buildSpec.yml.
# For now, use the current developers local build. Which is not best practice.
WORKDIR /var/www/staticfiles
COPY /dist/peclient .
# Provide icon at root level so NGINX will serve it at /favicon.ico
COPY /dist/peclient/favicon.ico .
VOLUME ["/var/www/staticfiles"]
