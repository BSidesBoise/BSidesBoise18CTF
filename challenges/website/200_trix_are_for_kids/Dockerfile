from node:latest

RUN cd /usr/bin/; mkdir program;
RUN cd /usr/bin/program; npm init --yes; npm install express; npm install cookie-parser; npm install escape-html; npm install node-serialize; npm install react; npm install --save xor-crypt

COPY app.js /usr/bin/program/app.js
COPY start.sh /tmp/start.sh

# RUN cd /tmp; git clone https://github.com/twbs/bootstrap.git; npm install bootstrap

COPY key /opt/key

ENTRYPOINT "/tmp/start.sh"

EXPOSE 3000
