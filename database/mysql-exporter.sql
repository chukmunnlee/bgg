use mysql;

create user 'exporter'@'%' identified by 'exporter' with max_user_connections 3;
grant process, replication client, select on *.* to 'exporter'@'%';
grant select on performance_schema.* to 'exporter'@'%';

flush privileges;
