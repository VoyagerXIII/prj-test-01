pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'cd frontend && npm ci'
                sh 'cd backend && npm ci'
            }
        }
        stage('Build frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }
        stage('Build backend') {
            steps {
                sh 'cd backend && npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'cd frontend && npm test'
                sh 'cd backend && npm test'
            }
        }
    }
}
