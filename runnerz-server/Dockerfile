FROM tomcat:10.1.20-jdk17

COPY ./target/runnerz-server*.war /usr/local/tomcat/webapps/runnerz#api.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
