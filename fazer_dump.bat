set PGPASSWORD=postgres

"bin\pg_dump.exe" -U postgres -h localhost -p 5432 -F c -b -v -f "dump.backup" postgres
pause