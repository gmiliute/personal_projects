FROM --platform=linux/amd64 nginx
COPY nginx.conf /etc/nginx/conf.d/nginx-template.conf
RUN envsubst "\$FRONTEND_URN" < /etc/nginx/conf.d/nginx-template.conf > /etc/nginx/conf.d/nginx.conf
RUN rm /etc/nginx/conf.d/nginx-template.conf
RUN rm /etc/nginx/conf.d/default.conf
