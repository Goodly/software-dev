#!/bin/bash
# Mysql client login script
set -e
cat <<EOF >my.cnf
[mysql]
user = ${MYSQL_ROOT_USER}
password = ${MYSQL_ROOT_PASSWORD}
EOF
chmod 0600 my.cnf
mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} ${MYSQL_DATABASE}
