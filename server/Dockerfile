FROM node:lts-slim

WORKDIR /app

COPY . /app

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y libaio1

# install bun library
RUN npm install -g bun

# Instalar dependencias y construir la aplicación
RUN bun install && bun run build

# Configurar Oracle Instant Client
RUN mkdir -p /opt/oracle && \
    mv /app/instantclient_11_2 /opt/oracle && \
    mkdir -p /opt/oracle/instantclient_11_2/network/admin && \
    cd /opt/oracle/instantclient_11_2 && \
    ln -s libclntsh.so.11.1 libclntsh.so && \
    ln -s libocci.so.11.1 libocci.so && \
    mv /app/tnsnames.ora /opt/oracle/instantclient_11_2/network/admin && \
    echo "/opt/oracle/instantclient_11_2" > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

# Agregar Oracle Instant Client al PATH del sistema
RUN echo "export LD_LIBRARY_PATH=/opt/oracle/instantclient_11_2:\$LD_LIBRARY_PATH" >> /etc/profile.d/oracle-instantclient.sh

EXPOSE 80

CMD ["npm", "start"]