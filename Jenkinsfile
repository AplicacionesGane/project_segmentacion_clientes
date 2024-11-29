pipeline {
  agent any
    
  tools { nodejs 'node-v22' }

  environment { 
    ENV_SEGMENTACION_CLIENT = credentials('ENV_SEGMENTACION_CLIENT')
    ENV_SEGMENTACION_API = credentials('ENV_SEGMENTACION_API')
    ENV_TNS_ORA = credentials('ENV_TNS_ORA_CARTERA')
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_client = readFile(ENV_SEGMENTACION_CLIENT)
            def env_api = readFile(ENV_SEGMENTACION_API)
            def env_tns_ora = readFile(ENV_TNS_ORA)

            writeFile file: './client/.env', text: env_client
            writeFile file: './server/.env', text: env_api
            writeFile file: './server/tnsnames.ora', text: env_tns_ora
          }
        }
      }

      stage('install dependencies frontend') {
        steps {
          script {
            sh 'cd client && npm install'
            sh 'cd client && node --run build'
          }
        }
      }

      stage('down docker compose'){
        steps {
          script { sh 'docker compose down' }
        }
      }

      stage('delete images if exist') {
        steps{
          script {
            def images = 'api-segmentacion-v1.0'
            if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
              sh "docker rmi ${images}"
            } else {
              echo "Image ${images} does not exist."
              echo "continuing..."
            }
          }
        }
      }

      stage('copy folder instan client to api'){
          steps {
            script {
              sh 'cp -r /var/lib/jenkins/instantclient_11_2 ./api'
            }
          }
      }

      stage('run docker compose'){
        steps {
          script { sh 'docker compose up -d' }
          }
      }
    }
}