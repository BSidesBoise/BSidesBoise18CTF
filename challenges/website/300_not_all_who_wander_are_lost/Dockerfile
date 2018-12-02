FROM node

RUN mkdir -p /usr/src/zipper
RUN mkdir -p /home/eval
WORKDIR /usr/src/zipper

COPY package.json /usr/src/zipper
RUN npm install
COPY . /usr/src/zipper/

COPY flag /root/flag
COPY flag /opt/flag
COPY flag /opt/key

COPY eval.js /home/eval



RUN chmod 777 -R /home/eval
RUN chmod 444 /root/flag
RUN chmod 444 /opt/flag
RUN chmod 444 /opt/key

EXPOSE 666

CMD ["npm", "start"]
