ssh root@185.233.117.106 "
    cd /root/api && 
    git reset --hard &&
    git pull origin master &&
    npm run build &&
    docker-compose restart
"