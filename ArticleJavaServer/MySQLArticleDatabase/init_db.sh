#!/bin/bash
# Set this script as the start command for an ECS Task to initialize an AWS RDS MySQL database.
set -e
cat <<EOF >my.cnf
[mysql]
user = ${MYSQL_ROOT_USER}
password = ${MYSQL_ROOT_PASSWORD}
EOF
chmod 0600 my.cnf
echo "Initializing database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' with publiceditor-database-dump.sql"
mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/publiceditor-database-dump.sql

# Drop this test user with known credentials.
#mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} mysql <<EOF
#DROP USER 'MysqlUpdateUser'@'*';
#SELECT user, host from user;
#EOF

# Create a new user for the app with least permissions needed.
mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} mysql <<EOF
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, LOCK TABLES
ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR '${MYSQL_USER}'@'%';
EOF

echo "Initialization of database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' complete."
