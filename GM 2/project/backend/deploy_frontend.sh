#!/bin/bash

cd ../frontend || exit
npm run build
ssh -o StrictHostKeyChecking=no ubuntu@18.211.118.7 "cd /var/www/html/ || exit;sudo find . -not \( -path './backend/*' -or -name 'backend.zip' -or -path './backend' \) -delete"
sudo scp -o StrictHostKeyChecking=no -r dist/* ubuntu@18.211.118.7:/var/www/html/



