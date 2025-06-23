pipeline {
    agent any

    environment {
        REMOTE_USER = 'deployuser'
        REMOTE_HOST = '203.159.95.168'
        REMOTE_DIR = '/home/deployuser/prj-test-01'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/VoyagerXIII/prj-test-01.git'
            }
        }

        stage('Deploy to VPS') {
            steps {
                sshagent(credentials: ['vps-key']) {
                    sh """
                        echo "📤 Copying project to VPS..."

                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'mkdir -p ${REMOTE_DIR}'
                        scp -r . ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}
                    """
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                sshagent(credentials: ['vps-key']) {
                    sh """
                        echo "🚀 Building and running frontend + backend via docker-compose on VPS..."

                        ssh ${REMOTE_USER}@${REMOTE_HOST} '
                            cd ${REMOTE_DIR} &&
                            docker-compose down &&
                            docker-compose up -d --build
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deploy frontend + backend สำเร็จ'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
